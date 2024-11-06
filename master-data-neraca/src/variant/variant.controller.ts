import { Controller, Get, Param } from '@nestjs/common';
import { VariantService } from './variant.service';

@Controller('variant')
export class VariantController {
  constructor(private readonly variantService: VariantService) {}

  // using /variant/:prefix
  @Get(':prefix')
  async getAllVariant(@Param('prefix') prefix: string) {
    // Use the injected service to get the data for the table
    const tableName = `${prefix}1inv_variants`
    return await this.variantService.getVariant(tableName);
  }
}
