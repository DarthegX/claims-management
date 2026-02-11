import { IsEAN, IsEnum, IsNotEmpty, IsNumber, IsString, Min } from "class-validator";
import { Severity } from "../domain/severity.enum";
import { Prop } from "@nestjs/mongoose";

export class CreateDamageDto {
    @IsString()
    @IsNotEmpty()
    part: string;

    @IsEnum(Severity)
    @IsNotEmpty()
    severity: Severity;

    @IsNumber()
    @Min(0)
    price: number;
}