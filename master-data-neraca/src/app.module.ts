const dotenv = require('dotenv');
const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

// load controller
import { AppController } from './app.controller';
import { VariantController } from './variant/variant.controller';

// load service
import { AppService } from './app.service';
import { VariantService } from './variant/variant.service';

// db
import { variant } from './db/variant';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [variant],
      autoLoadModels: true,
      synchronize: false
    }),
  ],
  controllers: [AppController, VariantController],
  providers: [AppService, VariantService],
  exports: [SequelizeModule],
})
export class AppModule {}
