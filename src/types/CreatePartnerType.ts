export interface CreatePartnerDto {
  name: string;
  unique_identification_number: string;
  trade_register_registration_number: string;
  contact: CreateContactDto;
  address: CreateAddressDto;
  bank_account: CreateBankAccountDto;
  credit: number;
  remaining_credit: number;
  vat_payer: boolean;
  vat_split: boolean;
  vat_collection: boolean;
  invoice_deadline_days: number;
  credit_exceedance_percentage: number;
}

export interface CreateContactDto {
  contact_email: string;
  phone: string;
  first_name: string;
  last_name: string;
  personal_identification_number: string;
  car_registration_number: string;
  department: string;
  partner_id?: number;
}

export interface CreateAddressDto {
  county: string;
  country: string;
  city: string;
  address: string;
  partner_id?: number;
}

export interface CreateBankAccountDto {
  iban: string;
  bank_name: string;
  currency: string;
  partner_id?: number;
}
