import { Service } from 'typedi';
import { UserRepository } from '@api/repositories/UserRepository';
import { InvalidCredentials } from '@api/exceptions/Auth/InvalidCredentials';
import { AuthServiceProvider } from '@base/infrastructure/services/auth/AuthServiceProvider';
import { LoginRequest } from '@base/api/requests/Auth/LoginRequest';
import { HashService } from '@base/infrastructure/services/hash/HashService';
import { InjectRepository } from '@base/decorators/InjectRepository';
import { Op } from 'sequelize';

@Service()
export class AuthService {
  constructor(
    @InjectRepository private userRepository: UserRepository,
    private authServiceProvider: AuthServiceProvider,
    private hashService: HashService) {
      
    }

  public async login(data: LoginRequest) {
    let user = await this.userRepository.repository.findOne({
      where: { 
     
        [Op.or] : {
          email: data.username ,
          username: data.username
        }
      },
    }) as any;

    if (!user) {
      throw new InvalidCredentials();
    }

    if (!(await this.hashService.compare(data.password, user?.password))) {
      throw new InvalidCredentials();
    }

    return this.authServiceProvider.sign(
      {
        userId: user.id,
        email: user.email,
      });
  }
}
