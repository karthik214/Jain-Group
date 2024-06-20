import { Injectable } from '@angular/core';
import { Application } from '../models/registration';

@Injectable({
  providedIn: 'root',
})
export class UserApplicationService {
  userApplications: Application[] = [];
  constructor() {
    const userApplicationList = localStorage.getItem('userApplication');
    if (userApplicationList?.length) {
      this.userApplications = JSON.parse(userApplicationList);
    }
  }

  saveUserData(userApplication: Application) {
    const appIdx = this.userApplications.findIndex(
      (application) => application.id === userApplication.id
    );
    if (appIdx !== -1) {
      this.userApplications[appIdx] = userApplication;
    } else {
      this.userApplications.push(userApplication);
    }
    localStorage.setItem(
      'userApplication',
      JSON.stringify(this.userApplications)
    );
  }

  getSelectedUserData(id: number): Application {
    let selectedApplication: Application;
    const appIdx = this.userApplications.findIndex(
      (application) => application.id === Number(id)
    );
    if (appIdx !== -1) {
      selectedApplication = this.userApplications[appIdx];
      return selectedApplication;
    } else {
      return new Application(null, null, null);
    }
  }

  deleteData(id: number) {
    const regIdx = this.userApplications.findIndex(
      (application) => application.id === id
    );

    if (regIdx !== -1) {
      this.userApplications.splice(regIdx, 1);
    }

    localStorage.setItem(
      'userApplication',
      JSON.stringify(this.userApplications)
    );
  }

  getUserData(): Application[] {
    return this.userApplications;
  }
}
