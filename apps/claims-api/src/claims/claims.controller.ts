import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ClaimsService } from './application/claims.service';
import { CreateClaimDto } from './dto/create-claim.dto';

@Controller('claims')
export class ClaimsController {
    constructor(private readonly claimsService: ClaimsService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createClaimDto: CreateClaimDto) {
        return await this.claimsService.createClaim(createClaimDto);
    }

    @Get()
    async findAll() {
        return await this.claimsService.getAllClaims();
    }
}
