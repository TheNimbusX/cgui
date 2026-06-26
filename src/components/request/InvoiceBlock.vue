<script setup lang="ts">
import type { Invoice } from '@/types'
import { ref, computed } from 'vue'
import { getInvoiceTotal, getInvoiceCurrency, getActiveProducts } from '@/composables/useInvoice'
import { formatMoney, formatDate } from '@/composables/useFormatters'

const props = defineProps<{ invoice: Invoice }>()

const expanded = ref(false)

const currency = computed(() => getInvoiceCurrency(props.invoice))
const total = computed(() => getInvoiceTotal(props.invoice))
const activeProducts = computed(() => getActiveProducts(props.invoice))
</script>

<template>
  <div class="block">
    <div class="block__header">
      <span class="block__title">Счёт</span>
      <span class="block__num">{{ invoice.invoiceNumber }}</span>
    </div>

    <div class="block__body">
      <div class="block__row block__row--total">
        <span class="block__key">Итого</span>
        <span class="block__val block__val--accent">{{ formatMoney(total, currency) }}</span>
      </div>
      <div class="block__row" v-if="invoice.prepaid">
        <span class="block__key">Предоплата</span>
        <span class="block__val">{{ invoice.prepaid }}%</span>
      </div>
      <div class="block__row">
        <span class="block__key">Оплачено</span>
        <span class="block__val block__val--success">
          {{ formatMoney(invoice.paidInput, 'RUB') }}
          <span class="percent-tag">{{ Math.round(invoice.paid) }}%</span>
        </span>
      </div>
      <div class="block__row" v-if="invoice.actuality">
        <span class="block__key">Действительность</span>
        <span class="block__val">{{ invoice.actuality }}</span>
      </div>
      <div class="block__row" v-if="invoice.shippingTime">
        <span class="block__key">Срок поставки</span>
        <span class="block__val">{{ invoice.shippingTime }}</span>
      </div>
    </div>

    <div class="payments" v-if="invoice.invoicePayments.length">
      <div class="payment" v-for="p in invoice.invoicePayments" :key="p.id">
        <svg viewBox="0 0 14 14" fill="none" width="14" height="14" class="payment__icon">
          <circle cx="7" cy="7" r="6" stroke="currentColor" stroke-width="1.4"/>
          <path d="M4.5 7l2 2 3-3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class="payment__amount">{{ formatMoney(p.paidInput, 'RUB') }}</span>
        <span class="payment__date">{{ formatDate(p.transferDate) }}</span>
        <span class="payment__num">п/п {{ p.transferNumber }}</span>
      </div>
    </div>

    <button class="block__toggle" @click="expanded = !expanded">
      <span>{{ expanded ? 'Скрыть позиции' : 'Позиции счёта' }}</span>
      <svg class="block__chevron" :class="{ 'block__chevron--up': expanded }" viewBox="0 0 16 16" fill="none">
        <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>

    <div class="block__products" v-if="expanded">
      <div class="product-row" v-for="p in activeProducts" :key="p.id">
        <div class="product-row__title">{{ p.title }}</div>
        <div class="product-row__meta">
          <span v-if="p.qty > 1">{{ p.qty }} шт. × {{ formatMoney(p.unit, currency) }}</span>
          <span class="product-row__line">{{ formatMoney(p.line, currency) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.percent-tag {
  font-size: 11px;
  font-weight: 500;
  color: var(--color-success);
  background: var(--color-success-bg);
  border-radius: 10px;
  padding: 1px 7px;
}

.payments { 
  display: flex; 
  flex-direction: 
  column; gap: 0; 
}

.payment {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 0;
  border-top: 1px solid var(--color-border);
  font-size: 13px;

  &__icon { 
    color: var(--color-success); 
    flex-shrink: 0; 
  }

  &__amount {
     font-weight: 600; 
     color: var(--color-text); 
    }

  &__date { 
    color: var(--color-text-secondary); 
  }

  &__num { 
    margin-left: auto; color: var(--color-text-muted); 
    font-size: 12px; 
  }
}
</style>
