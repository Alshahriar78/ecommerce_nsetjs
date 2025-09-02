import { Body, Injectable, Param, Patch } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersRole } from "./entities/users_role.entity";
import { Repository } from "typeorm";
import { CreateUsersRoleDto } from "./dto/create-users-role.dto";
import { UpdateUsersRoleDto } from "./dto/update-users-role.dto";




@Injectable()
export class UsersRoleService {

    constructor(
        @InjectRepository(UsersRole)
        private readonly userRoleRepository: Repository<UsersRole>
    ) { }

    async createUsersRole(createUsersRoleDto: CreateUsersRoleDto) {
        const data = this.userRoleRepository.create(createUsersRoleDto)
        return await this.userRoleRepository.save(data)
        
    }

    async gettAllUsersRole() {
        return await this.userRoleRepository.find()

    }

    async findById(id: number) {

        return await this.userRoleRepository.findOneBy({ id })
    }

    async updateUsersRoleById(id: number, updateUsersRoleDto: UpdateUsersRoleDto) {
        const findUserRole: any = await this.findById(id)
        const userData = this.userRoleRepository.merge(findUserRole, updateUsersRoleDto)
        return await this.userRoleRepository.save(userData)
    }

    async removeUserRole(id: number) {
       
            const deleteUser: any = await this.findById(id)
            await this.userRoleRepository.remove(deleteUser)
            return deleteUser;
        
    }

}