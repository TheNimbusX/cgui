<script setup lang="ts">
import type { CustomerAccount } from '@/types'
import { ref } from 'vue'

defineProps<{ account: CustomerAccount }>()

const expanded = ref(false)
</script>

<template>
  <div class="block">
    <div class="block__header">
      <span class="block__title">Реквизиты</span>
    </div>
    <div class="block__body">
      <div class="block__row">
        <span class="block__key">Компания</span>
        <span class="block__val">{{ account.buyer }}</span>
      </div>
      <div class="block__row">
        <span class="block__key">ИНН / КПП</span>
        <span class="block__val">{{ account.inn }} / {{ account.kpp }}</span>
      </div>
      <div class="block__row" v-if="account.customerName">
        <span class="block__key">Контакт</span>
        <span class="block__val">{{ account.customerName }}<span v-if="account.customerPosition">, {{ account.customerPosition }}</span></span>
      </div>
      <div class="block__row" v-if="account.shippingAddress">
        <span class="block__key">Адрес доставки</span>
        <span class="block__val" style="text-align:right">{{ account.shippingAddress }}</span>
      </div>
    </div>

    <button class="block__toggle" @click="expanded = !expanded">
      <span>{{ expanded ? 'Скрыть' : 'Банковские реквизиты' }}</span>
      <svg class="block__chevron" :class="{ 'block__chevron--up': expanded }" viewBox="0 0 16 16" fill="none">
        <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>

    <div class="block__products" v-if="expanded">
      <div class="product-row">
        <div class="product-row__title" style="color:var(--color-text-muted);font-size:12px">{{ account.bank }}</div>
        <div class="product-row__meta" style="font-size:13px;color:var(--color-text)">
          <span>БИК {{ account.bik }}</span>
        </div>
      </div>
      <div class="product-row">
        <div class="product-row__title" style="color:var(--color-text-muted);font-size:12px">Расчётный счёт</div>
        <div style="font-family:monospace;font-size:12px;color:var(--color-text)">{{ account.rs }}</div>
      </div>
      <div class="product-row">
        <div class="product-row__title" style="color:var(--color-text-muted);font-size:12px">Корр. счёт</div>
        <div style="font-family:monospace;font-size:12px;color:var(--color-text)">{{ account.ks }}</div>
      </div>
      <div class="product-row" v-if="account.ogrn">
        <div class="product-row__title" style="color:var(--color-text-muted);font-size:12px">ОГРН / ОКПО</div>
        <div style="font-size:13px;color:var(--color-text)">{{ account.ogrn }} / {{ account.okpo }}</div>
      </div>
      <div class="product-row" v-if="account.formalAddress">
        <div class="product-row__title" style="color:var(--color-text-muted);font-size:12px">Юридический адрес</div>
        <div style="font-size:13px;color:var(--color-text)">{{ account.formalAddress }}</div>
      </div>
    </div>
  </div>
</template>
