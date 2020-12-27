import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { ResetPasswordRequest } from 'src/app/api/model/resetPasswordRequest';
import { VerifyForgetPasswordRequest } from 'src/app/api/model/VerifyForgetPasswordRequest';
import { AuthResourceService } from 'src/app/api/service/authResource.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  smsSended = false;
  smsResended = false;
  codeVerified = false;
  passwordChanged = false;
  mobileNumber: string;
  verificationCode: string;
  password: string;
  passwordConfirmation: string;

  mobilePattern = "^(\\+2)?(002)?((010|011|012|015)[0-9]{8})$";
  passwordPattern = "^.{4,20}$";

  @ViewChild('mobileForm') mobileForm: NgForm;
  @ViewChild('stepper') stepper: MatStepper;

  constructor(private authService: AuthResourceService) { }

  ngOnInit() {
  }

  resendVerificationSms() {
      this.authService.forgetPassword(this.mobileNumber).subscribe(results => {
        this.smsResended = true;
      });
  }

  sendVerificationSms() {
    if (this.mobileForm.valid) {
      this.authService.forgetPassword(this.mobileNumber).subscribe(results => {
        this.stepper.selected.completed = true;
        this.smsSended = true;
        this.stepper.next();
      });
    }
  }

  verifyCode() {
    this.smsResended = false;
    const verifyForgetPasswordRequest = <VerifyForgetPasswordRequest>{};
    verifyForgetPasswordRequest.userIdentifier = this.mobileNumber;
    verifyForgetPasswordRequest.forgetPasswordToken = this.verificationCode;
    this.authService.verifyResetPassword(verifyForgetPasswordRequest)
      .subscribe(results => {
        this.stepper.selected.completed = true;
        this.codeVerified = true;
        this.stepper.next();
      });
  }

  resetPassword() {
    const resetPasswordRequest = <ResetPasswordRequest>{};
    resetPasswordRequest.userIdentifier = this.mobileNumber;
    resetPasswordRequest.forgetPasswordToken = this.verificationCode;
    resetPasswordRequest.newPassword = this.password;
    this.authService.resetPassword(resetPasswordRequest)
      .subscribe(results => {
        this.stepper.selected.completed = true;
        this.passwordChanged = true;
        this.stepper.next();
      });
  }

  backToStepOne() {
    this.stepper.reset();
  }
  
}
