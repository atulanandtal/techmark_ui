import { Injectable } from '@angular/core';
import { HttpService } from '../../core/services/http.service';
import { ApiUrlService } from '../../core/services/api-url.service';

@Injectable()
export class LoginService {
    constructor(
        private http: HttpService,
        private api: ApiUrlService
    ) {}

    login(username: string, password: string) {
        // return this.http.post('/api/authenticate', JSON.stringify({ username: username, password: password }))
        return this.http.post<any>(this.api.loginApiUrl, {username : username, password : password});
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}
