<script setup lang="ts">
import type { Proposal } from '@/types'
import { ref, computed } from 'vue'
import { formatMoney } from '@/composables/useFormatters'

const props = defineProps<{ proposal: Proposal }>()

const expanded = ref(false)

const currency = computed(() => props.proposal.proposalProducts[0]?.currency ?? 'RUB')
const total = computed(() =>
  props.proposal.proposalProducts.reduce((s, p) => s + p.line, 0)
)
</script>

<template>
  <div class="block">
    <div class="block__header">
      <span class="block__title">КП</span>
      <span class="block__num" v-if="proposal.title">{{ proposal.title }}</span>
    </div>

    <div class="block__body">
      <div class="block__row" v-if="proposal.actuality">
        <span class="block__key">Действует до</span>
        <span class="block__val">{{ proposal.actuality }}</span>
      </div>
      <div class="block__row" v-if="proposal.shippingTime">
        <span class="block__key">Срок поставки</span>
        <span class="block__val">{{ proposal.shippingTime }}</span>
      </div>
      <div class="block__row" v-if="proposal.prepaid">
        <span class="block__key">Предоплата</span>
        <span class="block__val">{{ proposal.prepaid }}%</span>
      </div>
      <div class="block__row block__row--total" v-if="proposal.proposalProducts.length">
        <span class="block__key">Итого</span>
        <span class="block__val block__val--accent">{{ formatMoney(total, currency) }}</span>
      </div>
    </div>

    <button v-if="proposal.proposalProducts.length" class="block__toggle" @click="expanded = !expanded">
      <span>{{ expanded ? 'Скрыть позиции' : 'Показать позиции' }}</span>
      <svg class="block__chevron" :class="{ 'block__chevron--up': expanded }" viewBox="0 0 16 16" fill="none">
        <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>

    <div class="block__products" v-if="expanded">
      <div class="product-row" v-for="p in proposal.proposalProducts" :key="p.id">
        <div class="product-row__title">{{ p.title }}</div>
        <div class="product-row__meta">
          <span v-if="p.qty > 1">{{ p.qty }} шт. × {{ formatMoney(p.unit, currency) }}</span>
          <span class="product-row__line">{{ formatMoney(p.line, currency) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
