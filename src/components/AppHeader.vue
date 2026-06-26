<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  Search, ChevronDown, LayoutGrid, List, Bell, X, Check,
} from 'lucide-vue-next'

import type { SortKey, ViewMode } from '@/types/ui'

const props = defineProps<{
  sort: SortKey
  viewMode: ViewMode
  search: string
  notifCount?: number
}>()

const emit = defineEmits<{
  'update:sort': [SortKey]
  'update:viewMode': [ViewMode]
  'update:search': [string]
}>()

const sortOpen = ref(false)

const sortOptions: { key: SortKey; label: string }[] = [
  { key: 'newest', label: 'Сначала новые' },
  { key: 'oldest', label: 'Сначала старые' },
  { key: 'status', label: 'По статусу' },
  { key: 'amount', label: 'По сумме' },
]

const sortLabel = computed(
  () => sortOptions.find((o) => o.key === props.sort)?.label ?? 'Сортировка'
)

function selectSort(key: SortKey) {
  emit('update:sort', key)
  sortOpen.value = false
}
</script>

<template>
  <header class="app-header">
    <div class="app-header__search">
      <Search :size="15" class="app-header__search-icon" />
      <input
        class="app-header__search-input"
        type="text"
        placeholder="Поиск по договору, компании"
        :value="search"
        @input="emit('update:search', ($event.target as HTMLInputElement).value)"
      />
      <button v-if="search" class="app-header__search-clear" @click="emit('update:search', '')">
        <X :size="13" />
      </button>
    </div>

    <div class="app-header__controls">
      <!-- Sort dropdown -->
      <div class="dropdown" :class="{ 'dropdown--open': sortOpen }">
        <button class="dropdown__trigger" @click="sortOpen = !sortOpen">
          {{ sortLabel }}
          <ChevronDown :size="14" class="dropdown__chevron" />
        </button>
        <div class="dropdown__menu" v-if="sortOpen">
          <button
            v-for="opt in sortOptions"
            :key="opt.key"
            class="dropdown__item"
            :class="{ 'dropdown__item--active': sort === opt.key }"
            @click="selectSort(opt.key)"
          >
            <Check v-if="sort === opt.key" :size="13" />
            <span v-else class="dropdown__item-spacer" />
            {{ opt.label }}
          </button>
        </div>
      </div>

      <!-- View toggle -->
      <div class="view-toggle">
        <button
          class="view-toggle__btn"
          :class="{ 'view-toggle__btn--active': viewMode === 'cards' }"
          @click="emit('update:viewMode', 'cards')"
          title="Карточки"
        >
          <LayoutGrid :size="15" />
          <span>Карточки</span>
        </button>
        <button
          class="view-toggle__btn"
          :class="{ 'view-toggle__btn--active': viewMode === 'list' }"
          @click="emit('update:viewMode', 'list')"
          title="Список"
        >
          <List :size="15" />
          <span>Список</span>
        </button>
      </div>

      <!-- Bell -->
      <button class="notif-btn">
        <Bell :size="17" />
        <span class="notif-btn__badge" v-if="notifCount">{{ notifCount }}</span>
      </button>
    </div>
  </header>

  <!-- backdrop for dropdown -->
  <div v-if="sortOpen" class="dropdown-backdrop" @click="sortOpen = false" />
</template>

<style lang="scss" scoped>
.app-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  flex-shrink: 0;
  min-height: 52px;

  &__search {
    flex: 1;
    max-width: 360px;
    position: relative;
    display: flex;
    align-items: center;
  }

  &__search-icon {
    position: absolute;
    left: 10px;
    color: var(--color-text-muted);
    pointer-events: none;
  }

  &__search-input {
    width: 100%;
    height: 34px;
    padding: 0 32px 0 34px;
    border: 1.5px solid var(--color-border);
    border-radius: 8px;
    background: var(--color-bg);
    font-size: 13px;
    color: var(--color-text);
    font-family: inherit;
    transition: border-color 0.15s;
    outline: none;

    &::placeholder { 
      color: var(--color-text-muted); 
    }

    &:focus { 
      border-color: var(--color-accent); 
      background: var(--color-surface); 
    }
  }

  &__search-clear {
    position: absolute;
    right: 8px;
    border: none;
    background: none;
    cursor: pointer;
    color: var(--color-text-muted);
    display: flex;
    padding: 2px;
    border-radius: 4px;

    &:hover { 
      color: var(--color-text); 
    }
  }

  &__controls {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-left: auto;
  }
}

// Dropdown
.dropdown {
  position: relative;

  &__trigger {
    display: flex;
    align-items: center;
    gap: 6px;
    height: 34px;
    padding: 0 12px;
    border: 1.5px solid var(--color-border);
    border-radius: 8px;
    background: var(--color-surface);
    font-size: 13px;
    font-weight: 500;
    color: var(--color-text-secondary);
    cursor: pointer;
    font-family: inherit;
    white-space: nowrap;
    transition: all 0.15s;

    &:hover { 
      border-color: var(--color-accent);
      color: var(--color-text); 
    }
  }

  &--open &__trigger {
    border-color: var(--color-accent);
    color: var(--color-text);
  }

  &__chevron {
    transition: transform 0.15s;

    .dropdown--open & { 
      transform: rotate(180deg); 
    }
  }

  &__menu {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    min-width: 180px;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 10px;
    box-shadow: 0 8px 24px rgba(0,0,0,.10);
    padding: 4px;
    z-index: 200;
  }

  &__item {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    padding: 7px 10px;
    border: none;
    background: transparent;
    font-size: 13px;
    font-weight: 500;
    color: var(--color-text-secondary);
    cursor: pointer;
    border-radius: 7px;
    font-family: inherit;
    transition: all 0.12s;

    &:hover { 
      background: var(--color-bg-subtle); 
      color: var(--color-text); 
    }

    &--active {
      color: var(--color-accent);
      background: var(--color-accent-bg);
    }
  }

  &__item-spacer { width: 13px; }
}

.dropdown-backdrop {
  position: fixed;
  inset: 0;
  z-index: 199;
}

// View toggle
.view-toggle {
  display: flex;
  background: var(--color-bg-subtle);
  border-radius: 8px;
  padding: 2px;

  &__btn {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 5px 11px;
    border-radius: 6px;
    border: none;
    background: transparent;
    font-size: 12px;
    font-weight: 500;
    color: var(--color-text-muted);
    cursor: pointer;
    transition: all 0.15s;
    font-family: inherit;

    &:hover { 
      color: var(--color-text); 
    }

    &--active {
      background: var(--color-surface);
      color: var(--color-text);
      box-shadow: 0 1px 3px rgba(0,0,0,.08);
    }
  }
}

// Bell
.notif-btn {
  position: relative;
  width: 34px;
  height: 34px;
  border: 1.5px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-surface);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--color-text-secondary);
  transition: all 0.15s;

  &:hover { 
    border-color: var(--color-accent); 
    color: var(--color-accent); 
  }

  &__badge {
    position: absolute;
    top: -5px;
    right: -5px;
    min-width: 16px;
    height: 16px;
    background: var(--color-danger);
    color: #fff;
    font-size: 10px;
    font-weight: 700;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 3px;
    border: 2px solid var(--color-surface);
  }
}

@media (max-width: 767px) {
  .app-header {
    flex-wrap: wrap;
    padding: 10px 14px 8px;
    gap: 8px;

    &__search {
      order: 2;
      max-width: none;
      width: 100%;
      flex: none;
    }

    &__controls {
      order: 1;
      margin-left: auto;
    }
  }

  .view-toggle span { 
    display: none; 
  }
}
</style>
