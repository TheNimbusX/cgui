<script setup lang="ts">
import type { Upd } from '@/types'
import { formatDate } from '@/composables/useFormatters'

defineProps<{ upd: Upd }>()
</script>

<template>
  <div class="block">
    <div class="block__header">
      <span class="block__title">УПД</span>
      <span class="block__num">№{{ upd.number }}</span>
    </div>
    <div class="block__body">
      <div class="block__row">
        <span class="block__key">Дата</span>
        <span class="block__val">{{ formatDate(upd.date) }}</span>
      </div>
    </div>
    <div class="upd-download">
      <button class="outline-btn" disabled>
        <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
          <path d="M8 2v8M5 7l3 3 3-3M3 13h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Скачать PDF
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.upd-download { padding-top: 4px; }

.outline-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 500;
  padding: 6px 14px;
  border-radius: 8px;
  border: 1.5px solid var(--color-border);
  background: transparent;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all 0.15s;
  font-family: inherit;

  &:not(:disabled):hover {
    border-color: var(--color-accent);
    color: var(--color-accent);
  }
  
  &:disabled { 
    opacity: 0.5; 
    cursor: default; 
  }
}
</style>
