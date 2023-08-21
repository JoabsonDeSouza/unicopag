export interface SalesByRange {
  current: Current;
  prev: Prev;
}

export interface Current {
  paid: Paid;
  pending: Pending;
}

export interface Paid {
  amount_total: number;
  sales_total: number;
  data: [string, number][];
  data_bk: DataBk[];
}

export interface DataBk {
  hour: string;
  day: string;
  sales: number;
  amount: string;
  amount_liquid: string;
  payment_status: number;
  recipient_id: number;
  recipient_name: string;
}

export interface Pending {
  amount_total: number;
  sales_total: number;
}

export interface Prev {
  paid: Paid2;
  pending: Pending2;
}

export interface Paid2 {
  amount_total: number;
  sales_total: number;
  data: any[];
}

export interface Pending2 {
  amount_total: number;
  sales_total: number;
}
