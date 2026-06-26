<script setup lang="ts">
import { ref, computed, onMounted, provide } from 'vue'
import type { CabinetData } from '@/types'
import AppSidebar from '@/components/AppSidebar.vue'
import mockData from '../examples/cabinet-response.json'

const data = ref<CabinetData | null>(null)
const loading = ref(true)

onMounted(() => {
  setTimeout(() => {
    data.value = mockData as CabinetData
    loading.value = false
  }, 300)
})

provide('requests', computed(() => data.value?.requests ?? []))
provide('customer', computed(() => data.value?.customer ?? null))
</script>

<template>
  <div class="app">
    <AppSidebar
      :customer="data?.customer ?? null"
      :requests="data?.requests ?? []"
    />
    <div class="app__right">
      <div class="app__loader" v-if="loading">
        <div class="spinner" />
      </div>
      <router-view v-else />
    </div>
  </div>
</template>

<style lang="scss">
@use '@/styles/main';

.app {
  display: flex;
  height: 100vh;
  overflow: hidden;

  &__right {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    min-width: 0;
  }

  &__loader {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.spinner {
  width: 28px;
  height: 28px;
  border: 2.5px solid var(--color-border);
  border-top-color: var(--color-accent);
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

@media (max-width: 767px) {
  .app { flex-direction: column; height: 100dvh; }
}
</style>
