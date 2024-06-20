import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserCredentials } from 'src/app/constants/user-credentials/user-credentials.const';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  userName: string = '';
  password: string = '';

  constructor(private router: Router) {}

  ngOnInit() {}

  doLogin(): void {
    if (
      this.userName === UserCredentials.userName &&
      this.password === UserCredentials.password
    ) {
      console.log('Success');
      this.router.navigateByUrl('dash-board');
    } else {
      alert('Invalid credentials');
    }
  }
}
