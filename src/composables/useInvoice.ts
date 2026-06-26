import type { Invoice, InvoiceProduct } from '@/types'

export function getActiveProducts(invoice: Invoice): InvoiceProduct[] {
  return invoice.invoiceProducts.filter((p) => p.active)
}

export function getInvoiceTotal(invoice: Invoice): number {
  return getActiveProducts(invoice).reduce((sum, p) => sum + p.line, 0)
}

export function getInvoiceCurrency(invoice: Invoice): string {
  return invoice.invoiceProducts[0]?.currency ?? 'RUB'
}
