const dotenv = require('dotenv');
const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { ApiGatewayGuard } from './common/guards/api-gateway.guard';
import { SequelizeModule } from '@nestjs/sequelize';

// load controller
import { AppController } from './app.controller';
import { VariantController } from './modules/controllers/variant.controller';

// load service
import { AppService } from './app.service';
import { VariantService } from './modules/models/variant.service';

// db
import { Variant } from './db/variant';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [Variant],
      autoLoadModels: true,
      synchronize: false
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AppController, VariantController],
  providers: [
    AppService, 
    VariantService,
    {
      provide: APP_GUARD,
      useClass: ApiGatewayGuard, // Register the global guard
    },
  ],
  exports: [SequelizeModule,JwtModule],
})
export class AppModule {}
