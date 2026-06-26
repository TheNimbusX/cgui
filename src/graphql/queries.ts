import { gql } from '@apollo/client/core'

export const CUSTOMER_CABINET_QUERY = gql`
  query CustomerCabinet {
    customer {
      id
      created
      updated
      name
      company
      region
      timezone
      avatar
      user { email }
      phones {
        id
        number
        ext
        name
        dept
        isPrimary
        isValid
      }
    }
    requests {
      id
      created
      changed
      contractNumber
      contractDate
      contractSpecNumber
      contractSpecDate
      customerDesiredPrice
      customerStatus
      isCancelled
      manager { id name email avatar }
      company { id name phone }
      customerAccount {
        id buyer inn kpp ogrn okpo rs ks bik bank
        formalAddress postalAddress shippingAddress actualAddress
        invoicePrepaidRequired noContractRequired phone customerName customerPosition
      }
      productsRequested {
        id qty qtyUnits sku model
        brandterm { name }
        categoryterm { name }
      }
      products {
        id changed qty qtyUnits sku model shippingTime
        shippingMin shippingMax weight status disabled
        brandterm { name }
        categoryterm { name }
      }
      proposals {
        id created changed title actuality shippingTime prepaid companyDetails
        proposalProducts {
          id lineNum title qty currency vat unit unitNoVat line lineNoVat
        }
      }
      invoices {
        id created changed invoiceNumber title actuality shippingTime
        prepaid canceled firstPaymentCreated paid paidInput companyDetails
        invoiceProducts {
          id created active lineNum title qty currency vat unit unitNoVat line lineNoVat
        }
        invoicePayments {
          id created changed paidInput paidPercent paymentDate transferDate transferNumber
        }
      }
      orders {
        id created changed postDate received status
        products { id shippingMin shippingMax }
        shippings {
          id created changed received sentToClient productsIds
          shippingProducts { id productID }
          shippingGroup { id created postDate documentsDate gtd }
        }
      }
      upds {
        id created changed number date
        updProducts { productID }
        updRequests { requestID }
      }
    }
  }
`
