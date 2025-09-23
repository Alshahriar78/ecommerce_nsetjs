
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/entities/users.entities';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async validateUser(email: string, password: string): Promise<any> {

    const user = await this.usersRepository
      .createQueryBuilder("user")
      .where("user.email = :email", { email: email })
      .getOne();
    console.log(user)
    if (!user) {
      throw new UnauthorizedException('User Not Found')
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid Credentilas!!!')
    }
    const { password: _, ...result } = user;
    return result
  }

  async signIn(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersRepository
      .createQueryBuilder("u")
      .leftJoinAndSelect("u.role", "role")
      .select([
        "u.id",
        "u.email",
        "u.name",
        "u.phone",
        "u.address",
        "u.is_active",
        "role.id",
        "role.name",
        "role.description"
      ])
      .where("u.email = :email", { email })
      .getOne();

    if (!user) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, email: user.email, role: user.role.name };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}

