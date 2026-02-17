export type ClaimStatus = 'Pending' | 'In review' | 'Finished';
export type Severity = 'LOW' | 'MID' | 'HIGH';

export interface Damage {
    part: string;
    severity: Severity;
    evidenceUrl: string;
    estimatedCost: number;
}

export interface Claim {
    id: string;
    title: string;
    description: string;
    status: ClaimStatus;
    date: string;
    reportedDamagesCount: number;
    damages?: Damage[];
    totalImpact: number;
}
