import { Injectable } from "@nestjs/common";
import { Damage } from "../persistence/schemas/damage.schema";

export interface ITotalCalculator {
    calculate(damages: Damage[]): number;
}

@Injectable()
export class TotalCalculator implements ITotalCalculator {
    calculate(damages: Damage[]): number {
        return damages.reduce(
            (sum, damage) => sum + damage.price,
            0
        );
    }
}