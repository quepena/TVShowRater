import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthHelper } from './auth.helper';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { LoginDto, RegisterDto, TokenDto } from './auth.dto';
import { ListService } from 'src/list/list.service';

@Injectable()
export class AuthService {
  @InjectRepository(User) private readonly repository: Repository<User>;
  @Inject(ListService) private readonly listService: ListService;
  @Inject(AuthHelper) private readonly helper: AuthHelper;

  public async register(
    body: RegisterDto,
  ): Promise<(User & { token: string }) | never> {
    const {
      name,
      last_name,
      email,
      photo,
      password,
      isAdmin,
      isOnboarded,
    }: RegisterDto = body;
    let user: User = await this.repository.findOne({ where: { email } });

    if (user) {
      throw new HttpException(
        'ERROR: User with this E-mail already exists',
        HttpStatus.CONFLICT,
      );
    }

    user = new User();

    user.name = name;
    user.last_name = last_name;
    user.email = email;
    user.photo = photo;
    user.password = this.helper.encodePassword(password);
    user.isAdmin = isAdmin;
    user.isOnboarded = isOnboarded;

    await this.repository.save(user);

    this.listService.createList({
      name: 'Watched',
      user: user.id,
      tvShows: [],
    });
    this.listService.createList({
      name: 'Currently Watching',
      user: user.id,
      tvShows: [],
    });
    this.listService.createList({
      name: 'Watchlist',
      user: user.id,
      tvShows: [],
    });

    return { ...user, token: this.helper.generateToken(user) };
  }

  public async login(body: LoginDto): Promise<TokenDto> {
    const { email, password }: LoginDto = body;
    const user: User = await this.repository.findOne({ where: { email } });

    if (!user) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid: boolean = this.helper.isPasswordValid(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new HttpException('Incorrect password', HttpStatus.NOT_FOUND);
    }

    const token: TokenDto = {
      token: this.helper.generateToken(user),
    };

    return token;
  }

  public async refresh(user: User): Promise<string> {
    return this.helper.generateToken(user);
  }

  async getProfile(token: TokenDto) {
    return this.helper.getProfile(token);
  }
}
