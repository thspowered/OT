export type OpportunityUrgency = 'critical' | 'warning' | 'neutral';

export interface Opportunity {
  id: number;
  code: string;
  title: string;
  company: string;
  activityType: 'Volani' | 'E-mail' | 'Schuzka' | 'Ukol' | 'Poznamka';
  lastActivityDate: string;
  daysInactive: number;
  phase: string;
  value: number;
  owner: string;
  ownerInitials: string;
  probability: number;
  urgency: OpportunityUrgency;
}

export interface BusinessCaseDto {
  id: number;
  code: string;
  name: string;
  companyName: string | null;
  ownerName: string;
  totalAmount: number;
  currencyCode: string;
  status: 'B_ACTIVE' | 'E_WIN' | 'F_LOST';
  probability: number;
  phaseColor: string | null;
}

export interface BusinessCasesResponse {
  success: boolean;
  count: number;
  data: BusinessCaseDto[];
}

export interface OpportunityMetric {
  label: string;
  value: string;
  detail: string;
  tone: 'danger' | 'warning' | 'neutral';
  icon: 'target' | 'chart' | 'calendar' | 'briefcase';
}

export type ProbabilityFilter = 'all' | 'high' | 'medium' | 'low';
export type OpportunitySort = 'stagnation-desc' | 'probability-desc' | 'value-desc' | 'name-asc';

export interface OpportunityFilters {
  query: string;
  phase: string;
  owner: string;
  probability: ProbabilityFilter;
  sort: OpportunitySort;
}
