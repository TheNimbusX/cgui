# Customer Cabinet — Specification

## 1. What we're building

The customer cabinet is a web app where a customer tracks their orders with the
company — requests, invoices, deliveries — and sees at a glance where each one
stands and how much is left to pay.

The customer is a procurement specialist at a company that buys industrial
equipment: machine tools, automation, factory components. They place a request,
receive a commercial proposal and an invoice, pay, and receive the goods. The
cabinet shows that journey.

A customer has very few records — most of their working history with the company
fits on one screen:

| Requests per customer | Share of customers |
|---|---|
| 2–3 | ~95% |
| 5–30 | ~5% |
| up to 200–250 | <0.01% |

Because the data is small, everything a customer can see can be loaded at once,
and the app can stay simple — no heavy data layer, no per-page loading states.

---

## 2. Product vision

This is the agreed product intent. The specific UX is the developer's choice;
this section defines the spirit and the business meaning.

**Core idea.** This is a status tracker in the spirit of Wise or PayPal, not a
CRM. The customer's mental model is "I sent a request — where is it and how much
do I owe?" The cabinet answers that in a single glance.

1. **The request is the only thing to navigate.** Invoice, order, shipping, and
   UPD have no standalone meaning for the customer — they always live inside a
   request. So there is one list of requests, and everything else opens from
   within a request. At most, "Invoices" / "Orders" can be lens-filters for the
   rare customer with 30+ requests.

2. **Home is the request feed, and it is also the dashboard.** 95% of customers
   have 2–3 requests — for them a "dashboard with blocks" and a "request list"
   are the same thing. A request card shows: what was ordered (brief), a status
   tracker, money (billed / paid / balance), and the next expected step.

3. **A request opens in full detail** — all of its data on one screen.

4. **Status is a progress bar.** The customer sees four statuses as a step
   tracker, like parcel tracking or a Wise transfer. They always see where the
   request is and what comes next.

5. **Money is what's on the invoice.** The headline numbers are the invoice
   total, the amount paid, and the balance. The accounting breakdown sits behind
   a "show more" control (progressive disclosure).

6. **The archive is off the main path.** Completed and cancelled requests fold
   into a feed filter, fetched only if the customer opens it.

7. **The cabinet renders from data held in memory.** State loads on entry and
   the screens render from memory. The dataset is tiny — this is why the
   architecture can stay simple, with no heavy loading layer and no per-page
   spinners.

**In summary — three screens:** the request feed (home), the request detail, and
the profile. Plain language, no legal jargon; PDF documents are offered for
download, not paraphrased.

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
- The customer is a `User` linked one-to-one with a `Customer`. The cabinet
  always works in the context of a single customer.
- The server identifies the customer from the cookie session. The cabinet query
  (section 8) takes no customer ID — the customer comes from the session.
- The backend returns only this customer's data, already filtered to the fields
  the customer is allowed to see.
- **Session expiry.** When a request fails because the session is missing or
  expired (HTTP 401, or a GraphQL authentication error), the cabinet redirects to
  an external login URL owned by the surrounding system — it has no login form of
  its own. The exact URL is still to be provided (section 15).

---

## 5. Project stages

This document describes primarily **Stage 1**.

| Stage | Contents |
|---|---|
| **Stage 1** | Read-only cabinet: the customer queries and reads their requests and documents. Goal: ship a working cabinet quickly. |
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

The backend reduces its internal request pipeline to **four customer-facing
statuses** and returns the result in the `customerStatus` field. The cabinet
renders these four as a step tracker.

| `customerStatus` | Step label | Meaning to the customer |
|---|---|---|
| `processing` | Request in progress | We are working on the request. |
| `proposal` | Proposal ready | A proposal or invoice is ready; awaiting payment. |
| `delivery` | Order and delivery | Paid; the goods are on their way. |
| `done` | Completed | Delivered. |

`isCancelled` is a separate boolean. A cancelled request can carry any
`customerStatus`, so show cancellation as its own state — not as a step on the
tracker. Cancelled and completed requests live in the archive (section 11).

---

## 8. The data

The cabinet's data comes from a single GraphQL query: the signed-in customer and
their requests, with every document nested inside each request.

The query is supplied as two fragments in the `queries/` folder:

- `queries/CustomerAggregate.gql` — the customer.
- `queries/RequestAggregate.gql` — one request with its proposals, invoices,
  orders, shipments, and UPDs.

Compose them into the cabinet query:

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
cover several requests).

### 8.1. New backend work

`RequestAggregate` already uses three things the backend does not expose yet.
They need to be added to the GraphQL schema:

