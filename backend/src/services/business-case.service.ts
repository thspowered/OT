import fs from 'fs/promises';
import path from 'path';
import { BusinessCaseResponse } from '../types';
import { BusinessCase } from '../types';


interface BusinessCaseDTO {
    id: number;
    code: string;
    name: string;
    companyName: string | null;
    ownerName: string;
    totalAmount: number;
    currencyCode: string;
    status: "B_ACTIVE" | "E_WIN" | "F_LOST";
    probability: number;
    phaseColor: string | null;
}

export class BusinessCaseService {
    private dataPath = path.join(import.meta.dirname, '../../../data/data.json');

    public async getBusinessCasesForFrontend(): Promise<BusinessCaseDTO[]> {
        console.log('Načítám obchodní případy z:', this.dataPath);
        const rawData = await this.fetchRawData();
        return rawData.data.map(this.mapToDTO);
    }

    private async fetchRawData(): Promise<BusinessCaseResponse> {
        try {
            const fileContent = await fs.readFile(this.dataPath, 'utf-8');
            return JSON.parse(fileContent) as BusinessCaseResponse;
        } catch (error) {
            console.error('Chyba při načítání dat:', error);
            throw new Error('Nepodařilo se načíst data');
        }
    }

    private mapToDTO(raw: BusinessCase): BusinessCaseDTO {
        return {
            id: raw.id,
            code: raw.code,
            name: raw.name,
            companyName: raw.company ? raw.company.name : null,
            ownerName: raw.owner ? raw.owner.fullName : 'Neznámý',
            totalAmount: raw.totalAmount,
            currencyCode: raw.currency ? raw.currency.code01 : 'CZK',
            status: raw.status,
            probability: raw.probability,
            phaseColor: raw.businessCasePhase ? raw.businessCasePhase.color : null
        };
    }
}