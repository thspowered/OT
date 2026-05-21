import { Request, Response } from 'express';
import { BusinessCaseService } from '../services/business-case.service';

const businessCaseService = new BusinessCaseService();

export const getBusinessCases = async (req: Request, res: Response): Promise<void> => {
    try {
        const data = await businessCaseService.getBusinessCasesForFrontend();
        
        res.status(200).json({ 
            success: true, 
            count: data.length,
            data: data 
        });
    } catch (error) {
        console.error('Chyba v controlleru:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Interní chyba serveru při zpracování obchodních případů' 
        });
    }
};