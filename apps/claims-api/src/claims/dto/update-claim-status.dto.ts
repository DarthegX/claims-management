import { IsArray, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Damage } from "../domain/damage.entity";
import { ClaimStatus } from "../domain/claim-status.enum";

export class UpdateClaimStatusDto {
    @IsEnum(ClaimStatus)
    status: string;
}