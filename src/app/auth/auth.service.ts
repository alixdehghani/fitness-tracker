import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth'
import { TrainingService } from '../training/training.service';
import { MatSnackBar } from '@angular/material';
@Injectable()
export class AuthService {
    authChange = new Subject<boolean>();
    isAuthentication = false;
    constructor(private router: Router, private afAuth: AngularFireAuth, private trainingService: TrainingService, private snackBar: MatSnackBar) { }
    initAuthLisiner() {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.isAuthentication = true;
                this.authChange.next(true);
                this.router.navigate(['/training']);
            } else {
                this.trainingService.canselSubscriptions();
                this.authChange.next(false);
                this.isAuthentication = false;
                this.router.navigate(['/login']);
            }
        });
    }
    registerUser(authData: AuthData) {
        this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password).then(massage =>{
            // console.log(massage);
            
        }).catch(error => {
            // console.log(error);
            this.snackBar.open(error.message, null, {
                duration: 2000,
              });
        });
    }
    loginUser(authData: AuthData) {
        this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password).then(massage => {
            console.log(massage);  
        }).catch(error => {
            this.snackBar.open(error.message, null, {
                duration: 2000,
              });
        });
    }
    logoutUser() {
        this.afAuth.auth.signOut();
    }



    isAuth() {
        return this.isAuthentication
    }

}