import { IsEnum, IsNumber, IsString, Min } from "class-validator";
import { ClaimStatus } from "./claim-status.enum";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

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