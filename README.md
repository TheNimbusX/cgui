# cgui

Кабинет клиента — интерфейс для отслеживания заявок на промышленное оборудование.

**Стек:** Vue 3 · TypeScript · SCSS · Apollo Client · Vite

## Запуск

```bash
npm install
npm run dev
```

Откроется на `http://localhost:5173`.

## Сборка

```bash
npm run build
```

## Переменные окружения

Создай `.env.local` в корне:

```
VITE_GRAPHQL_URL=https://your-api/graphql
```

Без этой переменной запросы идут на `/graphql`. Сейчас данные берутся из mock-файла — бэкенд не нужен.
