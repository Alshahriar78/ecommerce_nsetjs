import { Users } from "src/users/entities/users.entities";
import { Column, Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity({name:'users_role'})
export class UsersRole{

    @PrimaryGeneratedColumn()
    id:string;

    @Column()
    name:string;

    @Column()
    description:string;

    @OneToOne(() => Users, (user) => user.role)  
    user: Users;
}