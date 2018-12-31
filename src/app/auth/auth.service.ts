import { AuthData } from './auth-data.model';
import { User } from './user.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth'
import { TrainingService } from '../training/training.service';
@Injectable()
export class AuthService {
    authChange = new Subject<boolean>();
    isAuthentication = false;
    constructor(private router: Router, private afAuth: AngularFireAuth, private trainingService: TrainingService) { }
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
        this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password);
    }
    loginUser(authData: AuthData) {
        this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password);
    }
    logoutUser() {
        this.afAuth.auth.signOut();
    }



    isAuth() {
        return this.isAuthentication
    }

}