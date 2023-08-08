import { Prisma, User } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { UserRepository } from "../users-repository";

export class InmemoryUsersRepository implements UserRepository{
	public items: User[] = [];

	async create (data: Prisma.UserCreateInput ): Promise<User>{
		const user = {
			id: randomUUID(),
			name: data.name,
			email: data.email,
			password_hash: data.password_hash,
			create_at: new Date()
		};

		this.items.push(user);

		return  user;
	}

	async findByEmail(email: string){
		const user = this.items.find(x => x.email ==email);

		if(!user){
			return null;
		}
		return user;
	}
}