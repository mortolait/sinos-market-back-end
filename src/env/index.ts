import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
	PORT: z.coerce.number()
});

const _env = envSchema.safeParse(process.env);

if(!_env.success){
	console.log("Invalid enviroment variables", _env.error.format());
	throw new Error("Invalid enviroment variables");
}

export const env = _env.data;

