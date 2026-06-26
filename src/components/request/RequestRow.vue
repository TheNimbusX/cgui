<script setup lang="ts">
import type { Request } from '@/types'
import { computed } from 'vue'
import { formatDate, formatMoney } from '@/composables/useFormatters'
import { getInvoiceTotal, getInvoiceCurrency } from '@/composables/useInvoice'
import { ChevronRight } from 'lucide-vue-next'

const props = defineProps<{ request: Request; active?: boolean }>()
defineEmits<{ open: [] }>()

const statusLabels: Record<string, string> = {
  processing: 'Обработка',
  proposal: 'КП',
  invoice: 'Счёт',
  delivery: 'Доставка',
  done: 'Готово',
}

const invoice = computed(() => props.request.invoices[0] ?? null)
const total = computed(() => invoice.value ? formatMoney(getInvoiceTotal(invoice.value), getInvoiceCurrency(invoice.value)) : '—')
const paid = computed(() => invoice.value ? `${Math.round(invoice.value.paid)}%` : '—')
</script>

<template>
  <div
    class="row"
    :class="{ 'row--active': active }"
    @click="$emit('open')"
    role="button"
    tabindex="0"
    @keydown.enter="$emit('open')"
  >
    <div class="row__id">{{ request.contractNumber || `#${request.id}` }}</div>
    <div class="row__company">{{ request.company.name }}</div>
    <div class="row__products">
      {{ request.productsRequested.map((p) => p.model || p.brandterm.name).join(', ') || '—' }}
    </div>
    <div class="row__status">
      <span class="status-chip" :class="`status-chip--${request.customerStatus}`">
        {{ request.isCancelled ? 'Отменена' : (statusLabels[request.customerStatus] ?? request.customerStatus) }}
      </span>
    </div>
    <div class="row__amount">{{ total }}</div>
    <div class="row__paid">{{ paid }}</div>
    <div class="row__date">{{ formatDate(request.changed) }}</div>
    <ChevronRight :size="14" class="row__arrow" />
  </div>
</template>

<style lang="scss" scoped>
.row {
  display: grid;
  grid-template-columns: 130px 1fr 1fr 100px 110px 55px 90px 20px;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  border-bottom: 1px solid var(--color-border);
  cursor: pointer;
  transition: background 0.13s;
  font-size: 13px;

  &:last-child { border-bottom: none; }

  &:hover { background: var(--color-bg-subtle); }

  &--active { background: var(--color-accent-bg); }

  &__id { 
    font-weight: 600;
    color: var(--color-text); 
  }

  &__company, &__date { 
    color: var(--color-text-muted); 
  }

  &__products { 
    color: var(--color-text-secondary); 
    overflow: hidden; 
    text-overflow: ellipsis; 
    white-space: nowrap; 
  }

  &__amount { 
    font-weight: 600; 
    color: var(--color-text); 
    text-align: right; 
  }

  &__paid { 
    color: var(--color-text-secondary); 
    text-align: right; 
  }

  &__arrow { 
    color: var(--color-text-muted); 
    justify-self: end; 
  }
}

.status-chip {
  font-size: 11px;
  font-weight: 500;
  padding: 3px 9px;
  border-radius: 20px;
  white-space: nowrap;
  background: var(--color-bg-subtle);
  color: var(--color-text-secondary);

  &--processing { 
    background: #fef3c7; 
    color: #92400e; 
  }

  &--proposal   { 
    background: #e0f2fe; 
    color: #0369a1; 
  }
  
  &--invoice    { 
    background: #ede9fe; 
    color: #6d28d9; 
  }

  &--delivery   { 
    background: #dcfce7; 
    color: #15803d; 
  }

  &--done       { 
    background: #f0fdf4; 
    color: #166534;
    }

  &--cancelled {
    background: var(--color-danger-bg);
    color: var(--color-danger);
  }
}
</style>
