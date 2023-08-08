import { beforeEach, describe, expect,it } from "vitest";
import { RegisterUseCase } from "./register-user";
import { InmemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository";
import { compare } from "bcryptjs";

let userRepository: InmemoryUsersRepository;
let sut: RegisterUseCase;

describe("Register Use Case",()=>{
	beforeEach(() => {
		userRepository = new InmemoryUsersRepository();
		sut = new RegisterUseCase(userRepository);
	});

	it("should to register user ", async ()=>{
		const { user } = await sut.execute({
			name: "Lucas mortola da cunha",
			email: "lucas@allto.digital",
			password: "senha123"
		});
		console.log({ user });
		expect(user.id).toEqual(expect.any(String));
	});

	it("should not register user with same email", async ()=>{
		await sut.execute({
			name: "Lucas mortola da cunha",
			email: "lucas@allto.digital",
			password: "senha123"
		});

		await expect(()=>
			sut.execute({
				name: "Joao da silva",
				email: "lucas@allto.digital",
				password: "senha123"
			}),
		).rejects.toBeInstanceOf(Error);
	});

	it("should to register hash of password  ", async ()=>{
		const { user } = await sut.execute({
			name: "Lucas mortola da cunha",
			email: "lucas@allto.digital",
			password: "senha123"
		});
		console.log({ user });

		const isPasswordCorrectlyHashed = await compare(
			"senha123",
			user.password_hash
		);
        
		expect(isPasswordCorrectlyHashed).toEqual(true);
	});
});