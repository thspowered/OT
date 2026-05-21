import { BusinessCaseDto, BusinessCasesResponse, Opportunity, OpportunityMetric, OpportunityUrgency } from './types';

const statusLabel: Record<BusinessCaseDto['status'], string> = {
  B_ACTIVE: 'Aktivni',
  E_WIN: 'Vyhrano',
  F_LOST: 'Prohrano'
};

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

function getUrgency(probability: number): OpportunityUrgency {
  if (probability >= 85) {
    return 'critical';
  }

  if (probability >= 45) {
    return 'warning';
  }

  return 'neutral';
}

function getDerivedInactiveDays(probability: number, index: number) {
  return Math.max(1, Math.round((100 - probability) / 3) + (index % 9));
}

function formatMillions(value: number) {
  return `${(value / 1_000_000).toFixed(1)} M Kc`;
}

export async function fetchBusinessCases(): Promise<Opportunity[]> {
  const response = await fetch('/api/business-cases');

  if (!response.ok) {
    throw new Error('Nepodarilo se nacist obchodni pripady z backendu.');
  }

  const result = (await response.json()) as BusinessCasesResponse;

  if (!result.success) {
    throw new Error('Backend vratil chybu pri nacitani obchodnich pripadu.');
  }

  return result.data.map((businessCase, index) => ({
    id: businessCase.id,
    code: businessCase.code,
    title: businessCase.name,
    company: businessCase.companyName ?? 'Bez firmy',
    activityType: 'E-mail',
    lastActivityDate: businessCase.code,
    daysInactive: getDerivedInactiveDays(businessCase.probability, index),
    phase: statusLabel[businessCase.status],
    value: businessCase.totalAmount,
    owner: businessCase.ownerName,
    ownerInitials: getInitials(businessCase.ownerName),
    probability: businessCase.probability,
    urgency: getUrgency(businessCase.probability)
  }));
}

export function buildOpportunityMetrics(opportunities: Opportunity[]): OpportunityMetric[] {
  const totalCount = opportunities.length;
  const highProbabilityCount = opportunities.filter((opportunity) => opportunity.probability >= 90).length;
  const totalValue = opportunities.reduce((sum, opportunity) => sum + opportunity.value, 0);
  const averageProbability = totalCount
    ? Math.round(opportunities.reduce((sum, opportunity) => sum + opportunity.probability, 0) / totalCount)
    : 0;
  const averageStagnation = totalCount
    ? Math.round(opportunities.reduce((sum, opportunity) => sum + opportunity.daysInactive, 0) / totalCount)
    : 0;

  return [
    {
      label: 'Prumerna pravdepodobnost',
      value: `${averageProbability} %`,
      detail: `${highProbabilityCount} prilezitosti nad 90 %`,
      tone: highProbabilityCount > 0 ? 'danger' : 'neutral',
      icon: 'target'
    },
    {
      label: 'Celkova hodnota',
      value: formatMillions(totalValue),
      detail: 'z backend datasetu',
      tone: 'warning',
      icon: 'chart'
    },
    {
      label: 'Odhad stagnace',
      value: `${averageStagnation} dni`,
      detail: 'docasne odvozeno z pravdepodobnosti',
      tone: 'warning',
      icon: 'calendar'
    },
    {
      label: 'Celkem prilezitosti',
      value: String(totalCount),
      detail: 'nacteno z API',
      tone: 'neutral',
      icon: 'briefcase'
    }
  ];
}
