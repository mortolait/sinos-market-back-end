import { Authenticate } from "./../authenticate";
import { PrismaUserRepository } from "../../repositories/prisma/prisma.users-repository";

export function makeAuthenticateUseCase(){
	const userRepository = new PrismaUserRepository();
	const authenticate = new Authenticate(userRepository);

	return authenticate;
}