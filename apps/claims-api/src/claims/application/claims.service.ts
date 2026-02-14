import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateClaimDto } from '../dto/create-claim.dto';
import { Claim, ClaimDocument } from '../persistence/schemas/claim.schema';
import { UpdateClaimDto } from '../dto/update-claim.dto';
import { UpdateClaimStatusDto } from '../dto/update-claim-status.dto';
import { TotalCalculator } from './total-calculator.strategy';
import { Damage } from '../persistence/schemas/damage.schema';

@Injectable()
export class ClaimsService {
    constructor(
        @InjectModel(Claim.name) private claimModel: Model<ClaimDocument>,
        @Inject('TotalCalculator') private readonly calculator: TotalCalculator
    ) { }

    async createClaim(createClaimDto: CreateClaimDto): Promise<Claim> {
        const createdClaim = await this.claimModel.create(createClaimDto);
        return createdClaim;
    }

    async getAllClaims(): Promise<Claim[]> {
        return this.claimModel
            .find()
            .populate('damages')
            .exec();
    }

    async findById(id: string): Promise<Claim | null> {
        return await this.claimModel
            .findById(id)
            .populate('damages')
            .exec();
    }

    async updateClaim(claimId: string, updateClaimDto: UpdateClaimDto): Promise<void> {
        const updatedClaim = await this.claimModel.findByIdAndUpdate(claimId, updateClaimDto);
        return;
    }

    async updateStatus(claimId: string, status: UpdateClaimStatusDto): Promise<void> {
        const updatedClaim = await this.claimModel.findByIdAndUpdate(claimId, status);
        return;
    }

    async addDamage(claimId: string, damageId: string) {
        const updated = await this.claimModel
            .findByIdAndUpdate(
                claimId,
                { $push: { damages: damageId } },
                { returnDocument: 'after' },
            )
            .populate('damages')
            .exec();

        return this.updateTotalAmount(claimId, updated?.damages ?? []);
    }

    isDescriptionGreatherThan100(description: string) {
        return description.length > 100;
    }

    async removeDamageFromClaim(claimId: string, damageId: string) {
        return await this.claimModel
            .findByIdAndUpdate(
                claimId,
                { $pull: { damages: damageId } },
                { new: true },
            )
            .populate('damages')
            .exec();
    }

    updateTotalAmount(claimId: string, damages: Damage[]) {
        const updatedTotalAmount = this.recalculateTotalAmount(damages)

        return this.claimModel
            .findByIdAndUpdate(claimId, { totalAmount: updatedTotalAmount });
    }

    private recalculateTotalAmount(damages: Damage[]) {
        return this.calculator.calculate(damages);
    }
}
