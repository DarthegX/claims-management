import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateClaimDto } from '../dto/create-claim.dto';
import { Claim, ClaimDocument } from '../persistence/schemas/claim.schema';
import { UpdateClaimDto } from '../dto/update-claim.dto';
import { UpdateClaimStatusDto } from '../dto/update-claim-status.dto';

@Injectable()
export class ClaimsService {
    constructor(
        @InjectModel(Claim.name) private claimModel: Model<ClaimDocument>,
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
        console.log('Update Claim: ' + this.updateClaim.toString());
        return;
    }

    async updateStatus(claimId: string, status: UpdateClaimStatusDto): Promise<void> {
        const updatedClaim = await this.claimModel.findByIdAndUpdate(claimId, status);
        console.log('Update Status: ' + status);
        return;
    }

    async addDamage(claimId: string, damageId: string) {
        return await this.claimModel
            .findByIdAndUpdate(
                claimId,
                { $push: { damages: damageId } },
                { new: true },
            )
            .populate('damages')
            .exec();
    }
}
