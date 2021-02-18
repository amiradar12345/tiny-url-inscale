import {Request, Response} from "express"   
import { Credentials , UserMetadata} from '../../../shared/models/common/index'
import { UserServiceHttpClient } from '../../../shared/modules/userServiceHttpClient/src/client'
import { User } from '../../../shared/models/user/index'
import { Token } from "../../../shared/models/authenticate/index"
import * as bcrypt from "bcrypt"
import * as jwt from 'jsonwebtoken' 

export class AuthService {

    userHttpClient: UserServiceHttpClient;

    constructor(userServiceHttpClient: UserServiceHttpClient){
        this.userHttpClient = userServiceHttpClient;
    }


    async signUp (credentials: Credentials, userMetadata: UserMetadata): Promise<void> {   
        
        const encryptedPass = await this.getEncryptPassword(credentials.Password);

        const encriptedCredentials: Credentials = {
            Email: credentials.Email,
            Password: encryptedPass 
        } 

        await this.userHttpClient.Create(encriptedCredentials, userMetadata);
    };

    async logIn (credentials: Credentials): Promise<Token> {
        const user: User = await this.userHttpClient.Get(credentials.Email);
        const { password: userEncryptedPassFromDb, email } = user;
        const isValidPassword = await this.comparePasswords(credentials.Password, userEncryptedPassFromDb);

        if (isValidPassword) {
            return await this.createToken(email);
        } else {
            return new Promise((res, rej) => {
                rej("Password is not valid.");
            });
        }
    };

    private async comparePasswords(originalPassword: string, encryptedPassword: string): Promise<boolean> {
        return await bcrypt.compare(originalPassword, encryptedPassword);
    }
            
    private async getEncryptPassword(userPassword: string): Promise<string>{
        const salt = await bcrypt.genSalt(); 
        return await bcrypt.hash(userPassword, salt);
    }

    private createToken(email: string): Token{
        console.log("Authenticate-Module: generate new user Token");
        const value: string = jwt.sign({email: email}, process.env.ACCESS_TOKEN_SECRET );
        return new Token (value);        
    }

}    


