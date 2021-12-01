import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { ApiAuthClientService } from 'src/app/services/apiAuth/api-auth-client.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  user!: User;

  constructor(
    public apiAuthClientService: ApiAuthClientService,
  ){
    this.apiAuthClientService.us.subscribe(res => {
      this.user = res;
    });
  }

  ngOnInit(): void {
  }

}
