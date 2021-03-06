import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/shared';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  faEnvelope,
  faEyeSlash,
  faEye
} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  faIcons = {
    email: faEnvelope,
    visibility: faEye,
    visibility_off: faEyeSlash
  };
  hidePassword = true;
  constructor(public authService: AuthService) {
    this.authService.$user.subscribe(usr => {
      if (usr) {
        this.authService.navigate('profile');
      }
    });
  }

  ngOnInit() {
    this.loginFormInstance();
  }
  submitloginForm(value, valid: boolean) {
    if (valid) {
      this.loginForm.disable();
      this.authService.login(value.email, value.pw1);
      this.loginForm.enable();
    }
  }
  loginFormInstance() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(150),
        Validators.email
      ]),
      pw1: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(100)
      ])
    });
  }
  getErrorMessage(form: FormGroup, fieldName: string) {
    const formField = form.get(fieldName);
    return formField.hasError('required')
      ? 'ERRORS.field_blank'
      : formField.hasError('email')
      ? 'ERRORS.email_valid'
      : formField.hasError('minlength')
      ? 'ERRORS.minlength'
      : formField.hasError('maxlength')
      ? 'ERRORS.maxlength'
      : '';
  }
}
