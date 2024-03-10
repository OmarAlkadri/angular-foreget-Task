import { Component } from '@angular/core';
import { LoginComponent } from '../../login/login.component'
import { ActivatedRoute, Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, FormGroup, FormGroupDirective, FormsModule, NgForm, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { CountriesCities, Currency, Incoterms, Mode, MovementType, PackageType, SecondUnit, UnitFirst } from '../../../utlis/types';
import { ApiService } from '../../../api.service';
import { catchError, map } from 'rxjs';
import { ShipmentModel } from '../../../utlis/ShipmentModel';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-mode-adding',
  standalone: true,
  imports: [
    MatButtonModule, MatTooltipModule,
    MatInputModule, MatIconModule,
    MatSelectModule, MatCardModule,
    MatFormFieldModule, CommonModule, MatGridListModule,
    FormsModule, ReactiveFormsModule,],
  templateUrl: './unitFirstsAdding.component.html',
  styleUrl: './unitFirstsAdding.component.css'
})
export class UnitFirstsAdding {
  [x: string]: any;
  currentRoute: string | undefined;
  nameControl: any

  data: any
  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url; // Store the current route URL
      }
    });
    const navigation: any = this.router.getCurrentNavigation();

    this.data = navigation?.extras?.state ?? null

    this.nameControl = new FormControl(this.data?.name ?? '')

  }



  ngOnInit(): void {
  }

  onSave() {
    console.log(this.nameControl.valid)
    console.log(this.nameControl.value)
    if (this.nameControl.valid) {
      const shipmentItems: any = {
        name: this.nameControl.value,
      }
      if (!this.data) {
        this.apiService.addServices(shipmentItems, "UnitFirsts").subscribe(data => {
          console.log(data)
        })
      }
      else {
        shipmentItems.id = this.data.id,
          this.apiService.updateServices(shipmentItems, this.data.id, 'UnitFirsts').subscribe({
            next: data => {
              // Handle successful response
            },
            error: error => {
              // Handle error response
              console.error('Failed to update shipment', error);
            }
          });
      }
      setTimeout(() => { this.router.navigate(['home/unitfirst-list']) }, 1000)
    } else {
      this.nameControl.markAllAsTouched();
    }
  }
  onCancel() {
    this.nameControl.reset();
    this.data = null
  }
}

