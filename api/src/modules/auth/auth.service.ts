import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from '../../common/database/database.service';
import { AuthClient } from '../../integrations/pitayacore/clients/auth.client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private databaseService: DatabaseService,
    private jwtService: JwtService,
    private authClient: AuthClient,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.databaseService.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    
    const payload = {
      sub: user.id,
      email: user.email,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    };
  }

  async register(data: {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
  }) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    
    const user = await this.databaseService.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        firstName: data.firstName,
        lastName: data.lastName,
      },
    });

    const payload = {
      sub: user.id,
      email: user.email,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    };
  }

  async validateTokenFromPitayaCore(token: string) {
    return this.authClient.validateToken(token);
  }
}
