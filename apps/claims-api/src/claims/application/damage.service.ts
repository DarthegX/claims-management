import { Injectable } from "@nestjs/common";
import { CreateDamageDto } from "../dto/create-damage.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Claim } from "../domain/claim.entity";
import { DamageDocument } from "../persistence/schemas/damage.schema";
import { Model } from 'mongoose';
import { Damage } from "../domain/damage.entity";
import { Severity } from "../domain/severity.enum";
import { UpdateDamageDto } from "../dto/update-damage.dto";

@Injectable()
export class DamagesService {
    constructor(@InjectModel(Claim.name) private damageModel: Model<DamageDocument>,) { }

    async createDamage(damageDto: CreateDamageDto): Promise<string> {
        const createdDamage = await this.damageModel.create(damageDto);

        return createdDamage._id.toString();
    }

    findHighSeverityDamagesByClaim(damages: Damage[]): boolean {
        const highDamage = damages.find((damage) => { damage.severity === Severity.HIGH })

        return highDamage !== null;
    }

    async updateDamage(damageId: string, updateDamageDto: UpdateDamageDto): Promise<void> {
        const updatedDamage = await this.damageModel.findByIdAndUpdate(damageId, updateDamageDto);
        console.log('Update damage: ' + updatedDamage?.toJSON());
        return;
    }

    async deleteDamage(damageId: string) {
        await this.damageModel.findByIdAndDelete(damageId);
    }
}