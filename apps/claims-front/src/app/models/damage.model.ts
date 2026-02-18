export type Severity = 'low' | 'mid' | 'high';

export interface Damage {
    part: string;
    severity: Severity;
    imageURL: string;
    price: number;
}