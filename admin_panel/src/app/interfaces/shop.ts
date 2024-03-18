import { IBase } from './base';
import { IAddress } from './address';

export interface IShop extends IBase {
  shopName: string;
  firstName: string;
  lastName: string;
  email: string;
  role: IRole;
  mobile: string;
  status: string;
  address: IAddress;
  image: string;
  password: string;
  lastLoginAt: string;
  resetPin?: string;
  isFirstLogin?: string;
  isVerify?: boolean;
  count?: number;
}

export enum IRole {
  SHOP = 'SHOP',
}

export enum status {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  UNAPPROVED = 'unapproved',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  DELETED = 'deleted',
}
