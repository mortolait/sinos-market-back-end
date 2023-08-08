import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeAuthenticateUseCase } from "../../../use-cases/factories/make-authenticate-use-case";
import { InvalidCredationError } from "../../../use-cases/errors/invalid-credation-error";

export async function authenticate(req: FastifyRequest, reply: FastifyReply) {
	const authenticateSchema = z.object({
		email: z.string(),
		password: z.string(),
	});

	const { email, password } = authenticateSchema.parse(req.body);

	try {
		const authenticateUseCase = makeAuthenticateUseCase();
		const { user } = await authenticateUseCase.execute({ email, password });
		reply.status(200).send( user );
	} catch (error) {
		if(error instanceof  InvalidCredationError){
			reply.status(400).send(error.message);
		}
	}
}
