import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { ApiAuthClientService } from "../services/apiAuth/api-auth-client.service";


@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate{
    constructor(
        private router: Router,
        private apiAuthClientService: ApiAuthClientService
    ){}

    canActivate(route: ActivatedRouteSnapshot){
        const user = this.apiAuthClientService.userData;
        console.log(user);
        if(user){
            return true;
        }
        this.router.navigate(['./login']);
        return false;
    }
}