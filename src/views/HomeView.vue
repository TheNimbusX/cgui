<script setup lang="ts">
import type { Request } from '@/types'
import type { ComputedRef } from 'vue'
import { computed, inject } from 'vue'
import { useRouter } from 'vue-router'
import { FileText, ArrowRight, Clock, CheckCircle2, Truck } from 'lucide-vue-next'
import { formatDate, formatMoney } from '@/composables/useFormatters'
import { getInvoiceTotal, getInvoiceCurrency } from '@/composables/useInvoice'

const requests = inject<ComputedRef<Request[]>>('requests')!
const router = useRouter()

const active = computed(() =>
  requests.value.filter((r) => !r.isCancelled && r.customerStatus !== 'done')
)

const statusLabels: Record<string, { label: string; icon: typeof Clock }> = {
  processing: { label: 'Обработка',  icon: Clock },
  proposal:   { label: 'КП',         icon: FileText },
  invoice:    { label: 'Счёт',       icon: FileText },
  delivery:   { label: 'Доставка',   icon: Truck },
  done:       { label: 'Завершена',  icon: CheckCircle2 },
}
</script>

<template>
  <div class="home">
    <!-- Приветствие -->
    <div class="home__hero">
      <div class="home__hero-text">
        <h1 class="home__hero-title">Добро пожаловать</h1>
        <p class="home__hero-sub">
          {{ active.length ? `У вас ${active.length} активных заявок` : 'Нет активных заявок' }}
        </p>
      </div>
      <button class="home__hero-btn" @click="router.push('/requests')">
        Все заявки
        <ArrowRight :size="15" />
      </button>
    </div>

    <!-- Активные заявки (до 3 штук) -->
    <div class="home__section" v-if="active.length">
      <h2 class="home__section-title">Активные заявки</h2>
      <div class="home__cards">
        <div
          v-for="req in active.slice(0, 3)"
          :key="req.id"
          class="req-card"
          @click="router.push('/requests')"
        >
          <div class="req-card__head">
            <span class="req-card__id">{{ req.contractNumber || `#${req.id}` }}</span>
            <span class="req-card__status">
              <component :is="statusLabels[req.customerStatus]?.icon ?? Clock" :size="12" />
              {{ statusLabels[req.customerStatus]?.label ?? req.customerStatus }}
            </span>
          </div>

          <div class="req-card__products" v-if="req.productsRequested.length">
            {{ req.productsRequested.map((p) => p.model || p.brandterm.name).join(', ') }}
          </div>

          <div class="req-card__money" v-if="req.invoices.length">
            <span class="req-card__money-label">Выставлено</span>
            <span class="req-card__money-val">
              {{ formatMoney(getInvoiceTotal(req.invoices[0]), getInvoiceCurrency(req.invoices[0])) }}
            </span>
          </div>

          <div class="req-card__footer">
            <span class="req-card__date">{{ formatDate(req.changed) }}</span>
            <span class="req-card__company">{{ req.company.name }}</span>
          </div>
        </div>
      </div>

      <button class="home__all-btn" v-if="active.length > 3" @click="router.push('/requests')">
        Показать все {{ active.length }} заявок
        <ArrowRight :size="14" />
      </button>
    </div>

    <!-- Пусто -->
    <div class="home__empty" v-else>
      <FileText :size="40" />
      <p>Активных заявок нет</p>
      <button class="home__hero-btn" @click="router.push('/requests')">
        Перейти к заявкам
        <ArrowRight :size="15" />
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home {
  height: 100%;
  overflow-y: auto;
  padding: 28px 28px 40px;
  display: flex;
  flex-direction: column;
  gap: 28px;

  &__hero {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    background: var(--color-accent);
    border-radius: 16px;
    padding: 24px 28px;
    flex-wrap: wrap;
  }

  &__hero-title {
    font-size: 22px;
    font-weight: 700;
    color: #fff;
  }

  &__hero-sub {
    font-size: 14px;
    color: rgba(255,255,255,.75);
    margin-top: 4px;
  }

  &__hero-btn {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    font-size: 14px;
    font-weight: 600;
    color: var(--color-accent);
    background: #fff;
    border: none;
    border-radius: 10px;
    padding: 10px 20px;
    cursor: pointer;
    font-family: inherit;
    white-space: nowrap;
    transition: opacity 0.15s;
    flex-shrink: 0;

    &:hover { opacity: 0.9; }
  }

  &__section-title {
    font-size: 15px;
    font-weight: 700;
    color: var(--color-text);
    margin-bottom: 14px;
  }

  &__cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 12px;
  }

  &__all-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin-top: 12px;
    font-size: 13px;
    font-weight: 500;
    color: var(--color-accent);
    background: var(--color-accent-bg);
    border: none;
    border-radius: 8px;
    padding: 7px 14px;
    cursor: pointer;
    font-family: inherit;
    transition: all 0.15s;

    &:hover { background: var(--color-accent); color: #fff; }
  }

  &__empty {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 14px;
    color: var(--color-text-muted);

    p { font-size: 15px; }
  }
}

.req-card {
  background: var(--color-surface);
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius);
  padding: 14px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: border-color 0.15s, box-shadow 0.15s;

  &:hover {
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

  &__status {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 11px;
    font-weight: 500;
    color: var(--color-accent);
    background: var(--color-accent-bg);
    border-radius: 20px;
    padding: 3px 9px;
    white-space: nowrap;
  }

  &__products {
    font-size: 13px;
    color: var(--color-text-secondary);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__money {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding-top: 6px;
    border-top: 1px solid var(--color-border);
  }

  &__money-label {
    font-size: 12px;
    color: var(--color-text-muted);
  }

  &__money-val {
    font-size: 14px;
    font-weight: 700;
    color: var(--color-text);
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    font-size: 11px;
    color: var(--color-text-muted);
  }
}

@media (max-width: 767px) {
  .home {
    padding: 16px 16px 90px;
    gap: 20px;
  }

  .home__hero {
    padding: 18px 20px;
  }
}
</style>
