import { RegisterUseCase } from "../register-user";
import { PrismaUserRepository } from "../../repositories/prisma/prisma.users-repository";

export function makeRegisterUseCase(){
	const userRepository = new PrismaUserRepository();
	const registerUseCase = new RegisterUseCase(userRepository);

	return registerUseCase;
}