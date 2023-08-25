export interface Transaction {
  chart: Chart;
  current_page: number;
  data: Daum[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: any;
  to: number;
  total: number;
}

export interface Chart {
  current: Current;
}

export interface Current {
  paid: Paid;
  pending: Pending;
}

export interface Paid {
  amount_total: number;
  sales_total: number;
  data: Data;
}

export interface Data {
  day: Day[];
  hour: Hour[];
}

export interface Day {
  date_time: string;
  amount: number;
}

export interface Hour {
  date_time: string;
  amount: number;
}

export interface Pending {
  amount_total: number;
  sales_total: number;
}

export interface Daum {
  created_at: string;
  refuse_reason: any;
  id: number;
  customer_id: number;
  hash: string;
  payment_method: number;
  payment_status: number;
  acquirer_name: string;
  amount: string;
  amount_total: string;
  amount_interest: string;
  amount_shipping: string;
  amount_discount: string;
  src: string;
  utm_source: string;
  utm_campaign: string;
  utm_content: string;
  utm_medium: string;
  utm_term: string;
  hour: string;
  day: string;
  amount_recipient: number;
  shopify_order: ShopifyOrder;
  customer: Customer;
  items: Item[];
  split_recipients: any[];
}

export interface ShopifyOrder {
  id: number;
  account_id: number;
  store_id: number;
  transaction_id: number;
  customer_id: number;
  hash: string;
  shopify_order_id: number;
  app_id: number;
  buyer_accepts_marketing: number;
  confirmed: number;
  order_created_at: string;
  currency: string;
  estimated_taxes: number;
  financial_status: string;
  fulfillment_status: any;
  name: string;
  note: string;
  note_attributes: string;
  number: number;
  order_number: number;
  order_status_url: string;
  payment_gateway_names: string;
  order_processed_at: string;
  source_name: string;
  subtotal_price: string;
  tags: string;
  tax_lines: string;
  taxes_included: number;
  test: number;
  token: string;
  total_discounts: string;
  total_line_items_price: string;
  total_outstanding: string;
  total_price: string;
  total_tax: string;
  total_tip_received: string;
  total_weight: number;
  created_at: string;
  updated_at: string;
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone_number: string;
}

export interface Item {
  id: number;
  hash: string;
  product_id: number;
  transaction_id: number;
  operation_type: number;
  product: Product;
}

export interface Product {
  id: number;
  shopify_id: number;
  hash: string;
  title: string;
  cover: string;
  status: string;
}

export interface Link {
  url?: string;
  label: string;
  active: boolean;
}
