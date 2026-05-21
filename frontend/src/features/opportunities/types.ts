export type OpportunityUrgency = 'critical' | 'warning' | 'neutral';

export interface Opportunity {
  id: number;
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

export interface OpportunityMetric {
  label: string;
  value: string;
  detail: string;
  tone: 'danger' | 'warning' | 'neutral';
  icon: 'target' | 'chart' | 'calendar' | 'briefcase';
}
