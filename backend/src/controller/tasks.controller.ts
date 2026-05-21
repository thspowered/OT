import { TaskService } from "../services/task.service";

import { Request, Response } from 'express';

const taskService = new TaskService();

export const createTask = async (req: Request, res: Response) => {
    try {
        const taskData = req.body;
        const newTask = await taskService.createTask(taskData);
        res.status(201).json({ success: true, data: newTask });
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ success: false, error: 'Internal server error while creating task' });
    }
};

export const getTasks = async (req: Request, res: Response) => {
    try {
        const tasks = await taskService.getAllTasks();
        res.status(200).json({ success: true, data: tasks });
    }
    catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ success: false, error: 'Internal server error while fetching tasks' });
    }
};


export const getTasksByBusinessCaseId = async (req: Request, res: Response) => {
    try {
        const businessCaseId = parseInt(req.params.businessCaseId, 10);
        const tasks = await taskService.getTasksByBusinessCaseId(businessCaseId);
        res.status(200).json({ success: true, data: tasks });
    }
    catch (error) {
        console.error('Error fetching tasks by business case ID:', error);
        res.status(500).json({ success: false, error: 'Internal server error while fetching tasks by business case ID' });
    }
};