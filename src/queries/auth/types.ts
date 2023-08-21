export interface ResponseLogin {
  accessToken: string;
  accountIssues: AccountIssues;
  token_type: string;
  userAbilities: UserAbility[];
  userData: UserData;
}

export interface AccountIssues {
  description: string;
  flag: string;
  status: number;
}

export interface UserAbility {
  action: string;
  subject: string;
}

export interface UserData {
  abilities: string;
  account_id: number;
  avatar: string;
  created_at: string;
  document: string;
  email: string;
  email_verified_at: any;
  hash: string;
  id: number;
  name: string;
  phone_number: string;
  push_user_id: string;
  push_user_key: any;
  role: string;
  updated_at: string;
}
