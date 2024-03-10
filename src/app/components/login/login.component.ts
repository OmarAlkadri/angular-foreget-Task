import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { ApiService } from '../../api.service';
import { Store } from '@ngrx/store';
import * as LoginActions from '../../ngrx/logIn/index.actions';
import { LogInState } from '../../ngrx/logIn/index.reducer';
import { catchError, map, of } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  data: any;

  constructor(private store: Store, private apiService: ApiService, private authService: AuthService, private router: Router) { }

  createAccount() {
    this.router.navigate(['/create-user']);
  }

  login() {
    const data = { UserName: this.username, Password: this.password }


    this.authService.login().subscribe(() => {
      try {
        this.apiService.logIn(data.UserName, data.Password).subscribe(data => {
        localStorage.setItem('LOGIN', 'true')

          if (data.token)
            this.router.navigate(['home/shipment-list']);
        })
      } catch (error) {
        console.log(error)
      }
    });

    // this.store.dispatch(LoginActions.logIn(data));
    /* const result = this.apiService.logIn(this.username, this.password).subscribe(data => {
       this.data = data
     });
 
     if (this.data) {
       this.store.dispatch(logIn());
       localStorage.setItem('token', this.data.token); // Store the token
       alert('Login Successful');
       this.router.navigate(['/profile1']);
     } else {
       this.errorMessage = 'Invalid credentials';
       // Handle login failure
     }*/
  }
}
