import { Component } from '@angular/core';
import { LoginComponent } from '../../login/login.component'
import { ActivatedRoute, Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
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

@Component({
  selector: 'app-shipment-adding',
  standalone: true,
  imports: [
    MatButtonModule, MatDividerModule, MatIconModule,
    MatSelectModule, MatCardModule,
    ReactiveFormsModule, CommonModule,
    MatGridListModule],
  templateUrl: './shipmentAdding.component.html',
  styleUrl: './shipmentAdding.component.css'
})
export class shipmentAdding {
  [x: string]: any;
  currentRoute: string | undefined;
  shipmentForm: any
  countriesCities = CountriesCities
  mode: any

  incoterms: any
  movementType: any
  packageType: any
  unitFirst: any
  secondUnit: any
  currency: any


  ngOnInit(): void {

    this.apiService.getModes().subscribe(data => {
      console.log(data)

      return this.mode = data
    });
    this.apiService.getIncoterms().subscribe(data => {
      console.log(data)

      return this.incoterms = data
    });
    this.apiService.getMovementTypes().subscribe(data => {
      console.log(data)

      return this.movementType = data
    });
    this.apiService.getPackageTypes().subscribe(data => {
      console.log(data)

      return this.packageType = data
    });
    this.apiService.getUnitFirsts().subscribe(data => {
      console.log('2', data)

      return this.unitFirst = data
    });
    this.apiService.getSecondUnits().subscribe(data => {
      console.log(data)

      return this.secondUnit = data
    });
    this.apiService.getCurrencies().subscribe(data => {
      console.log('1', data)
      return this.currency = data
    });
  }


  ngOnDestroy(): void {

  }


  data: any
  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url; // Store the current route URL
      }
    });
    const navigation: any = this.router.getCurrentNavigation();

    this.data = navigation?.extras?.state ?? null
    let countriesCities = null
    if (this.data)
      countriesCities = this.data?.country + ':' + this.data?.city
    this.shipmentForm = new FormGroup({
      countriesCitiesControl: new FormControl(countriesCities ?? ''),
      modeControl: new FormControl(this.data?.modeId ?? ''),
      packageTypeControl: new FormControl(this.data?.packageTypeId ?? ''),
      incotermsControl: new FormControl(this.data?.incotermId ?? ''),
      movementTypeControl: new FormControl(this.data?.movementTypeId ?? ''),
      unitFirstControl: new FormControl(this.data?.unitFirstId ?? ''),
      secondUnitControl: new FormControl(this.data?.secondUnitId ?? ''),
      currencyControl: new FormControl(this.data?.currencyId ?? '')
    });
  }



  onSave() {
    if (this.shipmentForm.valid) {

      const tempData: any = { ...this.shipmentForm.value };
      const countriesCitiesArrays = tempData.countriesCitiesControl?.split(':')


      const shipmentItems: any = {
        ModeId: tempData.modeControl,
        MovementTypeId: tempData.movementTypeControl,
        IncotermId: tempData.incotermsControl,
        PackageTypeId: tempData.packageTypeControl,
        UnitFirstId: tempData.unitFirstControl,
        SecondUnitId: tempData.secondUnitControl,
        CurrencyId: tempData.currencyControl,
        Country: countriesCitiesArrays[0],
        City: countriesCitiesArrays[1]
      }

      if (!this.data) {

        this.apiService.addShipments(shipmentItems).subscribe(data => {
          console.log(data)
        })
      }
      else {
        shipmentItems.id = this.data.id,

          this.apiService.updateShipments(shipmentItems, this.data.id).subscribe({
            next: data => {
              // Handle successful response
            },
            error: error => {
              // Handle error response
              console.error('Failed to update shipment', error);
            }
          });
      }
      setTimeout(() => {
        this.router.navigate(['home/shipment-list'])

      }, 1000)

    } else {
      this.shipmentForm.markAllAsTouched();
    }
  }
  onCancel() {
    this.shipmentForm.reset();
    this.data = null
  }
  getFormItem(value: any) {
    return this.shipmentForm.get(value);
  }
}

