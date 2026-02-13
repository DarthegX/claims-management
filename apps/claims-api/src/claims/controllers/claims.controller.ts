import { Body, Controller, Delete, ForbiddenException, Get, HttpCode, HttpStatus, NotFoundException, Param, Patch, Post, Put } from '@nestjs/common';
import { ClaimsService } from '../application/claims.service';
import { CreateClaimDto } from '../dto/create-claim.dto';
import { UpdateClaimDto } from '../dto/update-claim.dto';
import { DamagesService } from '../application/damage.service';
import { CreateDamageDto } from '../dto/create-damage.dto';
import { UpdateClaimStatusDto } from '../dto/update-claim-status.dto';
import { ClaimStatus } from '../domain/claim-status.enum';
import { UpdateDamageDto } from '../dto/update-damage.dto';

@Controller('claims')
export class ClaimsController {
    constructor(
        private readonly claimsService: ClaimsService,
        private readonly damageService: DamagesService
    ) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createClaimDto: CreateClaimDto) {
        return await this.claimsService.createClaim(createClaimDto);
    }

    @Get()
    async getAll() {
        return await this.claimsService.getAllClaims();
    }

    @Get(':claimId')
    async getClaimById(@Param('claimId') claimId: string) {
        const claim = await this.claimsService.findById(claimId);

        if (!claim) throw new NotFoundException('Claim not found');

        return await this.claimsService.findById(claimId);
    }

    @Patch(':claimId')
    async updateClaimById(
        @Param('claimId') claimId: string,
        @Body() updateClaimDto: UpdateClaimDto
    ) {
        const claim = await this.claimsService.findById(claimId);

        if (!claim) throw new NotFoundException('Claim not found');

        return await this.claimsService.updateClaim(claimId, updateClaimDto);
    }

    @Patch(':claimId/status')
    async updateClaimStatus(
        @Param('claimId') claimId: string,
        @Body() updateClaimStatusDto: UpdateClaimStatusDto
    ) {
        const claim = await this.claimsService.findById(claimId);

        if (!claim) throw new NotFoundException('Claim not found');

        if (this.damageService.findHighSeverityDamagesByClaim(claim.damages) &&
            !this.claimsService.isDescriptionGreatherThan100(claim.description)
        ) {
            throw new ForbiddenException('The description must be al least 100 characters long.')
        }

        return await this.claimsService.updateStatus(claimId, updateClaimStatusDto);
    }

    @Post(':claimId/damage')
    @HttpCode(HttpStatus.CREATED)
    async addDamageToClaim(
        @Param('claimId') claimId: string,
        @Body() createDamageDto: CreateDamageDto
    ) {
        const claim = await this.claimsService.findById(claimId);

        if (!claim) throw new NotFoundException('Claim not found');

        if (claim.status !== ClaimStatus.PENDING) throw new ForbiddenException('Cannot add damages to non pending claim');

        const newDamage = await this.damageService.createDamage(createDamageDto);

        await this.claimsService.addDamage(claimId, newDamage._id.toString());
    }

    @Patch(':claimId/damage/:damageId')
    @HttpCode(HttpStatus.CREATED)
    async updateDamageOnClaim(
        @Param('claimId') claimId: string,
        @Param('damageId') damageId: string,
        @Body() updateDamageDto: UpdateDamageDto
    ) {
        const claim = await this.claimsService.findById(claimId);

        if (!claim) throw new NotFoundException('Claim not found');

        await this.damageService.updateDamage(damageId, updateDamageDto);
    }

    @Delete(':claimId/damage/:damageId')
    @HttpCode(HttpStatus.CREATED)
    async deleteDamageOnClaim(
        @Param('claimId') claimId: string,
        @Param('damageId') damageId: string,
    ) {
        const claim = await this.claimsService.findById(claimId);

        if (!claim) throw new NotFoundException('Claim not found');

        await this.claimsService.removeDamageFromClaim(claimId, damageId);

        await this.damageService.deleteDamage(damageId);
    }
}
