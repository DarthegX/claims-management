import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateClaimDto } from '../dto/create-claim.dto';
import { Claim, ClaimDocument } from '../persistence/schemas/claim.schema';

@Injectable()
export class ClaimsService {
    constructor(
        @InjectModel(Claim.name) private claimModel: Model<ClaimDocument>,
    ) { }

    async create(createClaimDto: CreateClaimDto): Promise<Claim> {
        const createdClaim = await this.claimModel.create(createClaimDto);
        return createdClaim;
    }

    async findAll(): Promise<Claim[]> {
        return this.claimModel.find().exec();
    }
}
