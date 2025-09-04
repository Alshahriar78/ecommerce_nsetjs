
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
    
    const user = await this.usersRepository.findOne({
      where: { email },
      relations: ['role'],
    });
    
    if(!user){
      throw new UnauthorizedException('User Not Found')
    }
    const isPasswordValid = await bcrypt.compare(password,user.password);
    if(!isPasswordValid){
      throw new UnauthorizedException('Invalid Credentilas!!!')
    } 
    const {password:_,...result} = user;
    return result
  }

  async signIn(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersRepository.findOne({
      where: { email },
      relations: ['role'],
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    
    const payload = { sub: user.id, email: user.email, role: user.role.name };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}

