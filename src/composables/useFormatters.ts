export function formatDate(unix: number): string {
  if (!unix) return '—'
  return new Date(unix * 1000).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

export function formatMoney(amount: number, currency: string): string {
  const sign = currency === 'EUR' ? '€' : '₽'
  const formatted = new Intl.NumberFormat('ru-RU', {
    maximumFractionDigits: 0,
  }).format(amount)
  return currency === 'EUR' ? `${formatted} ${sign}` : `${formatted} ${sign}`
}

export function formatPercent(value: number): string {
  return `${Math.round(value)}%`
}
