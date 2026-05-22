# Customer Cabinet — Specification

## 1. What we're building

The customer cabinet is a web app where a customer tracks their orders with the
company — requests, invoices, deliveries — and sees at a glance where each one
stands and how much is left to pay.

The customer is a procurement specialist at a company that buys industrial
equipment: machine tools, automation, factory components. They place a request,
receive a commercial proposal and an invoice, pay, and receive the goods. The
cabinet shows that journey.

---

## 2. Product vision

This is the agreed product intent. The specific UX is the developer's choice;
this section defines the spirit and the business meaning.

**Core idea.** This is a status tracker in the spirit of Wise or PayPal, not a part of a heavy
CRM. The customer's mental model is "I sent a request — where is it and how much
do I owe?" The cabinet answers that in a single glance.

1. **The request is the only thing to navigate.** Invoice, order, shipping, and
   UPD have no standalone meaning for the customer — they live inside a
   request. So there is one list of requests, and everything else opens from
   within a request.

2. **Home is the dashboard.** Most of customers
   have 2–3 active requests. The dashboard page might conver 90% needs of customers. 
   A request card might show: what was ordered (brief), a status
   tracker, money (billed / paid), and the next expected step.

3. **A request opens in full detail** — all of its data on one screen.

4. **Status is a progress bar.** The customer sees several notable statuses as a step
   tracker, like parcel tracking or a Wise transfer. They always see where the
   request is and what comes next.

5. **Money is what's on the invoice.** The headline numbers are the invoice
   total, the amount paid. The accounting breakdown sits behind
   a "show more" control (progressive disclosure).

6. **Requests list.** The requests list shows all active requests. User can switch tab to see completed and cancelled requests.

**In summary — three screens:**: home (dashboard, customer account, summary widgets), the request list, the request page. 
Plain language, no legal jargon;

---

## 3. Glossary

| Russian term | English term | Meaning |
|---|---|---|
| Заявка | Request | The customer's statement of need (products, desired price). The single thing the customer navigates. |
| КП | Proposal | A commercial proposal sent to the customer. Structurally a projection of an invoice. |
| Счёт | Invoice | An invoice issued to the customer; the customer makes payments against it. |
| Заказ | Order | The company's purchase of the goods. The customer sees the order's dates and cargo status. |
| Доставка | Shipping | A shipment to the customer: dispatch dates and the customs declaration (ГТД / GTD). |
| УПД | UPD | Universal Transfer Document — the closing accounting document. One UPD may cover several requests. |
| Реквизиты | Customer account | The customer's legal-entity card — company name, INN, bank details, addresses. Appears in the invoice and UPD. The `RequestCustomerAccount` entity. |
| Менеджер | Manager | The company's salesperson handling the request. The cabinet shows their name, email, avatar, and the company phone number. |

---

## 4. Roles, access, authentication

- **Authentication and authorization are out of scope for this document.** The
  customer already arrives with an HTTP-only cookie that the backend accepts. The
  cabinet does not manage the cookie and does not implement a login form.
  
  In case if backend returns 401, the cabinet redirects to the login page `https://id.snab.work`.
  After successful login, the cabinet redirects back to the original page.

  In case if backend returns 403, the cabinet redirects to the access denied page `/access-denied`.
  The access denied page shows a message that the customer is not allowed to access the action requested.

- The customer is a `User` linked one-to-one with a `Customer`. The cabinet works in the context of a single customer.

- The server identifies the customer from the cookie session. The cabinet query
  (section 8) takes no customer ID — the customer comes from the session.

- The backend returns only this customer's data, already filtered to the fields
  the customer is allowed to see.

- **Session expiry.** When a request fails because the session is missing or
  expired (HTTP 401, or a GraphQL authentication error), the cabinet redirects to
  an external login URL owned by the surrounding system — it has no login form of
  its own. The exact URL should be configured in the environment variables.

---

## 5. Project stages

This document describes primarily **Stage 1**.

| Stage | Contents |
|---|---|
| **Stage 1** | Read-only cabinet: the customer queries and reads their requests and documents. Goal: ship a working cabinet, freeze design conception and UI/UX decisions. |
| **Stage 2** | Mutations / interactivity: request creation (form + first mutations), editing customer phone numbers. |
| **Stage 3** | Features: accept/reject a proposal and confirm an invoice; edit customer account details; customer↔manager chat; call-reminder notifications; questionnaires (quiz); event-driven notifications. |
| After Stage 3 | Internationalisation (i18n). |

An overview of Stages 2–3 is in section 12.

