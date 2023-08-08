import { beforeEach, describe, expect, it } from "vitest";
import { InmemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository";
import { Authenticate } from "./authenticate";
import { hash } from "bcryptjs";
import { string } from "zod";
import { InvalidCredationError } from "./errors/invalid-credation-error";

let userRepository: InmemoryUsersRepository;
let sut: Authenticate;

describe("authenticate use case",()=>{
	beforeEach(()=>{
		userRepository = new InmemoryUsersRepository();
		sut = new Authenticate(userRepository);      
	});

	it("Should be able authenticate", async ()=>{
		await userRepository.create({
			email: "teste@email.com",
			name: "nome teste",
			password_hash: await hash("123",6)
		});

		const { user } = await sut.execute({email:"teste@email.com",password: "123"});

		expect(user.id).toEqual(expect.any(String));
        
	});

	it("Should not be able authenticate with email wrong",async ()=>{
		await userRepository.create({
			email: "joaosilva@teste.com",
			name: "Joao da silva",
			password_hash: await hash("123",6)
		});

		await expect(async ()=>{
			await sut.execute({email: "joaosilva@teste1.com",password:"123"});
		}).rejects.toBeInstanceOf(InvalidCredationError);

	});

	it("should not be able authenticate with wrong password",async ()=>{
		await userRepository.create({
			name: "joaovda silva",
			email: "joaosilva1@teste.com",
			password_hash: await hash("123",6)
		});

		expect(async ()=>{
			await sut.execute({ email: "joaosilva1@teste.com", password: "1232"});
		}).rejects.toBeInstanceOf(InvalidCredationError);
	});
});