import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { Injectable } from '@nestjs/common'
import { UserService } from '../modules/user/user.service'

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    private async comparePassword(password: string, hashPassword: string) {
        const compare = await bcrypt.compare(password, hashPassword)

        return compare
    }

    async generateToken(user: any) {
        const emailNormalized = user.email.toLowerCase().trim()

        const payload = {
            email: emailNormalized,
            userId: user.id,
        }

        return {
            accessToken: this.jwtService.sign(payload, {
                expiresIn: '1d',
            }),
        }
    }

    async signIn(email: string, password: string) {
        const normalizedEmail = email.toLowerCase().trim()
        const user = await this.userService.getByEmail(normalizedEmail)

        if (!user) {
            throw new Error('User not exists!')
        }

        const { password: hashedPassword } = user

        const passwordValidate = await this.comparePassword(
            password,
            hashedPassword
        )

        if (!passwordValidate) {
            throw new Error('Password incorrect!')
        }

        const { accessToken } = await this.generateToken(user)

        return {
            accessToken,
            user,
        }
    }
}
