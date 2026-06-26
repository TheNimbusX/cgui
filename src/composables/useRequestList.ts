import { computed } from 'vue'
import type { Ref } from 'vue'
import type { Request } from '@/types'
import type { SortKey } from '@/types/ui'
import { getInvoiceTotal } from './useInvoice'

const STATUS_ORDER: Record<string, number> = {
  processing: 0, proposal: 1, invoice: 2, delivery: 3, done: 4,
}

export function useRequestList(
  requests: Ref<Request[]>,
  sort: Ref<SortKey>,
  search: Ref<string>,
) {
  return computed(() => {
    let list = requests.value

    const q = search.value.trim().toLowerCase()
    if (q) {
      list = list.filter(
        (r) =>
          r.contractNumber.toLowerCase().includes(q) ||
          r.company.name.toLowerCase().includes(q) ||
          r.productsRequested.some((p) => p.model.toLowerCase().includes(q)),
      )
    }

    return [...list].sort((a, b) => {
      switch (sort.value) {
        case 'oldest':
          return a.changed - b.changed
        case 'status':
          return (STATUS_ORDER[a.customerStatus] ?? 99) - (STATUS_ORDER[b.customerStatus] ?? 99)
        case 'amount': {
          const ta = a.invoices[0] ? getInvoiceTotal(a.invoices[0]) : 0
          const tb = b.invoices[0] ? getInvoiceTotal(b.invoices[0]) : 0
          return tb - ta
        }
        default:
          return b.changed - a.changed
      }
    })
  })
}
