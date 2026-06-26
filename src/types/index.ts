export interface CustomerPhone {
  id: string
  number: string
  ext: string
  name: string
  dept: string
  isPrimary: boolean
  isValid: boolean
}

export interface Customer {
  id: string
  created: number
  updated: number
  name: string
  company: string
  region: string
  timezone: string
  avatar: string
  user: { email: string }
  phones: CustomerPhone[]
}

export interface Manager {
  id: string
  name: string
  email: string
  avatar: string
}

export interface Company {
  id: string
  name: string
  phone: string
}

export interface CustomerAccount {
  id: string
  buyer: string
  inn: string
  kpp: string
  ogrn: string
  okpo: string
  rs: string
  ks: string
  bik: string
  bank: string
  formalAddress: string
  postalAddress: string
  shippingAddress: string
  actualAddress: string
  invoicePrepaidRequired: number
  noContractRequired: number
  phone: string
  customerName: string
  customerPosition: string
}

export interface ProductRequested {
  id: string
  qty: number
  qtyUnits: string
  sku: string
  model: string
  brandterm: { name: string }
  categoryterm: { name: string }
}

export interface Product {
  id: string
  changed: number
  qty: number
  qtyUnits: string
  sku: string
  model: string
  shippingTime: string
  shippingMin: number
  shippingMax: number
  weight: number
  status: string
  disabled: boolean
  brandterm: { name: string }
  categoryterm: { name: string }
}

export interface ProposalProduct {
  id: string
  lineNum: number
  title: string
  qty: number
  currency: string
  vat: number
  unit: number
  unitNoVat: number
  line: number
  lineNoVat: number
}

export interface Proposal {
  id: string
  created: number
  changed: number
  title: string | null
  actuality: string | null
  shippingTime: string | null
  prepaid: number | null
  companyDetails: string | null
  proposalProducts: ProposalProduct[]
}

export interface InvoiceProduct {
  id: string
  created: number
  active: boolean
  lineNum: number
  title: string
  qty: number
  currency: string
  vat: number
  unit: number
  unitNoVat: number
  line: number
  lineNoVat: number
}

export interface InvoicePayment {
  id: string
  created: number
  changed: number
  paidInput: number
  paidPercent: number
  paymentDate: number
  transferDate: number
  transferNumber: string
}

export interface Invoice {
  id: string
  created: number
  changed: number
  invoiceNumber: string
  title: string
  actuality: string
  shippingTime: string
  prepaid: number
  canceled: number
  firstPaymentCreated: number
  paid: number
  paidInput: number
  companyDetails: string
  invoiceProducts: InvoiceProduct[]
  invoicePayments: InvoicePayment[]
}

export interface ShippingProduct {
  id: string
  productID: string
}

export interface ShippingGroup {
  id: string
  created: number
  postDate: number
  documentsDate: number
  gtd: string
}

export interface Shipping {
  id: string
  created: number
  changed: number
  received: number
  sentToClient: number
  productsIds: string
  shippingProducts: ShippingProduct[]
  shippingGroup: ShippingGroup | null
}

export interface Order {
  id: string
  created: number
  changed: number
  postDate: number
  received: string
  status: number
  products: { id: string; shippingMin: number; shippingMax: number }[]
  shippings: Shipping[]
}

export interface UpdProduct {
  productID: string
}

export interface UpdRequest {
  requestID: string
}

export interface Upd {
  id: string
  created: number
  changed: number
  number: number
  date: number
  updProducts: UpdProduct[]
  updRequests: UpdRequest[]
}

export type CustomerStatus = 'processing' | 'proposal' | 'invoice' | 'delivery' | 'done'

export interface Request {
  id: string
  created: number
  changed: number
  contractNumber: string
  contractDate: number
  contractSpecNumber: string
  contractSpecDate: number
  customerDesiredPrice: number
  customerStatus: CustomerStatus
  isCancelled: boolean
  manager: Manager
  company: Company
  customerAccount: CustomerAccount | null
  productsRequested: ProductRequested[]
  products: Product[]
  proposals: Proposal[]
  invoices: Invoice[]
  orders: Order[]
  upds: Upd[]
}

export interface CabinetData {
  customer: Customer
  requests: Request[]
}
