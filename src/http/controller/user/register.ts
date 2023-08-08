import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeRegisterUseCase } from "../../../use-cases/factories/make-register-use-case";
import { UserAlreadyExistsError } from "../../../use-cases/errors/user-already-exists-error";

export async function register(request: FastifyRequest,reply: FastifyReply){
	const registerBodySchema = z.object({
		name: z.string(),
		email: z.string().email(),
		password: z.string()
	});

	const { name, email, password } = registerBodySchema.parse(request.body);
    
	try {
		const registerUserCase = makeRegisterUseCase();
		const { user } = await registerUserCase.execute({
			name,
			email,
			password
		});
		reply.status(201).send({ user });
	} catch (err) {
		console.log("error");
		if(err instanceof UserAlreadyExistsError){
			return reply.status(409).send(err.message);
		}
		throw err;

        
	}
}