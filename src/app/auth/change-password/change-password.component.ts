import { AuthService } from './../auth.service';
import { ChangePasswordRequest } from './../../api/model/changePasswordRequest';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  @ViewChild('f') changePasswordForm: NgForm;
  private redirectTo: string;

  private readonly confirmPasswordControlName = 'confirmPassword';
  private params: Params;

  constructor(private autService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => this.params = params);
  }

  confirmPasswordMatching(): void {
    if (this.changePasswordForm.value.newPassword !== this.changePasswordForm.value.confirmPassword) {
      this.changePasswordForm.form.controls[this.confirmPasswordControlName].setErrors({ mismatch: true });
    } else {
      this.changePasswordForm.form.controls[this.confirmPasswordControlName].setErrors(null);
    }
  }

  changePassword(): void {
    const changePasswordRequest = this.changePasswordForm.value as ChangePasswordRequest;
    this.autService.changePassword(changePasswordRequest)
      .subscribe(response => {
        this.router.navigate(['/auth', 'login'], { queryParams: this.params });
        sessionStorage.removeItem('temp_token');
      }, error => {
        this.messageService.add({
          severity: 'error', summary: 'error',
          detail: error.error
        });
      });
  }
}
