import { Opportunity, OpportunityFilters } from './types';

function normalize(value: string) {
  return value.trim().toLowerCase();
}

function matchesQuery(opportunity: Opportunity, query: string) {
  const normalizedQuery = normalize(query);

  if (!normalizedQuery) {
    return true;
  }

  return [opportunity.title, opportunity.company, opportunity.owner, opportunity.code, opportunity.phase].some((value) =>
    normalize(value).includes(normalizedQuery)
  );
}

function matchesProbability(opportunity: Opportunity, probability: OpportunityFilters['probability']) {
  if (probability === 'high') {
    return opportunity.probability >= 90;
  }

  if (probability === 'medium') {
    return opportunity.probability >= 45 && opportunity.probability < 90;
  }

  if (probability === 'low') {
    return opportunity.probability < 45;
  }

  return true;
}

function compareBySort(sort: OpportunityFilters['sort']) {
  return (first: Opportunity, second: Opportunity) => {
    if (sort === 'probability-desc') {
      return second.probability - first.probability;
    }

    if (sort === 'value-desc') {
      return second.value - first.value;
    }

    if (sort === 'name-asc') {
      return first.title.localeCompare(second.title, 'cs');
    }

    return second.daysInactive - first.daysInactive;
  };
}

export function filterOpportunities(opportunities: Opportunity[], filters: OpportunityFilters) {
  return opportunities
    .filter((opportunity) => matchesQuery(opportunity, filters.query))
    .filter((opportunity) => filters.phase === 'all' || opportunity.phase === filters.phase)
    .filter((opportunity) => filters.owner === 'all' || opportunity.owner === filters.owner)
    .filter((opportunity) => matchesProbability(opportunity, filters.probability))
    .sort(compareBySort(filters.sort));
}
