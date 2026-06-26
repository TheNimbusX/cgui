<script setup lang="ts">
import type { Invoice } from '@/types'
import { computed } from 'vue'
import { getInvoiceTotal, getInvoiceCurrency } from '@/composables/useInvoice'
import { formatMoney, formatPercent } from '@/composables/useFormatters'

const props = defineProps<{ invoices: Invoice[] }>()

const invoice = computed(() => props.invoices[0] ?? null)
const currency = computed(() => invoice.value ? getInvoiceCurrency(invoice.value) : 'RUB')
const total = computed(() => invoice.value ? getInvoiceTotal(invoice.value) : 0)
const paidPercent = computed(() => invoice.value?.paid ?? 0)
const paidRub = computed(() => invoice.value?.paidInput ?? 0)
</script>

<template>
  <div class="money" v-if="invoice">
    <div class="money__row">
      <span class="money__label">Выставлено</span>
      <span class="money__value">{{ formatMoney(total, currency) }}</span>
    </div>
    <div class="money__row">
      <span class="money__label">Оплачено</span>
      <span class="money__value money__value--paid">
        {{ formatMoney(paidRub, 'RUB') }}
        <span class="money__tag">{{ formatPercent(paidPercent) }}</span>
      </span>
    </div>
    <div class="money__bar">
      <div class="money__bar-fill" :style="{ width: `${Math.min(paidPercent, 100)}%` }" />
    </div>
  </div>
  <p class="money__empty" v-else>Счёт не выставлен</p>
</template>

<style lang="scss" scoped>
.money {
  display: flex;
  flex-direction: column;
  gap: 4px;

  &__row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 8px;
  }

  &__label {
    font-size: 13px;
    color: var(--color-text-secondary);
    flex-shrink: 0;
  }

  &__value {
    font-size: 15px;
    font-weight: 600;
    color: var(--color-text);
    display: flex;
    align-items: center;
    gap: 6px;

    &--paid { color: var(--color-success); }
  }

  &__tag {
    font-size: 11px;
    font-weight: 500;
    color: var(--color-text-muted);
    background: var(--color-bg-subtle);
    border-radius: 10px;
    padding: 1px 7px;
  }

  &__bar {
    height: 4px;
    background: var(--color-border);
    border-radius: 4px;
    margin-top: 4px;
    overflow: hidden;
  }

  &__bar-fill {
    height: 100%;
    background: var(--color-success);
    border-radius: 4px;
    transition: width 0.4s ease;
  }

  &__empty {
    font-size: 13px;
    color: var(--color-text-muted);
  }
}
</style>
