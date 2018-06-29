import { Injectable } from '@angular/core';
import { HttpService } from 'app/core/services/http.service';
import { ApiUrlService } from 'app/core/services/api-url.service';

@Injectable()
export class PasswordService {
    constructor(
        private httpService: HttpService,
        private api: ApiUrlService
    ) {}

    forgotPassword(passObj) {
        return this.httpService.post<any>(this.api.forgotPassApiUrl, passObj);
    }

    resetPassword(password : string, uuid : string) {
        return this.httpService.post<any>(this.api.resetPassApiUrl, {password : password, activationHash: uuid});
    }
}
