import { IsEnum, IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateClaimDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;
}