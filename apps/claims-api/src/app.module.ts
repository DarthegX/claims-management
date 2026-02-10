import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { mongoConfig } from './config/mongo.config';
import { ClaimsModule } from './claims/claims.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: mongoConfig
    }),

    ClaimsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
