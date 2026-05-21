import { FormEvent, useEffect, useState } from 'react';
import { Icon } from '../../components/ui/Icon';
import { Opportunity } from './types';
import { createTask, fetchTasksForBusinessCase, TaskDto, TaskType } from './tasksApi';
import './OpportunityDetail.css';

interface OpportunityDetailProps {
  initialTaskModalOpen?: boolean;
  opportunity: Opportunity;
  onBack: () => void;
}

const taskTypeOptions: Array<{ label: string; value: TaskType }> = [
  { label: 'Telefonat', value: 'Call' },
  { label: 'E-mail', value: 'Email' },
  { label: 'Schuzka', value: 'Meeting' },
  { label: 'Jine', value: 'Other' }
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat('cs-CZ').format(value) + ' Kc';
}

function formatDueDate(dueDate: string | null) {
  if (!dueDate) {
    return 'Bez terminu';
  }

  return new Intl.DateTimeFormat('cs-CZ', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(new Date(dueDate));
}

function getTaskTypeLabel(taskType: TaskType) {
  if (taskType === 'Call') {
    return 'Telefonat';
  }

  if (taskType === 'Email') {
    return 'E-mail';
  }

  if (taskType === 'Meeting') {
    return 'Schuzka';
  }

  if (taskType === 'WORK') {
    return 'Prace';
  }

  return 'Jine';
}

function getTaskStatusLabel(completed: boolean) {
  if (completed) {
    return 'Hotovo';
  }

  return 'Otevreno';
}

export function OpportunityDetail({ initialTaskModalOpen = false, opportunity, onBack }: OpportunityDetailProps) {
  const [tasks, setTasks] = useState<TaskDto[]>([]);
  const [isLoadingTasks, setIsLoadingTasks] = useState(true);
  const [taskError, setTaskError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(initialTaskModalOpen);
  const [isCreatingTask, setIsCreatingTask] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [taskType, setTaskType] = useState<TaskType>('Call');

  const loadTasks = async () => {
    try {
      setIsLoadingTasks(true);
      setTaskError('');
      const loadedTasks = await fetchTasksForBusinessCase(opportunity.id);
      setTasks(loadedTasks);
    } finally {
      setIsLoadingTasks(false);
    }
  };

  useEffect(() => {
    let isActive = true;

    const loadCurrentTasks = async () => {
      try {
        setIsLoadingTasks(true);
        setTaskError('');
        const loadedTasks = await fetchTasksForBusinessCase(opportunity.id);

        if (isActive) {
          setTasks(loadedTasks);
        }
      } catch (error) {
        if (isActive) {
          setTaskError(error instanceof Error ? error.message : 'Nepodarilo se nacist ukoly.');
        }
      } finally {
        if (isActive) {
          setIsLoadingTasks(false);
        }
      }
    };

    loadCurrentTasks();

    return () => {
      isActive = false;
    };
  }, [opportunity.id]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDueDate('');
    setTaskType('Call');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleCreateTask = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      setTaskError('Nazev ukolu je povinny.');
      return;
    }

    try {
      setIsCreatingTask(true);
      setTaskError('');
      await createTask({
        title: title.trim(),
        description: description.trim(),
        dueDate: dueDate ? new Date(dueDate).toISOString() : null,
        completed: false,
        taskType,
        bussinessCaseId: opportunity.id
      });

      await loadTasks();
      closeModal();
    } catch (error) {
      setTaskError(error instanceof Error ? error.message : 'Nepodarilo se vytvorit ukol.');
    } finally {
      setIsCreatingTask(false);
    }
  };

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
          <button onClick={() => setIsModalOpen(true)} type="button">
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
            <p>Ukoly jsou napojene na backend endpoint pro konkretni obchodni pripad.</p>
          </div>
        </section>

        <section className="detail-panel">
          <div className="detail-panel-header">
            <h2>Ukoly</h2>
            <div className="task-header-actions">
              <span>{tasks.length} celkem</span>
              <button onClick={() => setIsModalOpen(true)} type="button">
                Novy ukol
              </button>
            </div>
          </div>

          {taskError && <div className="task-error">{taskError}</div>}
          {isLoadingTasks && <div className="task-state">Nacitam ukoly...</div>}
          {!isLoadingTasks && tasks.length === 0 && <div className="task-state">Zatim tu nejsou zadne ukoly.</div>}

          <div className="task-list">
            {tasks.map((task) => (
              <article className={task.completed ? 'task-item done' : 'task-item'} key={task.id}>
                <div className="task-check">
                  <Icon name={task.completed ? 'check' : 'calendar'} size={16} />
                </div>
                <div>
                  <h3>{task.title}</h3>
                  <p>
                    {getTaskTypeLabel(task.taskType)} | {formatDueDate(task.dueDate)}
                  </p>
                  {task.description && <p>{task.description}</p>}
                </div>
                <span>{getTaskStatusLabel(task.completed)}</span>
              </article>
            ))}
          </div>
        </section>
      </div>

      {isModalOpen && (
        <div className="task-modal-backdrop" role="presentation">
          <div aria-modal="true" className="task-modal" role="dialog">
            <div className="task-modal-header">
              <div>
                <p>{opportunity.code}</p>
                <h2>Novy ukol</h2>
              </div>
              <button aria-label="Zavrit modal" onClick={closeModal} type="button">
                x
              </button>
            </div>

            <form className="task-form" onSubmit={handleCreateTask}>
              <label>
                Nazev
                <input onChange={(event) => setTitle(event.target.value)} required value={title} />
              </label>

              <label>
                Typ
                <select onChange={(event) => setTaskType(event.target.value as TaskType)} value={taskType}>
                  {taskTypeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Termin
                <input onChange={(event) => setDueDate(event.target.value)} type="datetime-local" value={dueDate} />
              </label>

              <label>
                Popis
                <textarea onChange={(event) => setDescription(event.target.value)} rows={4} value={description} />
              </label>

              <div className="task-form-actions">
                <button onClick={closeModal} type="button">
                  Zrusit
                </button>
                <button disabled={isCreatingTask} type="submit">
                  {isCreatingTask ? 'Ukladam...' : 'Vytvorit ukol'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
