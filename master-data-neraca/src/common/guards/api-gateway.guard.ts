import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class ApiGatewayGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const isFromGateway = request.headers['x-from-api-gateway'];

        if (isFromGateway !== 'true') {
            throw new UnauthorizedException('Forbidden: Only API Gateway can access this resource');
        }

        return true;
    }
}