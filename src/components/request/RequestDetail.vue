<script setup lang="ts">
import type { Request } from '@/types'
import StatusTracker from './StatusTracker.vue'
import MoneySummary from './MoneySummary.vue'
import ProposalBlock from './ProposalBlock.vue'
import InvoiceBlock from './InvoiceBlock.vue'
import OrderBlock from './OrderBlock.vue'
import UpdBlock from './UpdBlock.vue'
import CustomerAccountBlock from './CustomerAccountBlock.vue'
import { formatDate, formatMoney } from '@/composables/useFormatters'

defineProps<{ request: Request }>()
defineEmits<{ close: [] }>()
</script>

<template>
  <div class="detail">
    <div class="detail__head">
      <div>
        <h1 class="detail__title">{{ request.contractNumber || `Заявка #${request.id}` }}</h1>
        <div class="detail__sub">
          <span>от {{ formatDate(request.created) }}</span>
          <span v-if="request.contractSpecNumber" class="detail__sub-sep">·</span>
          <span v-if="request.contractSpecNumber">спец. {{ request.contractSpecNumber }}</span>
        </div>
      </div>
      <button class="detail__close" @click="$emit('close')" aria-label="Закрыть">
        <svg viewBox="0 0 20 20" fill="none" width="18" height="18">
          <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
        </svg>
      </button>
    </div>

    <div class="detail__section">
      <StatusTracker :status="request.customerStatus" :is-cancelled="request.isCancelled" />
    </div>

    <div class="detail__section" v-if="request.invoices.length">
      <MoneySummary :invoices="request.invoices" />
    </div>

    <!-- Менеджер -->
    <div class="detail__section detail__section--manager" v-if="request.manager">
      <div class="manager">
        <div class="manager__avatar">{{ request.manager.name.charAt(0) }}</div>
        <div class="manager__info">
          <div class="manager__name">{{ request.manager.name }}</div>
          <a :href="`mailto:${request.manager.email}`" class="manager__email">{{ request.manager.email }}</a>
        </div>
        <a :href="`tel:${request.company.phone}`" class="manager__call" v-if="request.company.phone">
          <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
            <path d="M3 3h3l1.5 3.5-1.5 1a8 8 0 004 4l1-1.5L14.5 11V14A1 1 0 0113 15C7 15 1 9 1 3a1 1 0 011-1z"
              stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Позвонить
        </a>
      </div>
    </div>

    <!-- Запрошенные товары -->
    <div class="detail__section" v-if="request.productsRequested.length">
      <div class="products-header">Запрошено</div>
      <div class="product-item" v-for="p in request.productsRequested" :key="p.id">
        <div class="product-item__name">{{ p.model || p.brandterm.name }}</div>
        <div class="product-item__meta">
          <span>{{ p.brandterm.name }}</span>
          <span class="sep">·</span>
          <span>{{ p.categoryterm.name }}</span>
          <span class="sep">·</span>
          <span>{{ p.qty }} {{ p.qtyUnits }}</span>
          <span v-if="request.customerDesiredPrice" class="sep">·</span>
          <span v-if="request.customerDesiredPrice">{{ formatMoney(request.customerDesiredPrice, 'RUB') }}</span>
        </div>
      </div>
    </div>

    <!-- Подобранные позиции (products) -->
    <div class="detail__section" v-if="request.products.length">
      <div class="products-header">Подобрано</div>
      <div class="product-item" v-for="p in request.products" :key="p.id">
        <div class="product-item__name">{{ p.model }}</div>
        <div class="product-item__meta">
          <span>{{ p.brandterm.name }}</span>
          <span class="sep">·</span>
          <span>{{ p.qty }} {{ p.qtyUnits }}</span>
          <span v-if="p.sku" class="sep">·</span>
          <span v-if="p.sku" class="product-item__sku">{{ p.sku }}</span>
          <span v-if="p.shippingTime" class="sep">·</span>
          <span v-if="p.shippingTime">{{ p.shippingTime }}</span>
        </div>
      </div>
    </div>

    <!-- Документы -->
    <div class="detail__docs">
      <ProposalBlock v-for="p in request.proposals" :key="p.id" :proposal="p" />
      <InvoiceBlock v-for="inv in request.invoices" :key="inv.id" :invoice="inv" />
      <OrderBlock v-for="ord in request.orders" :key="ord.id" :order="ord" />
      <UpdBlock v-for="upd in request.upds" :key="upd.id" :upd="upd" />
      <CustomerAccountBlock v-if="request.customerAccount" :account="request.customerAccount" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.detail {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;

  &__head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
  }

  &__title {
    font-size: 18px;
    font-weight: 700;
    color: var(--color-text);
    line-height: 1.2;
  }

  &__sub {
    font-size: 12px;
    color: var(--color-text-muted);
    margin-top: 2px;
    display: flex;
    gap: 5px;
  }

  &__sub-sep {
     opacity: 0.4;
     color: var(--color-text-muted);
    }

  &__close {
    width: 32px;
    height: 32px;
    border: none;
    background: var(--color-bg-subtle);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-text-secondary);
    cursor: pointer;
    flex-shrink: 0;
    transition: all 0.15s;

    &:hover { 
      background: var(--color-border); 
      color: var(--color-text); 
    }
  }

  &__section {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    padding: 14px 16px;

    &--manager { padding: 10px 14px; }
  }

  &__docs {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}

.manager {
  display: flex;
  align-items: center;
  gap: 10px;

  &__avatar {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: var(--color-accent-bg);
    color: var(--color-accent);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 14px;
    flex-shrink: 0;
  }

  &__info { 
    flex: 1; 
    min-width: 0; 
  }

  &__name {
    font-size: 13px;
    font-weight: 600;
    color: var(--color-text);
  }

  &__email {
    font-size: 12px;
    color: var(--color-text-muted);
    text-decoration: none;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    &:hover { 
      color: var(--color-accent); 
    }
  }

  &__call {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 12px;
    font-weight: 500;
    color: var(--color-accent);
    text-decoration: none;
    padding: 5px 11px;
    border-radius: 7px;
    background: var(--color-accent-bg);
    white-space: nowrap;
    flex-shrink: 0;
    transition: all 0.15s;

    &:hover { 
      background: var(--color-accent);
      color: #fff; 
    }
  }
}

.products-header {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-text-muted);
  margin-bottom: 8px;
}

.product-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 8px 0;
  border-top: 1px solid var(--color-border);

  &:first-of-type { 
    border-top: none;
    padding-top: 0;
    }

  &__name {
    font-size: 13px;
    font-weight: 500;
    color: var(--color-text);
  }

  &__meta {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    font-size: 12px;
    color: var(--color-text-muted);
  }

  &__sku {
    font-family: monospace;
    color: var(--color-text-secondary);
  }
}

.sep { opacity: 0.4; }
</style>
