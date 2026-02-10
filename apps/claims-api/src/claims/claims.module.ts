import { Module } from '@nestjs/common';
import { ClaimsController } from './claims.controller';
import { ClaimsService } from './application/claims.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Claim, ClaimSchema } from './persistence/schemas/claim.schema';
import { Damage } from './domain/damage.entity';
import { DamageSchema } from './persistence/schemas/damage.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Claim.name, schema: ClaimSchema },
      { name: Damage.name, schema: DamageSchema },
    ]),
  ],
  controllers: [ClaimsController],
  providers: [ClaimsService]
})
export class ClaimsModule { }
