export interface Claim {
    title: string,
    description: string,
    status: typeof CLAIM_STATUS,
    total: number
}

export const CLAIM_STATUS = {
    PENDING: 'pending',
    IN_REVIEW: 'in-review',
    FINISHED: 'finished'
}