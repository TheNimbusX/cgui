<script setup lang="ts">
import type { Order } from '@/types'
import { formatDate } from '@/composables/useFormatters'

defineProps<{ order: Order }>()

const receivedLabels: Record<string, string> = {
  partial: 'частично получен',
  full: 'получен',
  none: 'ожидается',
}
</script>

<template>
  <div class="block">
    <div class="block__header">
      <span class="block__title">Заказ / Доставка</span>
      <span class="block__badge" v-if="order.received">
        {{ receivedLabels[order.received] ?? order.received }}
      </span>
    </div>

    <div class="block__body">
      <div class="block__row">
        <span class="block__key">Дата заказа</span>
        <span class="block__val">{{ formatDate(order.postDate) }}</span>
      </div>
    </div>

    <div v-for="shipping in order.shippings" :key="shipping.id" class="shipping">
      <div class="shipping__row" v-if="shipping.sentToClient">
        <span class="shipping__key">Отгружено</span>
        <span class="shipping__val">{{ formatDate(shipping.sentToClient) }}</span>
      </div>
      <div class="shipping__row" v-if="shipping.received">
        <span class="shipping__key">Получено</span>
        <span class="shipping__val">{{ formatDate(shipping.received) }}</span>
      </div>
      <div class="shipping__gtd" v-if="shipping.shippingGroup?.gtd">
        <span class="shipping__gtd-label">ГТД</span>
        <span class="shipping__gtd-val">{{ shipping.shippingGroup.gtd }}</span>
      </div>
      <div class="shipping__pending" v-if="!shipping.shippingGroup">
        <svg viewBox="0 0 14 14" fill="none" width="13" height="13">
          <circle cx="7" cy="7" r="6" stroke="currentColor" stroke-width="1.4"/>
          <path d="M7 4v3.5l2 1.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
        </svg>
        ожидается
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.shipping {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px 0 0;
  border-top: 1px solid var(--color-border);
  margin-top: 4px;

  &__row {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }

  &__key { 
    color: var(--color-text-secondary); 
  }

  &__val {
     font-weight: 500; 
     color: var(--color-text);
    }

  &__gtd {
    display: flex;
    align-items: baseline;
    gap: 8px;
    padding: 5px 8px;
    background: var(--color-bg-subtle);
    border-radius: 6px;
    margin-top: 2px;
  }

  &__gtd-label {
    font-size: 10px;
    font-weight: 700;
    color: var(--color-text-muted);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    flex-shrink: 0;
  }
  
  &__gtd-val {
    font-size: 12px;
    font-family: 'Courier New', monospace;
    color: var(--color-text);
    word-break: break-all;
  }

  &__pending {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 13px;
    color: var(--color-text-muted);
  }
}
</style>
