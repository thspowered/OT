import { useEffect, useMemo, useState } from 'react';
import { Icon } from '../../components/ui/Icon';
import { buildOpportunityMetrics, fetchBusinessCases } from './businessCasesApi';
import { filterOpportunities } from './filterOpportunities';
import { OpportunityDetail } from './OpportunityDetail';
import { Opportunity, OpportunityFilters, OpportunityMetric, OpportunitySort, ProbabilityFilter } from './types';
import './OpportunityBoard.css';

const pageSize = 10;
const defaultFilters: OpportunityFilters = {
  query: '',
  phase: 'all',
  owner: 'all',
  probability: 'all',
  sort: 'stagnation-desc'
};

const probabilityOptions: Array<{ label: string; value: ProbabilityFilter }> = [
  { label: 'Vsechny pravdepodobnosti', value: 'all' },
  { label: 'Nad 90 %', value: 'high' },
  { label: '45-89 %', value: 'medium' },
  { label: 'Pod 45 %', value: 'low' }
];

const sortOptions: Array<{ label: string; value: OpportunitySort }> = [
  { label: 'Stagnace sestupne', value: 'stagnation-desc' },
  { label: 'Pravdepodobnost sestupne', value: 'probability-desc' },
  { label: 'Hodnota sestupne', value: 'value-desc' },
  { label: 'Nazev A-Z', value: 'name-asc' }
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat('cs-CZ').format(value) + ' Kc';
}

