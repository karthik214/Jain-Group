import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Application } from 'src/app/models/registration';
import { UserApplicationService } from 'src/app/service/user-application.service';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.page.html',
  styleUrls: ['./dash-board.page.scss'],
})
export class DashBoardPage implements OnInit {
  userApplications: Application[] = [];

  constructor(
    private userApplicationService: UserApplicationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userApplications = this.userApplicationService.getUserData();
  }

  deleteSelectedApplication(id: number) {
    this.userApplicationService.deleteData(id);
  }

  editApplicationData(id: number) {
    this.router.navigate(['registration'], {
      queryParams: {
        id,
      },
    });
  }

  gotRegistrationPage(): void {
    this.router.navigateByUrl('registration');
  }
}
