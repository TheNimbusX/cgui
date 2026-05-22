export const CurrencyOption = {
  euro_no_margin_no_title: "евро, без комиссии",
  euro_with_margin: "евро, с комиссией",
  rubles: "рубли, с комиссией",
  rubles_no_margin: "рубли, без комиссии",
};

export const CurrencyOptionSign = {
  euro_no_margin_no_title: "€",
  euro_with_margin: "€",
  rubles: "₽",
  rubles_no_margin: "₽",
};

export const CurrencyOptionTitle = {
  euro_no_margin_no_title: "",
  euro_with_margin: "+20%",
  rubles: "+20%",
  rubles_no_margin: "без комиссии",
  };

export interface InvoiceProduct {
  readonly active: boolean | null;
  readonly line: number | null;
}

export function getActiveInvoiceProducts(invoice: { readonly invoiceProducts: InvoiceProduct[] | null }): InvoiceProduct[] {
  return invoice.invoiceProducts?.filter((product) => product.active) ?? [];
}

export function getInvoiceTotal(products: InvoiceProduct[]): number {
  return products.reduce((acc, product) => acc + (product.line ?? 0), 0);
}