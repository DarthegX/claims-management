import { Module } from '@nestjs/common';
import { ClaimsController } from './controllers/claims.controller';
import { ClaimsService } from './application/claims.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Claim, ClaimSchema } from './persistence/schemas/claim.schema';
import { Damage, DamageSchema } from './persistence/schemas/damage.schema';
import { DamagesService } from './application/damage.service';
import { TotalCalculator } from './application/total-calculator.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Claim.name, schema: ClaimSchema },
      { name: Damage.name, schema: DamageSchema },
    ]),
  ],
  controllers: [ClaimsController],
  providers: [ClaimsService, DamagesService, {
    provide: 'TotalCalculator',
    useClass: TotalCalculator
  }]
})
export class ClaimsModule { }
