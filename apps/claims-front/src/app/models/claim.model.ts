import { Damage } from "./damage.model";

export type ClaimStatus = 'Pending' | 'In review' | 'Finished';

export interface Claim {
    _id: string;
    title: string;
    description: string;
    status: ClaimStatus;
    date: string;
    damages?: Damage[];
    totalAmount: number;
    createdAt: string;
}
