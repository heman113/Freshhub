import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { from, Observable, switchMap } from 'rxjs';
import { updateSourceFile } from 'typescript';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User|null>;
  
  constructor(private afAuth:AngularFireAuth,private route:ActivatedRoute,public router: Router) {
    this.user$ = afAuth.authState;
    this.afAuth.authState.subscribe(userResponse => {
      if (userResponse) {
        localStorage.setItem('user', JSON.stringify(userResponse));
      } else {
        localStorage.setItem('user', '{}');
      }
    })
   }

  login(){
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl',returnUrl);
    this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((success) => {
      this.router.navigateByUrl(returnUrl);
    });;
  }

  logout(){
    this.afAuth.signOut();
    this.router.navigate(['/']);
  }

  async loginUser(email: string, password: string) {
    return await this.afAuth.signInWithEmailAndPassword(email, password);
  }

  isUserLoggedIn() {
    return JSON.parse(localStorage.getItem('user')!);
  }

  signUp(email: string, password: string, username: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password).then((result)=>{
      result.user?.updateProfile({displayName:username})
    })
  }
}
