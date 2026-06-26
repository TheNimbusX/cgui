<script setup lang="ts">
import type { Request } from '@/types'
import StatusTracker from './StatusTracker.vue'
import MoneySummary from './MoneySummary.vue'
import { formatDate } from '@/composables/useFormatters'

defineProps<{
  request: Request
  active?: boolean
}>()

defineEmits<{ open: [] }>()
</script>

<template>
  <div
    class="card"
    :class="{ 'card--active': active }"
    @click="$emit('open')"
    role="button"
    tabindex="0"
    @keydown.enter="$emit('open')"
  >
    <div class="card__head">
      <div class="card__id">{{ request.contractNumber || `#${request.id}` }}</div>
      <button class="card__open-btn" @click.stop="$emit('open')">Открыть</button>
    </div>

    <div class="card__company">{{ request.company.name }}</div>

    <StatusTracker :status="request.customerStatus" :is-cancelled="request.isCancelled" />

    <div class="card__products" v-if="request.productsRequested.length">
      <span v-for="p in request.productsRequested.slice(0, 2)" :key="p.id" class="card__tag">
        {{ p.model || p.brandterm.name }}
      </span>
      <span v-if="request.productsRequested.length > 2" class="card__tag card__tag--more">
        +{{ request.productsRequested.length - 2 }}
      </span>
    </div>

    <MoneySummary v-if="request.invoices.length" :invoices="request.invoices" />

    <div class="card__footer">
      <span class="card__date">Обновлено {{ formatDate(request.changed) }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  background: var(--color-surface);
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius);
  padding: 14px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: border-color 0.15s, box-shadow 0.15s;
  outline: none;

  &:hover,
  &:focus-visible {
    border-color: var(--color-accent);
    box-shadow: 0 2px 12px rgba(37, 99, 235, 0.1);
  }

  &--active {
    border-color: var(--color-accent);
    box-shadow: 0 2px 12px rgba(37, 99, 235, 0.1);
  }

  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }

  &__id {
    font-size: 14px;
    font-weight: 700;
    color: var(--color-text);
  }

  &__company {
    font-size: 12px;
    color: var(--color-text-muted);
    margin-top: -6px;
  }

  &__open-btn {
    font-size: 12px;
    font-weight: 500;
    color: var(--color-accent);
    background: var(--color-accent-bg);
    border: none;
    border-radius: 7px;
    padding: 4px 11px;
    cursor: pointer;
    transition: all 0.15s;
    font-family: inherit;
    flex-shrink: 0;

    &:hover { 
      background: var(--color-accent); 
      color: #fff; 
    }
  }

  &__products {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
  }

  &__tag {
    font-size: 11px;
    color: var(--color-text-secondary);
    background: var(--color-bg-subtle);
    border-radius: 5px;
    padding: 2px 7px;
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    &--more { 
      color: var(--color-text-muted); 
    }
  }

  &__footer {
    display: flex;
    justify-content: flex-end;
  }

  &__date {
    font-size: 11px;
    color: var(--color-text-muted);
  }
}
</style>
