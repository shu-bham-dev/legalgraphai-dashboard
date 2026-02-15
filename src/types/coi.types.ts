export interface COI {
  id: string;
  property: string;
  tenantName: string;
  tenantEmail: string;
  unit: string;
  coiName: string;
  expiryDate: string;
  status: COIStatus;
  reminderStatus: string;
  createdAt: string;
}

export type COIStatus = 'Active' | 'Expired' | 'Rejected' | 'Expiring Soon' | 'Not Processed';

export type FilterStatus = 'All' | COIStatus;

export type FilterExpiry = 'All' | 'Expired' | 'Expiring in 30 days' | 'Expiring in 60 days' | 'Active';

export interface COIStats {
  total: number;
  accepted: number;
  rejected: number;
  expiringSoon: number;
}

export interface COIFormData extends Partial<COI> {}