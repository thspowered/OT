import { Icon } from '../../components/ui/Icon';
import { opportunities, opportunityMetrics } from './mockOpportunities';
import { Opportunity, OpportunityMetric } from './types';
import './OpportunityBoard.css';

function formatCurrency(value: number) {
  return new Intl.NumberFormat('cs-CZ').format(value) + ' Kc';
}

function MetricCard({ metric }: { metric: OpportunityMetric }) {
  return (
    <article className={`metric-card ${metric.tone}`}>
      <span className="metric-icon">
        <Icon name={metric.icon} />
      </span>
      <div>
        <strong>{metric.value}</strong>
        <p>{metric.label}</p>
        <small>{metric.detail}</small>
      </div>
    </article>
  );
}

function OpportunityRow({ opportunity }: { opportunity: Opportunity }) {
  return (
    <article className={`opportunity-row ${opportunity.urgency}`}>
      <div className="select-cell">
        <input aria-label={`Vybrat ${opportunity.title}`} type="checkbox" />
      </div>
      <div>
        <span className={`inactivity-pill ${opportunity.urgency}`}>
          <Icon name="flame" size={15} />
          <strong>{opportunity.daysInactive}</strong>
          <span>dni bez aktivity</span>
        </span>
      </div>
      <div className="opportunity-main-cell">
        <div className="opportunity-title-line">
          <strong>{opportunity.title}</strong>
          <span>{opportunity.phase}</span>
        </div>
        <p>
          {opportunity.company} <span>|</span> {opportunity.activityType} - {opportunity.lastActivityDate}
        </p>
      </div>
      <div className="value-cell">{formatCurrency(opportunity.value)}</div>
      <div>
        <div className="owner-cell">
          <span>{opportunity.ownerInitials}</span>
          {opportunity.owner}
        </div>
      </div>
      <div>
        <span className={`probability-pill ${opportunity.urgency}`}>
          <Icon name="target" size={14} />
          {opportunity.probability} %
        </span>
      </div>
      <div>
        <div className="row-actions">
          <button type="button">
            <Icon name="mail" size={16} />
            Poslat e-mail
          </button>
          <button type="button">
            <Icon name="phone" size={16} />
            Zavolat
          </button>
          <button type="button">
            <Icon name="calendar" size={16} />
            Naplanovat ukol
          </button>
        </div>
      </div>
    </article>
  );
}

export function OpportunityBoard() {
  return (
    <section className="opportunities-page">
      <header className="opportunities-header">
        <div>
          <p className="sort-caption">
            Seradit dle: <strong>Pocet dni bez aktivity sestupne</strong>
            <Icon name="chevron" size={15} />
          </p>
          <h1>Stagnujici prilezitosti</h1>
          <p>Prilezitosti vyzadujici okamzitou pozornost.</p>
        </div>
        <span className="critical-banner">
          <Icon name="flame" size={16} />
          2 prilezitosti s pravdepodobnosti &gt; 90 %
        </span>
      </header>

      <div className="filter-bar" aria-label="Filtry">
        <button type="button">Me filtry</button>
        <button className="active" type="button">Tento mesic</button>
        <button type="button">Stagnace</button>
        <button type="button">Obchodnik</button>
        <button type="button">Faze</button>
        <span className="filter-spacer" />
        <button className="filter-action" type="button">
          <Icon name="filter" size={16} />
          Filtrovani
        </button>
      </div>

      <div className="active-filters">
        <span>Filtrovano</span>
        <button type="button">Tento mesic: Maj 2026</button>
        <button className="clear-filter" type="button">Vycistit filtry</button>
      </div>

      <div className="metrics-grid">
        {opportunityMetrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </div>

      <div className="opportunities-table-shell">
        <div className="table-toolbar">
          <label>
            <input type="checkbox" />
            Vybrat vse
          </label>
          <span>{opportunities.length} prilezitosti</span>
        </div>

        <div className="opportunities-list">
          {opportunities.map((opportunity) => (
            <OpportunityRow key={opportunity.id} opportunity={opportunity} />
          ))}
        </div>
      </div>
    </section>
  );
}
