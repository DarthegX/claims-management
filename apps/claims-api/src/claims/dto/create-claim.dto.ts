import { IsEnum, IsNumber, IsString, Min } from "class-validator";

export class CreateClaimDto {
    @IsString()
    title: string;

    @IsString()
    description: string;
}