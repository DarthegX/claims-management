import { Injectable } from "@nestjs/common";
import { CreateDamageDto } from "../dto/create-damage.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Claim } from "../domain/claim.entity";
import { Damage, DamageDocument } from "../persistence/schemas/damage.schema";
import { Model } from 'mongoose';
import { Severity } from "../domain/severity.enum";
import { UpdateDamageDto } from "../dto/update-damage.dto";

@Injectable()
export class DamagesService {
    constructor(@InjectModel(Damage.name) private damageModel: Model<DamageDocument>,) { }

    async createDamage(damageDto: CreateDamageDto): Promise<DamageDocument> {
        return await this.damageModel.create(damageDto);
    }

    findHighSeverityDamagesByClaim(damages: any[]): boolean {
        const highDamage = damages.find((damage) => damage.severity === Severity.HIGH)

        return highDamage !== undefined;
    }

    async updateDamage(damageId: string, updateDamageDto: UpdateDamageDto): Promise<void> {
        const updatedDamage = await this.damageModel.findByIdAndUpdate(damageId, updateDamageDto);

        return;
    }

    async deleteDamage(damageId: string) {
        await this.damageModel.findByIdAndDelete(damageId);
    }
}