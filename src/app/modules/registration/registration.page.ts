import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Application } from 'src/app/models/registration';
import { UserApplicationService } from 'src/app/service/user-application.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  registerForm: FormGroup;
  applicationData: Application = new Application(null, null, null);
  uploadedImage: File | null = null;
  uploadedMarksCard: File | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private userApplicationService: UserApplicationService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {
    this.registerForm = this.formBuilder.group({
      name: [''],
      mobileNumber: [Validators.required, Validators.maxLength(10)],
      emailAddress: [''],
      gender: [''],
      applicationAmount: [''],
      uploadedImage: null,
      uploadedMarksCard: null,
    });
    this.activateRoute.queryParams.subscribe((queryParams: any) => {
      if (queryParams && queryParams?.id) {
        this.applicationData = this.userApplicationService.getSelectedUserData(
          queryParams.id
        );
        if (this.applicationData) {
          this.prefilRegistrationField();
        }
      }
    });
  }

  ngOnInit() {}

  prefilRegistrationField(): void {
    console.log(this.applicationData);
    this.registerForm.patchValue({
      name: this.applicationData.name,
      mobileNumber: this.applicationData.mobileNumber,
      emailAddress: this.applicationData.emailAddress,
      gender: this.applicationData.gender,
      applicationAmount: this.applicationData.applicationAmount,
      uploadedImage: this.applicationData.uploadedImage?.name,
      uploadedMarksCard: this.applicationData.uploadedMarksCard?.name,
    });
  }

  get registrationFormControl() {
    return this.registerForm.controls;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    console.log(input);
    if (
      input.files &&
      input.files.length > 0 &&
      (input.files[0].type === 'image/png' ||
        input.files[0].type === 'image/jpeg' ||
        input.files[0].type === 'application/pdf')
    ) {
      if (input.files[0].type === 'application/pdf') {
        this.uploadedMarksCard = input.files[0];
      } else {
        this.uploadedImage = input.files[0];
      }
    } else {
      alert('Uploaded file should be of the format jpeg, png or pdf');
    }
  }

  submitRegistrationForm() {
    if (this.registerForm.valid) {
      let userData: Application = {
        id: this.applicationData?.id ? this.applicationData.id : Math.random(),
        name: this.registrationFormControl['name']?.value,
        mobileNumber: this.registrationFormControl['mobileNumber']?.value,
        emailAddress: this.registrationFormControl['emailAddress']?.value,
        gender: this.registrationFormControl['gender']?.value,
        applicationAmount:
          this.registrationFormControl['applicationAmount']?.value,
        uploadedImage: this.uploadedImage || null,
        uploadedMarksCard: this.uploadedMarksCard || null,
      };
      this.userApplicationService.saveUserData(userData);
      this.clearFields();
      this.router.navigateByUrl('dash-board');
    }
  }

  clearFields(): void {
    this.registerForm.patchValue({
      name: [''],
      mobileNumbe: [''],
      emailAddress: [''],
      gender: [''],
      applicationAmount: [''],
      imageUpload: [''],
      reportUpload: [''],
    });
  }
}
