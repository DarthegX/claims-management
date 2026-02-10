import { Module } from '@nestjs/common';
import { ClaimsController } from './claims.controller';
import { ClaimsService } from './claims.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Claim, ClaimSchema } from './domain/claim.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Claim.name, schema: ClaimSchema }]),
  ],
  controllers: [ClaimsController],
  providers: [ClaimsService]
})
export class ClaimsModule { }
