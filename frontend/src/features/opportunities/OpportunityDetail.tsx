import { Icon } from '../../components/ui/Icon';
import { Opportunity } from './types';
import './OpportunityDetail.css';

interface OpportunityTask {
  id: number;
  title: string;
  owner: string;
  dueDate: string;
  status: 'open' | 'planned' | 'done';
  priority: 'high' | 'medium' | 'low';
}

interface OpportunityDetailProps {
  opportunity: Opportunity;
  onBack: () => void;
}

const mockTasks: OpportunityTask[] = [
  {
    id: 1,
    title: 'Overit aktualni potrebu klienta',
    owner: 'Petra Novakova',
    dueDate: 'dnes',
    status: 'open',
    priority: 'high'
  },
  {
    id: 2,
    title: 'Pripravit navazujici e-mail s dalsim krokem',
    owner: 'Martin Dvorak',
    dueDate: 'zitra',
    status: 'planned',
    priority: 'medium'
  },
  {
    id: 3,
    title: 'Doplnit poznamku k rozhodovacimu procesu',
    owner: 'Jana Horakova',
    dueDate: 'tento tyden',
    status: 'done',
    priority: 'low'
  }
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat('cs-CZ').format(value) + ' Kc';
}

function getTaskStatusLabel(status: OpportunityTask['status']) {
  if (status === 'done') {
    return 'Hotovo';
  }

  if (status === 'planned') {
    return 'Naplanovano';
  }

  return 'Otevreno';
}

export function OpportunityDetail({ opportunity, onBack }: OpportunityDetailProps) {
  return (
    <section className="opportunity-detail-page">
      <button className="detail-back" onClick={onBack} type="button">
        <Icon name="arrow" size={17} />
        Zpet na seznam
      </button>

      <header className={`detail-hero ${opportunity.urgency}`}>
        <div>
          <p className="detail-code">{opportunity.code}</p>
          <h1>{opportunity.title}</h1>
          <p>
            {opportunity.company} | {opportunity.owner}
          </p>
        </div>
        <div className="detail-actions">
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
      </header>

      <div className="detail-grid">
        <section className="detail-panel detail-summary">
          <div className="detail-panel-header">
            <h2>Prehled prilezitosti</h2>
            <span className={`probability-pill ${opportunity.urgency}`}>
              <Icon name="target" size={14} />
              {opportunity.probability} %
            </span>
          </div>

          <div className="detail-stats">
            <article>
              <span>Hodnota</span>
              <strong>{formatCurrency(opportunity.value)}</strong>
            </article>
            <article>
              <span>Dni bez aktivity</span>
              <strong>{opportunity.daysInactive}</strong>
            </article>
            <article>
              <span>Faze</span>
              <strong>{opportunity.phase}</strong>
            </article>
            <article>
              <span>Posledni aktivita</span>
              <strong>{opportunity.lastActivityDate}</strong>
            </article>
          </div>

          <div className="detail-note">
            <Icon name="alert" size={18} />
            <p>
              Detail je pripraveny na napojeni dalsiho endpointu. Ulohy jsou zatim lokalni mock, aby byl jasny budouci
              UX tok.
            </p>
          </div>
        </section>

        <section className="detail-panel">
          <div className="detail-panel-header">
            <h2>Ukoly</h2>
            <span>{mockTasks.length} pripravene</span>
          </div>

          <div className="task-list">
            {mockTasks.map((task) => (
              <article className={`task-item ${task.priority}`} key={task.id}>
                <div className="task-check">
                  <Icon name={task.status === 'done' ? 'check' : 'calendar'} size={16} />
                </div>
                <div>
                  <h3>{task.title}</h3>
                  <p>
                    {task.owner} | {task.dueDate}
                  </p>
                </div>
                <span>{getTaskStatusLabel(task.status)}</span>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
