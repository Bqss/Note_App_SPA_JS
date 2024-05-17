import { UserRepository } from "@api/repositories/UserRepository";
import { InjectRepository } from "@base/decorators/InjectRepository";
import { AuthServiceProvider } from "@base/infrastructure/services/auth/AuthServiceProvider";
import { HashService } from "@base/infrastructure/services/hash/HashService";
import { randomUUID } from "crypto";
import { Service } from "typedi";


@Service()
export class RegisterService {
  constructor(@InjectRepository private userRepository: UserRepository, private authService: AuthServiceProvider, private hashService: HashService) {

  }

  public async register(payload: any){

    let newUser = await this.userRepository.createUser({
      id: randomUUID(),
      username: payload.username,
      email: payload.email,
      password: await this.hashService.make(payload.password),
    }) as any;

    return newUser;

  }
}