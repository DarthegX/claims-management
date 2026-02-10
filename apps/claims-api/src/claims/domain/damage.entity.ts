import { IsEnum, IsNumber, IsString, Min } from "class-validator";
import { Severity } from "./severity.enum";

export class Damage {
    @IsString()
    part: string;

    @IsString()
    imageURL: string;

    @IsEnum(Severity)
    severity: Severity;

    @IsNumber()
    @Min(0)
    price: number;
}