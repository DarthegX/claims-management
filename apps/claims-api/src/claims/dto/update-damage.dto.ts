import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
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
    @Prop({ required: true, type: String })
    severity: Severity;

    @IsNumber()
    price: number;
}