```graphql
"The four customer-facing request statuses (section 7)."
enum CustomerRequestStatus {
  processing
  proposal
  delivery
  done
}

extend type Request {
  "Customer-facing status, computed by the backend from the internal pipeline."
  customerStatus: CustomerRequestStatus!
  "Whether the request is cancelled. Independent of customerStatus."
  isCancelled: Boolean!
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
[`examples/aggregate-response.json`](../examples/aggregate-response.json). Use it
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

### Currency invariant

All line items within a single invoice share the same `currency`. The total and
its formatting rely on this. Confirmation that the backend enforces it is an
open item (section 15).

### Payments

Each `InvoicePayment` carries:

- `transferDate` — the payment date.
- `transferNumber` — the payment order reference number.
- `paidPercent` — this payment's share of the invoice total, as a percent.
- `paidInput` — the amount paid, always in RUB.

Overall payment progress across all payments is `invoice.paid` (a percent,
0–100).

### EUR invoices — the money triplet

The request card and detail view show a "billed / paid / balance" money triplet
(section 11). For a RUB invoice this is straightforward. A EUR invoice has a
currency mismatch: its total is in EUR, but payments (`paidInput`) are always in
RUB. The triplet must not mix currencies:

- **Billed:** the computed total, in the invoice currency (EUR).
- **Paid:** `invoice.paid` as a percent (e.g. "50% paid") — no conversion.
- **Balance:** `total × (100 − paid) / 100`, in the invoice currency (EUR).

If the product owner wants a different presentation for EUR invoices (for
example, the RUB equivalent of the balance), that is an open item (section 15).

---

## 10. Data loading

The cabinet loads its data with the `CustomerCabinet` query (section 8). The
dataset is tiny (section 1) — even a full refetch on every navigation is cheap.

**Caching** is the developer's call; a standard GraphQL client with a normalized
cache is all that is needed.

**Refresh policy for Stage 1:** load on entry, and refetch after a customer
action (for example, after a Stage 2 mutation). No background polling.

**Consequence:** an idle open tab shows stale data until the next navigation or
action. Real-time freshness (push / WebSocket) is a Stage 3 topic (section 12).

**Archive:** for a typical customer all requests load at once. Paging or
lazy-loading the archive is worth it only for the rare customer with hundreds of
requests (<0.01% — section 1).

---

## 11. Cabinet sections — Stage 1

Per section 2, the cabinet is three screens: the request feed (home), the
request detail, and the profile. The archive (11.4) is a filter on the feed, not
a fourth screen. The specific UX is the developer's choice.

### 11.1. Home — request feed

A feed of request cards, which is also the dashboard. Each card shows:

- What was ordered — a brief product description.
- A 4-step status tracker (section 7): processing → proposal → delivery → done,
  with the current step marked.
- A money summary: billed / paid / balance.
- The next expected step (e.g. "awaiting payment", "goods in transit").

For 95% of customers, 2–3 cards are the whole cabinet. Compact summary widgets
(invoices to pay, shipments in transit) are a fine addition.

### 11.2. Request detail

The request detail is a **single vertical story**, read top to bottom: one
column, mobile-first, no tab bar.

The story flows: **created → proposal → invoice → order → delivery → completed**.

Each document — proposal, invoice, order / shipping, UPD, and the customer
account — is embedded inline at the point in the timeline where it appears. The
customer scrolls down through the life of the request without switching screens.

The accounting line-item table inside the invoice card sits behind a "details ▸"
disclosure; the card itself shows the money summary.

All documents live inside the request — there are no separate "Invoices" or
"Orders" screens. See Appendix A for a wireframe.

### 11.3. Profile

The customer's personal data and legal-entity details (customer account), taken
from the most recent request. Stage 1: read-only.

### 11.4. Archive

The archive is a **filter on the request feed** that surfaces cancelled and
completed requests. It is off the main path, collapsed by default, and fetched
lazily only when the customer opens it.

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
- **Simplicity.** The dataset is small; the cabinet renders from data held in
  memory, with no heavy loading layer and no per-page spinners.
- **Guard against duplicate concurrent loads** of the same data.
- **Offline mode** is not a requirement — basic resilience follows naturally
  from rendering off data already in memory.
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
- **IDs are opaque strings.** Treat them as opaque handles; never parse them. For
  Stage 2–3 mutations, the exact ID form expected by write operations needs to
  be confirmed with the backend before Stage 2 (section 15).
- **Sentinel values.** A `0` timestamp means "no date"; `customerDesiredPrice`
  of `0` means "not specified"; `customerAccount` may be `null`; absent string
  fields come back as empty strings.
- **Status.** `customerStatus` is exactly one of `processing`, `proposal`,
  `delivery`, `done`. `isCancelled` is an independent boolean (section 7).
- **GraphQL endpoint.** The endpoint URL comes from an environment variable, set
  by the cabinet's own backend configuration.

---

## 15. Open questions

These need answers before or during development:

1. **Login redirect URL** (section 4). On HTTP 401 or a GraphQL auth error the
   cabinet redirects to an external login page. The surrounding system must
   provide that URL.

2. **One-currency-per-invoice invariant** (section 9). The total calculation
   assumes all line items of an invoice share one `currency`. The backend team
   should confirm this is enforced.

3. **EUR invoice money triplet** (section 9). The spec proposes showing the
   balance in EUR and progress as a percent. If a different presentation is
   wanted, the formula must be decided before Stage 1 ships.

4. **Mutation ID form** (section 14). The exact ID form expected by write
   operations must be confirmed with the backend before Stage 2.

5. **Cabinet query entry point** (section 8). The name and signature of the
   customer-scoped query are confirmed once the backend implements it.

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
│  Balance  245 000 ₽                    │
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

The customer scrolls top to bottom through the full life of the request, with
every document inline. The line-item table inside the invoice card is collapsed
by default behind the "details ▸" disclosure; the money summary is always
visible.
