import { IsEnum, IsNumber, IsString, Min } from "class-validator";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from 'mongoose';
import { ClaimStatus } from "src/claims/domain/claim-status.enum";

export type ClaimDocument = HydratedDocument<Claim>;

@Schema({ timestamps: true })
export class Claim {
    @IsString()
    @Prop({ required: true })
    title: string;

    @IsString()
    @Prop({ required: true })
    description: string;

    @Prop({
        type: String,
        enum: ClaimStatus,
        default: ClaimStatus.PENDING,
    })
    status: ClaimStatus;

    @IsNumber()
    @Min(0)
    @Prop({ default: 0 })
    totalAmount: number;
}

export const ClaimSchema = SchemaFactory.createForClass(Claim);