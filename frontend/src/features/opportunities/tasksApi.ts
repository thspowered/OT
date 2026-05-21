export type TaskType = 'Call' | 'Email' | 'Meeting' | 'Other' | 'WORK';

export interface TaskDto {
  id: number;
  title: string;
  description: string;
  dueDate: string | null;
  completed: boolean;
  taskType: TaskType;
  bussinessCaseId?: number;
}

interface TasksResponse {
  success: boolean;
  data: TaskDto[];
}

interface TaskResponse {
  success: boolean;
  data: TaskDto;
}

export interface CreateTaskPayload {
  title: string;
  description: string;
  dueDate: string | null;
  completed: boolean;
  taskType: TaskType;
  bussinessCaseId: number;
}

export async function fetchTasksForBusinessCase(businessCaseId: number): Promise<TaskDto[]> {
  const response = await fetch(`/api/business-cases/${businessCaseId}/tasks`);

  if (!response.ok) {
    throw new Error('Nepodarilo se nacist ukoly.');
  }

  const result = (await response.json()) as TasksResponse;

  if (!result.success) {
    throw new Error('Backend vratil chybu pri nacitani ukolu.');
  }

  return result.data;
}

export async function createTask(payload: CreateTaskPayload): Promise<TaskDto> {
  const response = await fetch('/api/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error('Nepodarilo se vytvorit ukol.');
  }

  const result = (await response.json()) as TaskResponse;

  if (!result.success) {
    throw new Error('Backend vratil chybu pri vytvareni ukolu.');
  }

  return result.data;
}
