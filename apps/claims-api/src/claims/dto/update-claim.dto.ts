import { IsArray, IsNotEmpty, IsString } from "class-validator";
import { Damage } from "../domain/damage.entity";

export class UpdateClaimDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsArray()
    damages: Damage[];
}