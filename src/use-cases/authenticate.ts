import { User } from "@prisma/client";
import { UserRepository } from "../repositories/users-repository";
import { compare } from "bcryptjs";
import { InvalidCredationError } from "./errors/invalid-credation-error";
interface AuthenticateUseCaseRequest{
    email: string,
    password: string
}
interface AuthenticateUseCaseResponse{
    user: User
}
export class Authenticate{
	constructor(private userRepository: UserRepository){}

	async execute({email, password}: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse>{
		const user  = await this.userRepository.findByEmail(email);

		if(!user){
			throw new InvalidCredationError();
		}

		const isPasswordEqual = await compare(password,user.password_hash);


		if(!isPasswordEqual){
			throw new InvalidCredationError();
		}

		return {
			user
		};
	}
}