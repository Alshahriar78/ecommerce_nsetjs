import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "./entities/users.entities";
import { Repository } from "typeorm";
import { CreateUsersDto } from "./dto/create-users.dto";
import { UpdateUsersDto } from "./dto/update-users.dto";

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>
    ) { }

    async createUsers(createUsersDto: CreateUsersDto) {
        const createData = this.usersRepository.create(createUsersDto)
        return await this.usersRepository.save(createData);
    }

    async getAllUsers(){
        return await this.usersRepository.find()
    }

    async getUsersById(id:number){
        const user  = await this.usersRepository.createQueryBuilder('user')
        .leftJoinAndSelect('user.role','role')
        .where('user.id = :id',{id:id})
        .getOneOrFail()
        return user;
    }

    async updateUsersById(id:number, updateUsersDto:UpdateUsersDto){
        const findUsers: any = await this.getUsersById(id);
       const updateData = this.usersRepository.merge(findUsers,updateUsersDto)
       return await this.usersRepository.save(updateData);
    }

    async deleteUsersById(id:number){
        const deleteUser:any = await this.getUsersById(id);
        await this.usersRepository.remove(deleteUser);
        return deleteUser ;
    }

    async findByEmail(email:string)  : Promise<Users | null> {
        const user = this.usersRepository.findOne({where:{email:email}})
        return user;
    }
}