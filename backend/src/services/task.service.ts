import path from 'path';
import fs from 'fs/promises';

export type TaskType = "Call" | "Email" | "Meeting" | "Other";

export interface TaskDTO {
    id: number;
    title: string;
    description: string;
    dueDate: string | null;
    completed: boolean;
    taskType: TaskType;
    bussinessCaseId?: number;
}

export interface createTaskDTO {
    title: string;
    description: string;
    dueDate: string | null;
    completed: boolean;
    taskType: TaskType;
    bussinessCaseId?: number;
}

export class TaskService {

    private dataPath = path.join(import.meta.dirname, '../data/tasks.json');

    public async getAllTasks(): Promise<TaskDTO[]> {
        try {
            const fileContent = await fs.readFile(this.dataPath, 'utf-8');
            return JSON.parse(fileContent);
        } catch (error: any) {
            if (error.code === 'ENOENT') {
                return [];
            }
            throw error; 
        }
    }

    public async createTask(taskData: createTaskDTO): Promise<TaskDTO> {
        const tasks = await this.getAllTasks();
        
        const newTask = {
            id: Date.now(),
            ...taskData
        };
        
        tasks.push(newTask);
        const dirPath = path.dirname(this.dataPath);
        await fs.mkdir(dirPath, { recursive: true });
        await fs.writeFile(this.dataPath, JSON.stringify(tasks, null, 2));
        
        return newTask;
    }

    public async getTasksByBusinessCaseId(businessCaseId: number): Promise<TaskDTO[]> {
        const tasks = await this.getAllTasks();
        return tasks.filter(task => task.bussinessCaseId === businessCaseId);
    }   

}

