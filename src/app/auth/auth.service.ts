import { AuthData } from './auth-data.model';
import { Subject, Subscription } from 'rxjs';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth'
import { TrainingService } from '../training/training.service';
import { MatSnackBar } from '@angular/material';
import { UiService } from '../share/ui.service';
@Injectable()
export class AuthService implements OnDestroy {

    authChange = new Subject<boolean>();
    isAuthentication = false;
    authSubscription: Subscription;
    constructor(private router: Router, private afAuth: AngularFireAuth, private trainingService: TrainingService, private snackBar: MatSnackBar, private uiService: UiService) { }
    initAuthLisiner() {
        this.authSubscription = this.afAuth.authState.subscribe(user => {
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
        this.uiService.loadingSpining.next(true);
        this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password).then(massage =>{
            // console.log(massage);
            this.uiService.loadingSpining.next(false);
        }).catch(error => {
            // console.log(error);
            this.uiService.loadingSpining.next(false);
            this.uiService.openSnackbar(error.message,null,2000);
        });
    }
    loginUser(authData: AuthData) {
        this.uiService.loadingSpining.next(true);
        this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password).then(massage => {
            // console.log(massage);  
            this.uiService.loadingSpining.next(false);
        }).catch(error => {
            this.uiService.loadingSpining.next(false);
            this.uiService.openSnackbar(error.message,null,2000);
        });
    }
    logoutUser() {
        this.afAuth.auth.signOut();
    }



    isAuth() {
        return this.isAuthentication
    }
    ngOnDestroy(){
        if(this.authSubscription){
            this.authSubscription.unsubscribe();
        }
    }

}