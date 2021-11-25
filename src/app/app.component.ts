import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models/user';
import { ApiAuthClientService } from './services/apiAuth/api-auth-client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Athanasia';
  user!: User;

  constructor(
    public apiAuthClientService: ApiAuthClientService,
    private router: Router
  ){
    this.apiAuthClientService.us.subscribe(res => {
      this.user = res;
      console.log(res);
    });
  }

  logout(){
    this.apiAuthClientService.logout();
    this.router.navigate(['/login']);
  }
}
