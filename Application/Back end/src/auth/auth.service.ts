import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { AuthSignUpUserDto } from './dto/auth-sign-up-user.dto';
import { User } from 'src/user/user.entity';
import { AuthSignInUserDto } from './dto/auth-sign-in-user.dto';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {

    constructor(private userService: UserService, private jwtService: JwtService) { }

    async signUp(signUpDto: AuthSignUpUserDto): Promise<any> {

        let user = await this.userService.findOneByEmail(signUpDto.email);
        if (user == null) {
            user = new User();
            user.email = signUpDto.email;
            user.type = signUpDto.type;

            await user.setPassword(signUpDto.password);

            await this.userService.create(user);
            return this.signToken(user.id, user.email);
        }
        else {
            throw new NotFoundException();
        }    
    }

    async signIn(signInDto: AuthSignInUserDto): Promise<any> {
        const user = await this.userService.findOneByEmail(signInDto.email);

        if(user == null) {
            throw new NotFoundException();
        }
        
        const isPasswordValid = await user.comparePassword(signInDto.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException();
        }
        return this.signToken(user.id, user.email);
    }

    async signToken(id: number, email: string): Promise<{access_token : string}> {
        const payload = { email: email, sub: id };
        const token = await this.jwtService.signAsync(payload, { expiresIn: '1h', secret: jwtConstants.secret });
        return {
            access_token: token
        };
    }
}
