import { Request, response, Response } from "express";
import { Url } from '../../../shared/models/url/Url';
import { IUrlServiceHttpClient } from "../../../shared/interfaces/url/IUrlServiceHttpClient";
import { Token } from "../../../shared/models/authenticate/index"

export class UrlService { 

    urlHttpClient: IUrlServiceHttpClient;

    constructor(urlServiceHttpClient: IUrlServiceHttpClient){
        this.urlHttpClient = urlServiceHttpClient;
    }

    async Get(shortUrl: number, userToken: Token): Promise<Url> {

        if (!this.validate(shortUrl)) {
            return new Promise((res, rej) => {
                rej("Url is not valid");
            })
        }
        return await this.urlHttpClient.Get(shortUrl, { ...userToken });    
    }

    private validate(shortUrl: number): boolean {
        if (isNaN(shortUrl) && shortUrl > 0) {
            return false;
        } else {
            return true;
        }
    }
}
