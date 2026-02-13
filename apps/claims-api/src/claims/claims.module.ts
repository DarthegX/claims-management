import { Module } from '@nestjs/common';
import { ClaimsController } from './controllers/claims.controller';
import { ClaimsService } from './application/claims.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Claim, ClaimSchema } from './persistence/schemas/claim.schema';
import { Damage } from './domain/damage.entity';
import { DamageSchema } from './persistence/schemas/damage.schema';
import { DamagesService } from './application/damage.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Claim.name, schema: ClaimSchema },
      { name: Damage.name, schema: DamageSchema },
    ]),
  ],
  controllers: [ClaimsController],
  providers: [ClaimsService, DamagesService]
})
export class ClaimsModule { }
