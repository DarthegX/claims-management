import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Damage } from "../domain/damage.entity";
import { Severity } from "../domain/severity.enum";
import { Prop } from "@nestjs/mongoose";

export class UpdateDamageDto {
    @IsString()
    @IsNotEmpty()
    part: string;

    @IsString()
    @IsNotEmpty()
    imageURL: string;

    @IsEnum(Severity)
    @Prop({ required: true })
    severity: Severity;

    @IsNumber()
    price: number;
}