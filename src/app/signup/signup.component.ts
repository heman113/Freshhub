import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export function passwordMatchValidator(): ValidatorFn{
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    if(password && confirmPassword && password!==confirmPassword){
      return{
        passwordDontMatch: true
      }
    }
    return null;
  }
}
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public form: FormGroup;

  get usernameControl() {
    return this.form.get('username') as FormControl;
  }
  get passwordControl() {
    return this.form.get('password') as FormControl;
  }
  get confirmPasswordControl() {
    return this.form.get('confirmPassword') as FormControl;
  }
  get emailControl() {
    return this.form.get('email') as FormControl;
  }
  constructor(private fb: FormBuilder, private auth: AuthService, private snackbar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.generateForm();
  }

  generateForm() {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['',[Validators.required,Validators.minLength(6)]]
    },
    {Validators: passwordMatchValidator});
  }

  onSubmit() {
    this.auth.signUp(
      this.emailControl.value,
      this.passwordControl.value,
      this.usernameControl.value
    ).then(
      () => {
        this.router.navigate(['/']);
      })
      .catch(
        (err) => {
          this.snackbar.open('There was a problem while trying to sign up a new user');
        });
  }

}
