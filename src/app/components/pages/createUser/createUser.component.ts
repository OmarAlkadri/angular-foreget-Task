import { Component } from '@angular/core';
import { LoginComponent } from '../../login/login.component'
import { ActivatedRoute, Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, FormGroup, FormGroupDirective, FormsModule, NgForm, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ApiService } from '../../../api.service';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [
    MatButtonModule, MatTooltipModule,
    MatInputModule, MatIconModule,
    MatSelectModule, MatCardModule,
    MatFormFieldModule, CommonModule, MatGridListModule,
    FormsModule, ReactiveFormsModule,],
  templateUrl: './createUser.component.html',
  styleUrl: './createUser.component.css'
})
export class createUser {
  shipmentForm: any
  hide = true;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) {
    this.shipmentForm = new FormGroup({
      nameControl: new FormControl(''),
      emailControl: new FormControl('', [Validators.required, Validators.email]),
      passControl: new FormControl(''),
    });
  }

  ngOnInit(): void {

  }

  getFormItem(value: any) {
    return this.shipmentForm.get(value);
  }



  onSave() {
    if (this.shipmentForm.valid) {
      const userItems: any = {
        Name: this.shipmentForm.value.nameControl,
        Email: this.shipmentForm.value.emailControl,
        UserName: this.shipmentForm.value.emailControl,
        Password: this.shipmentForm.value.passControl
      }
      this.apiService.addUser(userItems).subscribe(data => {
        this.router.navigate(['login'])
      })
    } else {
      this.shipmentForm.markAllAsTouched();
    }
  }
  onCancel() {
    this.shipmentForm.reset();
  }



}

