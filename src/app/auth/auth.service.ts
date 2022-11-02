import {AuthData} from "./auth-data.model";
import {Subject} from "rxjs";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {TrainingService} from "../training/training.service";
import {UiService} from "../shared/ui.service";

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>()
  private isAuthenticated: boolean = false;

  constructor(private router: Router,
              private afAuth: AngularFireAuth,
              private trainingService: TrainingService,
              private uiService: UiService) {
  }

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training'])
      } else {
        this.trainingService.cancelSubscriptions();
        this.authChange.next(false);
        this.router.navigate(['/login'])
        this.isAuthenticated = false;
      }
    })
  }

  registerUser(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true);
    this.afAuth.createUserWithEmailAndPassword(
      authData.email,
      authData.password
    ).then(result => {
      console.log(result);
      this.uiService.loadingStateChanged.next(false);
      //this.authSuccessfully();
    }).catch(error => {
      this.uiService.loadingStateChanged.next(false);
      this.uiService.showSnackbar(error.message, null, 3000)
      //this.snackbar.open(error.message, null, {
      // horizontalPosition: 'end',
      // verticalPosition: 'top',
      // duration: 3000
      // });
    });
  }

  login(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true);
    this.afAuth.signInWithEmailAndPassword(authData.email, authData.password
    ).then(result => {
      console.log(result);
      this.uiService.loadingStateChanged.next(false);
      //this.authSuccessfully();
    }).catch(error => {
      this.uiService.loadingStateChanged.next(false);
      this.uiService.showSnackbar(error.message, null, 3000)

      //this.snackbar.open(error.message, null, {
      //  horizontalPosition: 'end',
      // verticalPosition: 'top',
      // duration: 3000
      // });
    });
  }

  logout() {
    this.afAuth.signOut();
    //this.trainingService.cancelSubscriptions();
    //this.authChange.next(false);
    //this.router.navigate(['/login'])
    //this.isAuthenticated = false;
  }

  isAuth() {
    return this.isAuthenticated;
  }

  //private authSuccessfully() {
  //  this.isAuthenticated = true;
  //  this.authChange.next(true);
  //  this.router.navigate(['/training'])
  // }

}
