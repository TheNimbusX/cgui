<script setup lang="ts">
import type { Request } from '@/types'
import type { ComputedRef } from 'vue'
import { ref, computed, inject } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import type { SortKey, ViewMode } from '@/types/ui'
import RequestCard from '@/components/request/RequestCard.vue'
import RequestRow from '@/components/request/RequestRow.vue'
import RequestDetail from '@/components/request/RequestDetail.vue'
import { useRequestList } from '@/composables/useRequestList'

const requests = inject<ComputedRef<Request[]>>('requests')!

const tab = ref<'active' | 'archive'>('active')
const selected = ref<Request | null>(null)
const sort = ref<SortKey>('newest')
const viewMode = ref<ViewMode>('cards')
const search = ref('')

const active = computed(() =>
  requests.value.filter((r) => !r.isCancelled && r.customerStatus !== 'done')
)
const archive = computed(() =>
  requests.value.filter((r) => r.isCancelled || r.customerStatus === 'done')
)
const base = computed(() => (tab.value === 'active' ? active.value : archive.value))
const shown = useRequestList(base, sort, search)
</script>

<template>
  <div class="page-wrap">
    <AppHeader v-model:sort="sort" v-model:view-mode="viewMode" v-model:search="search" />

    <div class="view-layout" :class="{ 'view-layout--split': !!selected }">
      <div class="view-layout__list">
        <div class="page-header">
          <h1 class="page-title">Заявки</h1>
          <div class="tabs">
            <button
              class="tabs__btn"
              :class="{ 'tabs__btn--active': tab === 'active' }"
              @click="tab = 'active'; selected = null"
            >
              Активные <span class="tabs__count">{{ active.length }}</span>
            </button>
            <button
              class="tabs__btn"
              :class="{ 'tabs__btn--active': tab === 'archive' }"
              @click="tab = 'archive'; selected = null"
            >
              Архив <span class="tabs__count">{{ archive.length }}</span>
            </button>
          </div>
        </div>

        <template v-if="viewMode === 'cards'">
          <div class="cards-grid">
            <RequestCard
              v-for="req in shown"
              :key="req.id"
              :request="req"
              :active="selected?.id === req.id"
              @open="selected = req"
            />
            <div class="empty" v-if="!shown.length">
              {{ tab === 'active' ? 'Активных заявок нет' : 'Архив пуст' }}
            </div>
          </div>
        </template>

        <template v-else>
          <div class="list-view">
            <div class="list-view__head">
              <span>Договор</span><span>Компания</span><span>Товары</span>
              <span>Статус</span><span>Сумма</span><span>Опл.</span>
              <span>Обновлено</span><span />
            </div>
            <RequestRow
              v-for="req in shown"
              :key="req.id"
              :request="req"
              :active="selected?.id === req.id"
              @open="selected = req"
            />
            <div class="empty" v-if="!shown.length">
              {{ tab === 'active' ? 'Активных заявок нет' : 'Архив пуст' }}
            </div>
          </div>
        </template>
      </div>

      <transition name="slide-in">
        <div class="view-layout__detail" v-if="selected">
          <RequestDetail :request="selected" @close="selected = null" />
        </div>
      </transition>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-wrap {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.tabs {
  display: flex;
  gap: 3px;
  background: var(--color-bg-subtle);
  border-radius: 9px;
  padding: 3px;

  &__btn {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 5px 13px;
    border-radius: 7px;
    border: none;
    background: transparent;
    font-size: 13px;
    font-weight: 500;
    color: var(--color-text-secondary);
    cursor: pointer;
    transition: all 0.15s;
    font-family: inherit;

    &:hover { color: var(--color-text); }
    &--active {
      background: var(--color-surface);
      color: var(--color-text);
      box-shadow: 0 1px 3px rgba(0,0,0,.08);
    }
  }

  &__count {
    font-size: 11px;
    font-weight: 600;
    color: var(--color-text-muted);
    background: var(--color-border);
    border-radius: 10px;
    padding: 0 6px;
    min-width: 18px;
    text-align: center;
  }

  &__btn--active &__count {
    background: var(--color-accent-bg);
    color: var(--color-accent);
  }
}

.list-view {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  overflow: hidden;

  &__head {
    display: grid;
    grid-template-columns: 130px 1fr 1fr 100px 110px 55px 90px 20px;
    gap: 12px;
    padding: 8px 16px;
    background: var(--color-bg-subtle);
    border-bottom: 1px solid var(--color-border);
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-text-muted);
  }
}
</style>
