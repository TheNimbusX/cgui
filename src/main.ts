import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import HomeView from './views/HomeView.vue'
import RequestsView from './views/RequestsView.vue'
import StubView from './views/StubView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/',               component: HomeView },
    { path: '/requests',      component: RequestsView },
    {
      path: '/proposals',
      component: StubView,
      props: { title: 'Коммерческие предложения', description: 'Здесь будут отображаться все КП по вашим заявкам. Раздел в разработке.' },
    },
    {
      path: '/orders',
      component: StubView,
      props: { title: 'Заказы', description: 'Здесь будет список всех заказов и статусы доставок. Раздел в разработке.' },
    },
    {
      path: '/documents',
      component: StubView,
      props: { title: 'Документы', description: 'Счета, УПД и другие документы по вашим заявкам появятся здесь. Раздел в разработке.' },
    },
    {
      path: '/chat',
      component: StubView,
      props: { title: 'Чат с менеджером', description: 'Здесь вы сможете общаться с менеджером напрямую. Раздел в разработке.' },
    },
    {
      path: '/notifications',
      component: StubView,
      props: { title: 'Уведомления', description: 'Уведомления о статусах заявок, новых счетах и отгрузках появятся здесь. Раздел в разработке.' },
    },
  ],
})

createApp(App).use(router).mount('#app')
