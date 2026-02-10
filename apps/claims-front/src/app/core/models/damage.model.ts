export interface Damage {
    part: string,
    severity: typeof DAMAGE_SEVERITY,
    imageURL: string,
    price: number
}

export const DAMAGE_SEVERITY = {
    LOW: 'low',
    MID: 'mid',
    HIGH: 'high'
}