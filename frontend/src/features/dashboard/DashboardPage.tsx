import { Icon } from '../../components/ui/Icon';
import { opportunities } from '../opportunities/mockOpportunities';
import './DashboardPage.css';

interface DashboardPageProps {
  onOpenOpportunities: () => void;
}

const criticalCount = opportunities.filter((opportunity) => opportunity.probability >= 90).length;
const totalValue = opportunities.reduce((sum, opportunity) => sum + opportunity.value, 0);
const avgStagnation = Math.round(
  opportunities.reduce((sum, opportunity) => sum + opportunity.daysInactive, 0) / opportunities.length
);

export function DashboardPage({ onOpenOpportunities }: DashboardPageProps) {
  return (
    <section className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <p className="page-kicker">Nastenka</p>
          <h1>Obchodni prehled</h1>
          <p>Rychly stav pipeline pred detailni praci s prilezitostmi.</p>
        </div>
        <button className="primary-action" onClick={onOpenOpportunities} type="button">
          Otevrit stagnace
          <Icon name="arrow" />
        </button>
      </div>

      <div className="dashboard-grid">
        <article className="dashboard-card accent-danger">
          <Icon name="flame" />
          <span>Prilezitosti nad 90 %</span>
          <strong>{criticalCount}</strong>
          <p>Vysoce pravdepodobne obchody bez nedavne aktivity.</p>
        </article>
        <article className="dashboard-card accent-warning">
          <Icon name="chart" />
          <span>Hodnota pipeline</span>
          <strong>{(totalValue / 1_000_000).toFixed(1)} M Kc</strong>
          <p>Hardcoded dataset pripraveny na pozdejsi API mapovani.</p>
        </article>
        <article className="dashboard-card">
          <Icon name="calendar" />
          <span>Prumerna stagnace</span>
          <strong>{avgStagnation} dni</strong>
          <p>Prumerny pocet dni od posledni aktivity.</p>
        </article>
      </div>

      <div className="dashboard-focus">
        <div>
          <p className="page-kicker">Doporuceny dalsi krok</p>
          <h2>Zacit u nejstarsich prilezitosti</h2>
          <p>
            Tabulka radi obchody podle stagnace a zvyraznuje pravdepodobnost, majitele i rychle
            akce pro dalsi kontakt.
          </p>
        </div>
        <button className="secondary-action" onClick={onOpenOpportunities} type="button">
          Prejit na seznam
        </button>
      </div>
    </section>
  );
}
