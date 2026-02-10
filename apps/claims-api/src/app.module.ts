import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { mongoConfig } from './config/mongo.config';

@Module({
  imports: [MongooseModule.forRootAsync({ useFactory: mongoConfig })],
  controllers: [],
  providers: [],
})
export class AppModule {

}
