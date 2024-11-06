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
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'neracaid_cloudacc',
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
