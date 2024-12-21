import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ApiGatewayGuard implements CanActivate {

    constructor(private readonly jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        
        // Validate x-from-api-gateway header
        const isFromGateway = request.headers['x-from-api-gateway'];

        if (isFromGateway !== 'true') {
            throw new UnauthorizedException('Forbidden: Only API Gateway can access this resource');
        }

        // Validate JWT Token
        const authHeader = request.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
          throw new UnauthorizedException('Missing or invalid authorization header');
        }

        const token = authHeader.split(' ')[1];
        try {
          const decoded = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
          request.user = decoded; // Attach decoded token payload to the request object
        } catch (error) {
          throw new UnauthorizedException('Invalid or expired token');
        }

        return true;
    }
}