import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private auth: AuthService, private router: Router, private formBuilder: FormBuilder,private route: ActivatedRoute, public snackbar: MatSnackBar) {
    this.loginForm = this.formBuilder.group({
      email: ["",[Validators.required,Validators.email]],
      password: ["",Validators.required]
    })
  }
  get email() {return this.loginForm.get("email");}
  get password() {return this.loginForm.get("password");}

  
  
  login(){
    this.auth.login();
  }

  ngOnInit(): void {
  }


  loginUser() {
    if(!this.loginForm.valid){
      return;
    }
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl',returnUrl);
    const {email,password} = this.loginForm.value;
    this.auth.loginUser(email,password).then((success) => {
      this.router.navigateByUrl(returnUrl);
    }).catch(err=>{
      this.snackbar.open('Login failed');
      
    });
  }

}
