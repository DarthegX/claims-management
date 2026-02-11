import { Injectable } from "@nestjs/common";
import { CreateDamageDto } from "../dto/create-damage.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Claim } from "../domain/claim.entity";
import { DamageDocument } from "../persistence/schemas/damage.schema";
import { Model } from 'mongoose';

@Injectable()
export class DamagesService {
    constructor(@InjectModel(Claim.name) private damageModel: Model<DamageDocument>,) { }

    async createDamage(damageDto: CreateDamageDto): Promise<string> {
        const createdDamage = await this.damageModel.create(damageDto);

        return createdDamage._id.toString();
    }
}