---

## 6. The request lifecycle

The central document is the **Request**. Every other document is created during
the request's life and always belongs to it.

```
        ┌──────────┐
        │  Request │  the customer describes a need: products, desired price
        └────┬─────┘
             │  the manager works the request
             ▼
        ┌──────────┐
        │ Proposal │  a commercial proposal sent to the customer
        └────┬─────┘  (structure = projection of an invoice)
             │  the customer agrees
             ▼
        ┌──────────┐
        │  Invoice │  issued to the customer; the customer makes payments
        └────┬─────┘
             │  payment triggers fulfilment
             ▼
        ┌──────────┐
        │   Order  │  the company buys the goods; the customer sees the
        └────┬─────┘  order's dates and cargo status
             │  cargo is formed
             ▼
        ┌──────────┐
        │ Shipping │  shipments: dispatch dates, customs declaration (GTD)
        └────┬─────┘
             │  goods handed over to the customer
             ▼
        ┌──────────┐
        │   UPD    │  the closing accounting document. May cover several requests.
        └──────────┘

Customer account (RequestCustomerAccount) — the customer's legal-entity card;
belongs to the request and appears in the invoice and UPD.
```

How the documents map to backend entities:

| Document | Entity | Relation to the request |
|---|---|---|
| Request | `Request` | — |
| Proposal | `Proposal` (new — see section 8) | one-to-many from the request |
| Invoice | `Invoice` + `InvoiceProduct` + `InvoicePayment` | one-to-many from the request |
| Order | `Order` | one-to-many from the request |
| Shipping | `OrderShipping` + `OrderShippingGroup` + `OrderShippingProduct` | one-to-many within the order |
| UPD | `Upd` + `UpdProduct` + `UpdRequest` | many-to-many with requests |
| Customer account | `RequestCustomerAccount` | one-to-one with the request |
| Products | `Product` (line items) and `productsRequested` (what the customer asked for) | from the request |

---

## 7. Request status

| code | name | description |
| :--- | :--- | :--- |
| 1 | отменена | Заявка отменена |
| 10 | формируется | Заявка создана и ожидает формирования для отправки поставщикам |
| 11 | восстановлена | Заявка восстановлена |
| 20 | подготовка КП | Отправлен запрос КП поставщикам |
| 30 | уточнения клиенту | Отправлены уточнения клиенту |
| 40 | уточнения поставщику | Отправлены уточнения поставщику |
| 50 | отправлено КП | Отправлен КП клиенту |
| 60 | отправлен счет | Отправлен счет клиенту |
| 70 | заказан | Отправлен заказ поставщику |
| 80 | частично в пути | Создан груз на часть товаров по заказу |
| 90 | в пути | Создан груз со всеми товарами по заказу |
| 100 | частично отгружен | Создано УПД на часть товаров по заказу |
| 110 | отгружен | Создано УПД со всеми товарами по заказу |
| 120 | завершен | Заказ доставлен клиенту |

Cancelled and completed requests live in the archive (section 11).
In case if you need to make hardcoded definitions based on the code, you can resolve it by the following function:
```typescript
const code = parseInt(status.id, 10) << 32;
```

## 8. The data

The cabinet's data mostly based on quering the `Request` and `Customer` entities. 
The signed-in customer and their requests, with every document nested inside each request are the main entities.

The query might be supplied with two following fragments in the `queries/` folder:

- `queries/CustomerAggregate.gql` — the customer.
- `queries/RequestAggregate.gql` — one request with its proposals, invoices,
  orders, shipments, and UPDs.

For example, you can compose them into the single query:

```graphql
query CustomerCabinet {
  customer { ...CustomerAggregate }
  requests { ...RequestAggregate }
}
```

The customer comes from the session, so the query takes no arguments. Field
types for every entity are in the `schema/` folder.

