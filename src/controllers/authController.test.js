import 'dotenv/config'
import AuthController from './authController';
import bcrypt from 'bcrypt';


describe('authController', () => {
  describe('login()', () => {
    
    const getUser = () => ({
      findOne: jest.fn()
    })
    
    const getRes = () => {
      const res = {
        status: jest.fn().mockImplementation(() => res),
        send: jest.fn().mockImplementation(() => res)
      };
      return res
    };
    
    it('should status return 422 on wrong login', async () => {
      const req = {
        body: {
          data: {
            login: null,
            password: null
          }
        }
      };
      
      const User = getUser()
      const res = getRes()
      
      User.findOne.mockReturnValue(null)
      const authController = new AuthController({User});
      await authController.login(req, res);
      expect(res.send).toBeCalledTimes(1);
      expect(res.status).toBeCalledWith(422);
    });
    
    it('should status 422 on wrong password', async () => {
      const req = {
        body: {
          data: {
            login: 'login',
            password: 'wrongPassword'
          }
        }
      };
  
      const User = getUser()
      const res = getRes()
  
      User.findOne.mockReturnValue({
        login: 'login',
        password: 'password'
      })
      const authController = new AuthController({User});
      await authController.login(req, res)
      expect(res.send).toBeCalledTimes(1)
      expect(res.status).toBeCalledWith(422)
    });
  
  
    it('should return jwt in the body', async () => {
      const req = {
        body: {
          data: {
            login: 'login',
            password: 'password'
          }
        }
      };
  
      const User = getUser()
      const res = getRes()
  
      User.findOne.mockReturnValue({
        login: 'login',
        password: await bcrypt.hashSync('password', Number(process.env.SALT_ROUNDS))
      })
      const authController = new AuthController({User});
      await authController.login(req, res)
      expect(res.send).toBeCalledTimes(1)
      expect(res.status).toBeCalledTimes(0)
      expect(typeof res.send.mock.calls[0][0].token).toBe('string')
    });
  });
});
