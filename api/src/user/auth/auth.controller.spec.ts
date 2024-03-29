import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;

  const mockAuthService = {
    register: jest.fn((dto) => {
      return {
        id: Date.now(),
        ...dto,
      }
    })
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService]
    }).overrideProvider(AuthService).useValue(mockAuthService).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createUser', () => {
    it('create a new user with', async () => {
      expect(await controller.register(
        {
          name: 'Que', last_name: 'Pena', password: '12345',
          email: 'quepena@gmail.com', photo: '/profile.png', isAdmin: false
        })).toEqual({
          id: expect.any(Number), name: 'Que', last_name: 'Pena', password: '12345',
          email: 'quepena@gmail.com', photo: '/profile.png', isAdmin: false
        });
    });
  });
});