`productID` and `requestID` inside `shippingProducts`, `updProducts`, and
`updRequests` are foreign keys — keep them for client-side joins (one UPD may
cover several customer's requests).

### 8.1. Will be added to the backend schema

`RequestAggregate` already uses three things the backend does not expose yet.
They need to be added to the GraphQL schema:

```graphql

extend type Request {
  "Commercial proposals (КП) for this request."
  proposals: [Proposal!]!
}

"A commercial proposal (КП). A pre-payment projection of an invoice."
type Proposal {
  id: ID!
  created: Int!
  changed: Int!
  title: String
  actuality: String
  shippingTime: String
  prepaid: Float
  companyDetails: String
  proposalProducts: [ProposalProduct!]!
}

"A line item of a proposal — same shape as an invoice line item."
type ProposalProduct {
  id: ID!
  lineNum: Int
  title: String
  qty: Float
  currency: String
  vat: Int
  unit: Float
  unitNoVat: Float
  line: Float
  lineNoVat: Float
}
```

A proposal mirrors an invoice but has no payment fields (`paid`, `paidInput`,
`firstPaymentCreated`, `canceled`) — they have no meaning before payment. A
request may have no proposal yet, so the cabinet must handle an empty
`proposals` list.

### 8.2. Example response

A full sample payload for the `CustomerCabinet` query — one customer with two
requests, one fully populated and one minimal — is in
[`examples/cabinet-response.json`](../examples/cabinet-response.json). Use it
to build the UI against before the backend resolver exists.

---

## 9. Calculations: invoice and proposal

### Line items

Each invoice or proposal line item is rendered from these fields:

- `title` — the product description.
- `qty` — the quantity.
- `unit` — the unit price, in the line item's `currency`. Show it only when
  `qty > 1`; when `qty == 1` the unit price equals the line total and is omitted.
- `line` — the line total, in the line item's `currency`. Always shown.

Format every money value in the line item's `currency` (`RUB` or `EUR`).

### VAT

`unit` and `line` are VAT-inclusive prices. `unitNoVat` and `lineNoVat` are the
same prices with VAT removed. `vat` is the VAT rate as a percent (e.g. `20`).
Show VAT-inclusive values by default; the VAT-exclusive breakdown belongs behind
the "show more" control.

### Invoice total

There is no stored total — compute it on the client:

```
total = Σ line   over line items where active == true
```

Sum only the line items where `active == true`; inactive items do not count.
Format the total in the invoice currency.

Invoice helpers examples are in the `examples/invoice.ts` file.

### Currency invariant

All line items within a single invoice share the same `currency`. The total and
its formatting rely on this.

### Payments

Each `InvoicePayment` carries:

- `transferDate` — the payment date.
- `transferNumber` — the payment order reference number.
- `paidPercent` — this payment's share of the invoice total, as a percent.
- `paidInput` — the amount paid, always in RUB.

Overall payment progress aggregated across all payments is `invoice.paid` (a percent,
0–100).

### EUR invoices — the money triplet

The request card or request detail view shows a
"billed amount / paid amount / paid percent" money triplet (section 11). For a
RUB invoice this is straightforward. A EUR invoice has a currency mismatch: its
total is in EUR, but payments (`paidInput`) are always in RUB. The triplet must
not mix currencies:

- **Billed amount:** the computed total, in the invoice currency (EUR).
- **Paid amount:** the amount paid, in RUB.
- **Paid percent:** `invoice.paid` as a percent (e.g. "50% paid").

All items of invoice share one currency.
---

## 10. Data loading

**Caching** is the developer's call; a standard GraphQL client with a normalized
cache is all that is needed.

---

## 11. Cabinet sections — Stage 1

Per section 2, the cabinet is three screens: the request feed (home), the
request detail, and the profile. The archive (11.4) is a filter on the feed, not
a fourth screen. The specific UX is the developer's choice.

### 11.1. Home — request feed

Home is the customer's dashboard.

- The customer sees all their active requests in one place.
- For each request the customer can tell, at a glance:
  - what was ordered — a brief product description;
  - where the request stands — its position on the 4-step status tracker
    (section 7): processing → proposal → delivery → done;
  - the money — billed amount, paid amount, and paid percent;
  - what happens next (e.g. "awaiting payment", "goods in transit").
- The customer can open any request from home to see it in full (section 11.2).
- The customer can switch to completed and cancelled requests (section 11.4).

For most customers home is the whole cabinet — they have only 2–3 active
requests.

### 11.2. Request detail

The request page is a full render of everything the cabinet holds about one
request, on a single page or in modal/drawer view.

- The customer sees the request's progress as a clear sequence of steps —
  created → proposal → invoice → order → delivery → completed — showing where
  the request is now, what is already done, and what is still ahead.
- The customer sees every document of the request: the proposal, the invoice,
  the order and its shipping, the UPD, and the customer account.
- The customer sees the money summary for the request, and can open it for the
  full line-item breakdown.

See Appendix A for a wireframe.

### 11.3. Profile

The customer's personal data and legal-entity details (customer account), taken
from the most recent request. Stage 1: read-only.

### 11.4. Archive

The archive is a **filter on the request feed** that surfaces cancelled and
completed requests. It is off the main path and collapsed by default.

---

## 12. Stages 2 and 3 (overview)

Not in scope for Stage 1; listed here for context.

**Stage 2 — mutations:**

- Create a request. The form is a set of product lines: brand (pick from a
  list), category (pick from a list), model / SKU (free text), quantity (free
  text); optionally a final "price the customer is willing to pay"
  (`customerDesiredPrice`).
- Edit customer phone numbers.
- Preparation of the proposal flow.

**Stage 3 — features:**

- Accept or reject a proposal; confirm an invoice.
- Edit customer account details — with a backend check that the account is not
  used by a request that has already moved into an order.
- Customer ↔ manager chat — its own dedicated entities.
- Call reminders — notifying the customer of an upcoming call.
- Questionnaires (quiz).
- Event-driven notifications (new invoice, status change, shipment).

**After Stage 3:** internationalisation (i18n).

---

## 13. Non-functional requirements

- **UI language — Russian only.** Internationalisation comes after Stage 3.
- **Mobile-first.** Customers mostly visit from phones: narrow blocks, a
  single-column vertical layout.
- **Simplicity.** A customer's whole cabinet fits in one `CustomerCabinet`
  query, and the dataset is small. A standard GraphQL client with a normalized
  cache is the entire data layer.
- **Visual language** is agreed separately with the client; it is not fixed in
  this document.

---

## 14. Backend notes you need to know

Things that are not obvious from the schema alone:

- **Timestamps** are Unix epoch **seconds** (integers) — not ISO strings, not
  milliseconds. This applies to `created`, `changed`, `date`, `postDate`, and
  similar fields.
- **Money.** `unit` and `line` include VAT; `unitNoVat` and `lineNoVat` exclude
  it; `vat` is a percent integer (e.g. `20`). `paidInput` is always in RUB,
  whatever the invoice currency. `currency` values are uppercase ISO codes
  (`RUB`, `EUR`).
- **One currency per invoice** — all line items of an invoice share one
  `currency` (section 9).
- **Sentinel values.** A `0` timestamp means "no date"; `customerDesiredPrice`
  of `0` means "not specified"; `customerAccount` may be `null` (before invoice issued); absent string
  fields come back as empty strings.
- **GraphQL endpoint.** The endpoint URL comes from an environment variable, set
  by the cabinet's own backend configuration.

---

## Appendix A. Request screen wireframe

An intent sketch of the request-detail screen (section 11.2). Exact visuals are
the developer's choice; this conveys structure and element order only.

```
┌────────────────────────────────────────┐
│  Request #185327                       │
│                                        │
│  ●────────●────────○────────○          │
│  Processing  Proposal  Delivery  Done  │
│              ▲ current                 │
├────────────────────────────────────────┤
│  Billed   490 000 ₽                    │
│  Paid     245 000 ₽  (50%)             │
├────────────────────────────────────────┤
│                                        │
│  ╔══════════════════════════════════╗  │
│  ║  Proposal (КП)                  ║  │
│  ║  Title: КП-185327               ║  │
│  ║  Valid until: 30.05.2026        ║  │
│  ║  Delivery: 4–6 weeks            ║  │
│  ║  Total: 490 000 ₽               ║  │
│  ╚══════════════════════════════════╝  │
│                                        │
│  ╔══════════════════════════════════╗  │
│  ║  Invoice INV-90011              ║  │
│  ║  Total: 490 000 ₽  (50% paid)   ║  │
│  ║  Prepaid: 50%                   ║  │
│  ║  Paid: 245 000 ₽  on 30.04.2026 ║  │
│  ║                                 ║  │
│  ║  ▸ details (line items)          ║  │
│  ╚══════════════════════════════════╝  │
│                                        │
│  ╔══════════════════════════════════╗  │
│  ║  Order / Shipping               ║  │
│  ║  Status: partially received     ║  │
│  ║  Ordered:   25.04.2026          ║  │
│  ║  Dispatched: 19.05.2026         ║  │
│  ║  GTD: 10013160/200526/0012345   ║  │
│  ╚══════════════════════════════════╝  │
│                                        │
│  ╔══════════════════════════════════╗  │
│  ║  UPD #501  dated 19.05.2026     ║  │
│  ║  [Download PDF]                 ║  │
│  ╚══════════════════════════════════╝  │
│                                        │
└────────────────────────────────────────┘
```

The Request view might be designed in a way that the customer scrolls top to bottom through the full life of the request as an activity timeline; or data could be grouped into tabs, or any other way that will be decided more convinient with the product owner.