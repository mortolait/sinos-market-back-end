import fastify from "fastify";
import { ZodError } from "zod";
import { usersRoutes } from "./http/controller/user/routes";

export const app = fastify();

app.register(usersRoutes);

app.setErrorHandler((error,request,reply)=>{
	if(error instanceof ZodError){
		return reply.status(400)
			.send(({
				message: "Validation error",
				issues: error.format()
			}));
	}

	return reply.status(500).send({message: "Internal server error"});
});
