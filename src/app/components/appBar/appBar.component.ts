import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../auth.service';


@Component({
  selector: 'app-bar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './appBar.component.html',
  styleUrl: './appBar.component.css'
})
export class AppBarComponent {
  constructor(private authService: AuthService, private renderer: Renderer2, private router: Router) { }
  ngOnInit() {

  }



  logout() {
    localStorage.setItem('LOGIN', 'false')
    this.authService.logout();
    this.router.navigate(['login']);
  }
  navbarOpen = false;
  navItems = [
    { name: 'Company', icon: 'fas fa-tachometer-alt', route: '/company' },
    { name: 'Courses', icon: 'far fa-address-book', route: '/courses' },
    { name: 'Wishlist', icon: 'far fa-address-book', route: '/wish-list' },
    { name: 'Cart Details', icon: 'far fa-address-book', route: '/cart-details' },
  ];


  navigate(item: any): any {
    this.router.navigate([item]);
  }

}


