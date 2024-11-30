import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { VariantService } from '../models/variant.service';
import { ApiGatewayGuard } from '../../common/guards/api-gateway.guard';

@Controller('variants')
@UseGuards(ApiGatewayGuard)
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
