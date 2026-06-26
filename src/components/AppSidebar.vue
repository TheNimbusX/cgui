<script setup lang="ts">
import type { Customer, Request } from '@/types'
import { computed } from 'vue'
import {
  Home, FileText, FileBarChart2, Package, FolderOpen,
  MessageSquare, Bell,
} from 'lucide-vue-next'

const props = defineProps<{
  customer: Customer | null
  requests: Request[]
}>()

const counts = computed(() => {
  const active = props.requests.filter((r) => !r.isCancelled && r.customerStatus !== 'done')
  return {
    requests: active.length,
    proposals: active.filter((r) => r.proposals.length).length,
    orders: active.reduce((n, r) => n + r.orders.length, 0),
    upds: props.requests.reduce((n, r) => n + r.upds.length, 0),
  }
})
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar__brand">
      <div class="sidebar__logo">
        <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
          <rect x="3" y="3" width="8" height="8" rx="2" fill="var(--color-accent)"/>
          <rect x="13" y="3" width="8" height="8" rx="2" fill="var(--color-accent)" opacity="0.35"/>
          <rect x="3" y="13" width="8" height="8" rx="2" fill="var(--color-accent)" opacity="0.35"/>
          <rect x="13" y="13" width="8" height="8" rx="2" fill="var(--color-accent)" opacity="0.65"/>
        </svg>
      </div>
      <div>
        <div class="sidebar__brand-title">Система Снабжения</div>
        <div class="sidebar__brand-sub">Клиентский портал</div>
      </div>
    </div>

    <nav class="sidebar__nav">
      <p class="sidebar__nav-label">Главное</p>
      <router-link to="/" class="sidebar__link" exact-active-class="sidebar__link--active">
        <Home :size="16" />
        Главная
      </router-link>
      <router-link to="/requests" class="sidebar__link" active-class="sidebar__link--active">
        <FileText :size="16" />
        Заявки
        <span v-if="counts.requests" class="sidebar__badge">{{ counts.requests }}</span>
      </router-link>
      <router-link to="/proposals" class="sidebar__link" active-class="sidebar__link--active">
        <FileBarChart2 :size="16" />
        КП
        <span v-if="counts.proposals" class="sidebar__badge">{{ counts.proposals }}</span>
      </router-link>
      <router-link to="/orders" class="sidebar__link" active-class="sidebar__link--active">
        <Package :size="16" />
        Заказы
        <span v-if="counts.orders" class="sidebar__badge">{{ counts.orders }}</span>
      </router-link>

      <p class="sidebar__nav-label">Документы и связь</p>
      <router-link to="/documents" class="sidebar__link" active-class="sidebar__link--active">
        <FolderOpen :size="16" />
        Документы
        <span v-if="counts.upds" class="sidebar__badge">{{ counts.upds }}</span>
      </router-link>
      <router-link to="/chat" class="sidebar__link" active-class="sidebar__link--active">
        <MessageSquare :size="16" />
        Чат
      </router-link>
      <router-link to="/notifications" class="sidebar__link" active-class="sidebar__link--active">
        <Bell :size="16" />
        Уведомления
      </router-link>
    </nav>

    <div class="sidebar__user" v-if="customer">
      <div class="sidebar__avatar">{{ customer.name.charAt(0) }}</div>
      <div class="sidebar__user-info">
        <div class="sidebar__user-name">{{ customer.name }}</div>
        <div class="sidebar__user-company">{{ customer.company }}</div>
      </div>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
.sidebar {
  width: var(--sidebar-width);
  flex-shrink: 0;
  height: 100%;
  background: var(--color-surface);
  border-right: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;

  &__brand {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 13px 16px;
    border-bottom: 1px solid var(--color-border);
    flex-shrink: 0;
  }

  &__logo {
    width: 34px;
    height: 34px;
    background: var(--color-accent-bg);
    border-radius: 9px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  &__brand-title {
    font-size: 12px;
    font-weight: 700;
    color: var(--color-text);
    line-height: 1.2;
  }

  &__brand-sub {
    font-size: 10px;
    color: var(--color-text-muted);
    margin-top: 1px;
  }

  &__nav {
    flex: 1;
    padding: 8px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 1px;
  }

  &__nav-label {
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: var(--color-text-muted);
    padding: 10px 8px 4px;

    &:first-child { padding-top: 4px; }
  }

  &__link {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 7px 9px;
    border-radius: 7px;
    text-decoration: none;
    font-size: 13px;
    font-weight: 500;
    color: var(--color-text-secondary);
    transition: all 0.13s;

    &:hover { background: var(--color-bg-subtle); color: var(--color-text); }

    &--active {
      background: var(--color-accent-bg);
      color: var(--color-accent);
    }
  }

  &__badge {
    margin-left: auto;
    font-size: 11px;
    font-weight: 600;
    color: var(--color-accent);
    background: var(--color-accent-bg);
    border-radius: 10px;
    padding: 0 7px;
    min-width: 20px;
    text-align: center;

    .sidebar__link--active & {
      background: rgba(37, 99, 235, 0.12);
    }
  }

  &__user {
    display: flex;
    align-items: center;
    gap: 9px;
    padding: 10px 14px;
    border-top: 1px solid var(--color-border);
    flex-shrink: 0;
  }

  &__avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: var(--color-accent-bg);
    color: var(--color-accent);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-weight: 700;
    flex-shrink: 0;
  }

  &__user-info { flex: 1; min-width: 0; }

  &__user-name {
    font-size: 12px;
    font-weight: 600;
    color: var(--color-text);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__user-company {
    font-size: 11px;
    color: var(--color-text-muted);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

@media (max-width: 767px) {
  .sidebar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: auto;
    border-right: none;
    border-top: 1px solid var(--color-border);
    flex-direction: row;
    z-index: 100;

    &__brand, &__user { display: none; }

    &__nav {
      flex-direction: row;
      justify-content: space-around;
      gap: 0;
      padding: 6px 8px;
      padding-bottom: max(6px, env(safe-area-inset-bottom));
      overflow: visible;
      width: 100%;
    }

    &__nav-label { display: none; }

    &__link {
      flex-direction: column;
      gap: 3px;
      padding: 4px 12px;
      font-size: 10px;
      border-radius: 8px;
      position: relative;
    }

    &__badge {
      position: absolute;
      top: 0;
      right: 6px;
      margin: 0;
      font-size: 9px;
      padding: 0 4px;
      min-width: 14px;
    }
  }
}
</style>
