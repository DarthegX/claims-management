import { IsEnum, IsNumber, IsString, Min } from "class-validator";
import { ClaimStatus } from "./claim-status.enum";

export class Claim {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsEnum(ClaimStatus)
    status: ClaimStatus;

    @IsNumber()
    @Min(0)
    totalAmount: number;
}