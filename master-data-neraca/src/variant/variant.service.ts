import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { getDynamicVariantModel } from '../db/variant';

@Injectable()
export class VariantService {
  constructor(private readonly sequelize: Sequelize) {}

  // Dynamically get data from a table
  async getVariant(table: string) {
    const model = getDynamicVariantModel(this.sequelize, table); // Pass the sequelize instance
    return await model.findAll(); // Fetch data from the dynamically selected table
  }
}