import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsEnum, IsNumber, IsString, Min } from "class-validator";
import { Severity } from "../../domain/severity.enum";
import { HydratedDocument } from 'mongoose';

export type DamageDocument = HydratedDocument<Damage>;

@Schema({ timestamps: true, id: true, collection: 'damages' })
export class Damage {
    @IsString()
    @Prop({ required: true })
    part: string;

    @IsString()
    @Prop()
    imageURL: string;

    @IsEnum(Severity)
    @Prop({ required: true, type: String, enum: Severity })
    severity: Severity;

    @IsNumber()
    @Min(0)
    @Prop({ required: true })
    price: number;
}

export const DamageSchema = SchemaFactory.createForClass(Damage);