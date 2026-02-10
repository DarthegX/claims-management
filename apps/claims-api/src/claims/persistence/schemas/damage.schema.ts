import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { IsEnum, IsNumber, IsString, Min } from "class-validator";
import { Severity } from "src/claims/domain/severity.enum";
import { HydratedDocument } from 'mongoose';

export type DamageDocument = HydratedDocument<Damage>;

export class Damage {
    @IsString()
    @Prop({ required: true })
    part: string;

    @IsString()
    imageURL: string;

    @IsEnum(Severity)
    @Prop({ required: true })
    severity: Severity;

    @IsNumber()
    @Min(0)
    @Prop({ required: true })
    price: number;
}

export const DanmageSchema = SchemaFactory.createForClass(Damage);