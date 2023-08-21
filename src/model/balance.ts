export interface Balance {
  balance_version?: string;
  api_version?: string;
  available: number;
  transferred: number;
  waiting_funds: number;
}
