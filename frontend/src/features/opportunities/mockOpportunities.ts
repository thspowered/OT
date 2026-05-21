import { Opportunity, OpportunityMetric } from './types';

export const opportunities: Opportunity[] = [
  {
    id: 1,
    title: 'ERP system - implementace',
    company: 'Skoda Auto a.s.',
    activityType: 'Volani',
    lastActivityDate: '23. 3. 2026',
    daysInactive: 42,
    phase: 'Prezentace reseni',
    value: 4_850_000,
    owner: 'Petra Novakova',
    ownerInitials: 'PN',
    probability: 95,
    urgency: 'critical'
  },
  {
    id: 2,
    title: 'Cloudova migrace - faze 2',
    company: 'CEZ Distribuce',
    activityType: 'E-mail',
    lastActivityDate: '12. 4. 2026',
    daysInactive: 31,
    phase: 'Nabidka odeslana',
    value: 3_200_000,
    owner: 'Martin Dvorak',
    ownerInitials: 'MD',
    probability: 92,
    urgency: 'critical'
  },
  {
    id: 3,
    title: 'Licence MS 365 - enterprise',
    company: 'Alza.cz a.s.',
    activityType: 'Schuzka',
    lastActivityDate: '19. 4. 2026',
    daysInactive: 24,
    phase: 'Vyjednavani smlouvy',
    value: 1_740_000,
    owner: 'Jana Horakova',
    ownerInitials: 'JH',
    probability: 75,
    urgency: 'warning'
  },
  {
    id: 4,
    title: 'CRM integrace - Salesforce',
    company: 'Komercni banka',
    activityType: 'Ukol',
    lastActivityDate: '21. 4. 2026',
    daysInactive: 22,
    phase: 'Technicke posouzeni',
    value: 2_100_000,
    owner: 'Tomas Prochazka',
    ownerInitials: 'TP',
    probability: 68,
    urgency: 'warning'
  },
  {
    id: 5,
    title: 'Bezpecnostni audit 2026',
    company: 'O2 Czech Republic',
    activityType: 'Poznamka',
    lastActivityDate: '26. 4. 2026',
    daysInactive: 17,
    phase: 'Interni schvaleni',
    value: 980_000,
    owner: 'Eva Simankova',
    ownerInitials: 'ES',
    probability: 55,
    urgency: 'warning'
  },
  {
    id: 6,
    title: 'Datovy sklad - BI platforma',
    company: 'Lidl Ceska republika',
    activityType: 'E-mail',
    lastActivityDate: '28. 4. 2026',
    daysInactive: 15,
    phase: 'Proof of concept',
    value: 1_350_000,
    owner: 'Jakub Marek',
    ownerInitials: 'JM',
    probability: 48,
    urgency: 'warning'
  },
  {
    id: 7,
    title: 'HR software - rozsireni',
    company: 'Vodafone CZ',
    activityType: 'Volani',
    lastActivityDate: '2. 5. 2026',
    daysInactive: 11,
    phase: 'Demo naplanovano',
    value: 620_000,
    owner: 'Lucie Vesela',
    ownerInitials: 'LV',
    probability: 35,
    urgency: 'neutral'
  },
  {
    id: 8,
    title: 'Sitova infrastruktura',
    company: 'Ceska sporitelna',
    activityType: 'E-mail',
    lastActivityDate: '4. 5. 2026',
    daysInactive: 9,
    phase: 'Kvalifikace',
    value: 890_000,
    owner: 'Ondrej Blazek',
    ownerInitials: 'OB',
    probability: 28,
    urgency: 'neutral'
  }
];

export const opportunityMetrics: OpportunityMetric[] = [
  {
    label: 'Prumerna pravdepodobnost',
    value: '62 %',
    detail: '2 prilezitosti nad 90 %',
    tone: 'danger',
    icon: 'target'
  },
  {
    label: 'Celkova ohrozena hodnota',
    value: '15.7 M Kc',
    detail: 'v aktivnim pipeline',
    tone: 'warning',
    icon: 'chart'
  },
  {
    label: 'Prumerna stagnace',
    value: '21 dni',
    detail: 'napric vsemi prilezitostmi',
    tone: 'warning',
    icon: 'calendar'
  },
  {
    label: 'Celkem prilezitosti',
    value: '8',
    detail: 'vyzaduje pozornost',
    tone: 'neutral',
    icon: 'briefcase'
  }
];
