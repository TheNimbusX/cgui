<script setup lang="ts">
import { Wrench } from 'lucide-vue-next'

defineProps<{ title: string; description?: string }>()
</script>

<template>
  <div class="stub-page">
    <div class="stub-page__inner">
      <div class="stub-page__icon">
        <Wrench :size="32" />
      </div>
      <h2 class="stub-page__title">{{ title }}</h2>
      <p class="stub-page__desc">{{ description ?? 'Раздел в разработке. Скоро здесь появится контент.' }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.stub-page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 40px 24px;

  &__inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    text-align: center;
    max-width: 340px;
  }

  &__icon {
    width: 64px;
    height: 64px;
    background: var(--color-bg-subtle);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-text-muted);
    margin-bottom: 4px;
  }

  &__title {
    font-size: 18px;
    font-weight: 700;
    color: var(--color-text);
  }

  &__desc {
    font-size: 14px;
    color: var(--color-text-muted);
    line-height: 1.6;
  }
}
</style>
