<script setup lang="ts">
import type { CustomerStatus } from '@/types'
import { computed } from 'vue'
import { Check } from 'lucide-vue-next'

const props = defineProps<{
  status: CustomerStatus
  isCancelled: boolean
}>()

const steps = [
  { key: 'processing', label: 'Обработка' },
  { key: 'proposal',   label: 'КП' },
  { key: 'delivery',   label: 'Доставка' },
  { key: 'done',       label: 'Готово' },
] as const

const ORDER: CustomerStatus[] = ['processing', 'proposal', 'invoice', 'delivery', 'done']

const currentIndex = computed(() => ORDER.indexOf(props.status))

function stepState(key: string): 'done' | 'active' | 'pending' {
  const i = ORDER.indexOf(key as CustomerStatus)
  if (i < currentIndex.value) return 'done'
  if (i === currentIndex.value) return 'active'
  return 'pending'
}
</script>

<template>
  <div class="tracker">
    <div class="tracker__cancelled" v-if="isCancelled">Заявка отменена</div>
    <div class="tracker__steps" v-else>
      <div
        v-for="(step, i) in steps"
        :key="step.key"
        class="tracker__step"
        :class="`tracker__step--${stepState(step.key)}`"
      >
        <div class="tracker__connector">
          <div
            v-if="i > 0"
            class="tracker__line"
            :class="`tracker__line--${stepState(step.key)}`"
          />
          <div class="tracker__dot">
            <Check v-if="stepState(step.key) === 'done'" :size="10" :stroke-width="3" />
          </div>
          <div
            v-if="i < steps.length - 1"
            class="tracker__line"
            :class="`tracker__line--${stepState(steps[i + 1].key)}`"
          />
        </div>
        <div class="tracker__label">{{ step.label }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tracker {
  &__cancelled {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    font-weight: 500;
    color: var(--color-danger);
    background: var(--color-danger-bg);
    border-radius: 20px;
    padding: 4px 12px;
  }

  &__steps {
    display: flex;
    align-items: flex-start;
  }

  &__step {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    gap: 5px;
  }

  &__connector {
    display: flex;
    align-items: center;
    width: 100%;
  }

  &__line {
    flex: 1;
    height: 2px;
    background: var(--color-border);
    transition: background 0.2s;

    &--done, &--active { background: var(--color-accent); }
  }

  &__dot {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid var(--color-border);
    background: var(--color-surface);
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;

    .tracker__step--done & {
      border-color: var(--color-accent);
      background: var(--color-accent);
      color: #fff;
    }

    .tracker__step--active & {
      border-color: var(--color-accent);
      background: var(--color-surface);
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.18);
    }
  }

  &__label {
    font-size: 11px;
    color: var(--color-text-muted);
    text-align: center;
    white-space: nowrap;

    .tracker__step--done &,
    .tracker__step--active & {
      color: var(--color-accent);
      font-weight: 500;
    }
  }
}
</style>
