import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // tslint:disable-next-line:variable-name
  private _isAuth = false;
  private _userId = null;
  isAuthChanged = new Subject<boolean>();

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
  ) { }
  initializeAuthState(){
    this.afAuth.authState.subscribe((userData) => {
      if (userData){
        this._isAuth = true;
        this._userId = userData.uid;
        localStorage.setItem('userId', this._userId);
        this.isAuthChanged.next(true);
      } else {
        this._isAuth = false;
        localStorage.setItem('userId', null);
        this.isAuthChanged.next(false);
      }
    });
  }
  getCurrentUserId(): string {
    return this._isAuth ? this._userId : null;
  }

  signUp(email: string, password: string) {
    this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((data) => {
        // console.log(data);
        this.router.navigate(['/login']);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  signin(email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then((data) => {
        // console.log(data);
        this.router.navigate(['cars/list']);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  logout(){
    this.afAuth.signOut()
      .then(r => {
        this.router.navigate(['/']);
        // Sign-out successful.
      });
  }
}