function getVisiblePageNumbers(currentPage: number, totalPages: number) {
  const pages = new Set([1, totalPages, currentPage - 1, currentPage, currentPage + 1]);

  return Array.from(pages)
    .filter((pageNumber) => pageNumber >= 1 && pageNumber <= totalPages)
    .sort((firstPage, secondPage) => firstPage - secondPage);
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

function OpportunityRow({
  onCreateTask,
  onOpen,
  opportunity
}: {
  onCreateTask: (opportunity: Opportunity) => void;
  onOpen: (opportunity: Opportunity) => void;
  opportunity: Opportunity;
}) {
  return (
    <article className={`opportunity-row ${opportunity.urgency}`} onDoubleClick={() => onOpen(opportunity)}>
      <div className="select-cell">
        <input aria-label={`Zobrazit ${opportunity.title}`} onChange={() => onOpen(opportunity)} type="checkbox" />
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
          <button className="opportunity-title-button" onClick={() => onOpen(opportunity)} type="button">
            {opportunity.title}
          </button>
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
          <button
            onClick={(event) => {
              event.stopPropagation();
              onCreateTask(opportunity);
            }}
            type="button"
          >
            <Icon name="calendar" size={16} />
            Naplanovat ukol
          </button>
        </div>
      </div>
    </article>
  );
}

interface OpportunityBoardProps {
  searchQuery: string;
}

export function OpportunityBoard({ searchQuery }: OpportunityBoardProps) {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState<OpportunityFilters>(defaultFilters);
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [openTaskModalOnDetail, setOpenTaskModalOnDetail] = useState(false);

  useEffect(() => {
    let isActive = true;

    const loadBusinessCases = async () => {
      try {
        setIsLoading(true);
        setError('');
        const loadedOpportunities = await fetchBusinessCases();

        if (isActive) {
          setOpportunities(loadedOpportunities);
          setCurrentPage(1);
        }
      } catch (loadError) {
        if (isActive) {
          setError(loadError instanceof Error ? loadError.message : 'Nepodarilo se nacist data.');
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    loadBusinessCases();

    return () => {
      isActive = false;
    };
  }, []);

  const phaseOptions = useMemo(
    () => Array.from(new Set(opportunities.map((opportunity) => opportunity.phase))).sort((first, second) => first.localeCompare(second, 'cs')),
    [opportunities]
  );
  const ownerOptions = useMemo(
    () => Array.from(new Set(opportunities.map((opportunity) => opportunity.owner))).sort((first, second) => first.localeCompare(second, 'cs')),
    [opportunities]
  );
  const activeFilters = useMemo(() => ({ ...filters, query: searchQuery }), [filters, searchQuery]);
  const filteredOpportunities = useMemo(() => filterOpportunities(opportunities, activeFilters), [activeFilters, opportunities]);
  const opportunityMetrics = useMemo(() => buildOpportunityMetrics(filteredOpportunities), [filteredOpportunities]);
  const totalPages = Math.max(1, Math.ceil(filteredOpportunities.length / pageSize));
  const visibleOpportunities = filteredOpportunities.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const firstVisibleItem = filteredOpportunities.length === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const lastVisibleItem = Math.min(currentPage * pageSize, filteredOpportunities.length);
  const highProbabilityCount = filteredOpportunities.filter((opportunity) => opportunity.probability >= 90).length;
  const pageNumbers = getVisiblePageNumbers(currentPage, totalPages);
  const hasActiveFilters =
    filters.phase !== 'all' || filters.owner !== 'all' || filters.probability !== 'all';

  const updateFilters = (nextFilters: Partial<OpportunityFilters>) => {
    setFilters((currentFilters) => ({ ...currentFilters, ...nextFilters }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters(defaultFilters);
    setCurrentPage(1);
  };

  const openOpportunityDetail = (opportunity: Opportunity) => {
    setOpenTaskModalOnDetail(false);
    setSelectedOpportunity(opportunity);
  };

  const openTaskCreation = (opportunity: Opportunity) => {
    setOpenTaskModalOnDetail(true);
    setSelectedOpportunity(opportunity);
  };

  if (selectedOpportunity) {
    return (
      <OpportunityDetail
        initialTaskModalOpen={openTaskModalOnDetail}
        opportunity={selectedOpportunity}
        onBack={() => {
          setOpenTaskModalOnDetail(false);
          setSelectedOpportunity(null);
        }}
      />
    );
  }

  return (
    <section className="opportunities-page">
      <header className="opportunities-header">
        <div>
          <p className="sort-caption">Filtrovani a sortovani probiha lokalne nad daty z backendu.</p>
          <h1>Stagnujici prilezitosti</h1>
          <p>Prilezitosti vyzadujici okamzitou pozornost.</p>
        </div>
        <span className="critical-banner">
          <Icon name="flame" size={16} />
          {highProbabilityCount} prilezitosti s pravdepodobnosti &gt; 90 %
        </span>
      </header>

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

          <div className="toolbar-filters" aria-label="Filtry">
            <select aria-label="Faze" onChange={(event) => updateFilters({ phase: event.target.value })} value={filters.phase}>
              <option value="all">Vsechny faze</option>
              {phaseOptions.map((phase) => (
                <option key={phase} value={phase}>
                  {phase}
                </option>
              ))}
            </select>

            <select aria-label="Obchodnik" onChange={(event) => updateFilters({ owner: event.target.value })} value={filters.owner}>
              <option value="all">Vsichni obchodnici</option>
              {ownerOptions.map((owner) => (
                <option key={owner} value={owner}>
                  {owner}
                </option>
              ))}
            </select>

            <select
              aria-label="Pravdepodobnost"
              onChange={(event) => updateFilters({ probability: event.target.value as ProbabilityFilter })}
              value={filters.probability}
            >
              {probabilityOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <select aria-label="Seradit" onChange={(event) => updateFilters({ sort: event.target.value as OpportunitySort })} value={filters.sort}>
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <button className="toolbar-clear" disabled={!hasActiveFilters} onClick={clearFilters} type="button">
              Vycistit
            </button>
          </div>

          <span>{filteredOpportunities.length} prilezitosti</span>
        </div>

        {isLoading && <div className="table-state">Nacitam obchodni pripady...</div>}

        {!isLoading && error && <div className="table-state error-state">{error}</div>}

        {!isLoading && !error && (
          <>
            <div className="opportunities-list">
              {visibleOpportunities.length > 0 ? (
                visibleOpportunities.map((opportunity) => (
                  <OpportunityRow
                    key={opportunity.id}
                    onCreateTask={openTaskCreation}
                    onOpen={openOpportunityDetail}
                    opportunity={opportunity}
                  />
                ))
              ) : (
                <div className="table-state">Zadne prilezitosti neodpovidaji filtrum.</div>
              )}
            </div>

            <footer className="pagination-bar">
              <span>
                Zobrazeno {firstVisibleItem}-{lastVisibleItem} z {filteredOpportunities.length}
              </span>
              <div className="pagination-controls">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                  type="button"
                >
                  Predchozi
                </button>
                {pageNumbers.map((pageNumber, index) => (
                  <span className="pagination-item" key={pageNumber}>
                    {index > 0 && pageNumber - pageNumbers[index - 1] > 1 && <span className="pagination-dots">...</span>}
                    <button
                      className={pageNumber === currentPage ? 'active' : undefined}
                      onClick={() => setCurrentPage(pageNumber)}
                      type="button"
                    >
                      {pageNumber}
                    </button>
                  </span>
                ))}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                  type="button"
                >
                  Dalsi
                </button>
              </div>
            </footer>
          </>
        )}
      </div>
    </section>
  );
}
