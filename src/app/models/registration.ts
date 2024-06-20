export class Application {
  id: number = 0;
  name: string = '';
  mobileNumber: number = 0;
  emailAddress: string = '';
  gender: number = 0;
  applicationAmount: number = 0;
  uploadedImage: File | null = null;
  uploadedMarksCard: File | null = null;

  constructor(
    data: any,
    uploadedImage: File | null,
    uploadedMarksCard: File | null
  ) {
    if (!data) {
      return;
    }

    this.id = data.id;
    this.name = data.name;
    this.mobileNumber = data.mobileNumber;
    this.emailAddress = data.emailAddress;
    this.gender = data.gender;
    this.applicationAmount = data.applicationAmount;
    this.uploadedImage = uploadedImage;
    this.uploadedMarksCard = uploadedMarksCard;
  }
}
