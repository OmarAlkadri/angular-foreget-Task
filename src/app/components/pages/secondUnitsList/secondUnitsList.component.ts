import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppBarComponent } from '../../appBar/appBar.component';

import { LoginComponent } from '../../login/login.component'
import { ActivatedRoute, Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { ContextMenuItem, EditSettingsModel, ToolbarItems } from '@syncfusion/ej2-angular-grids';
import { GridModule, EditService, ToolbarService, SortService, PageService } from '@syncfusion/ej2-angular-grids';
import { DatePickerAllModule } from '@syncfusion/ej2-angular-calendars';
import { TimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';
import { AutoCompleteModule } from '@syncfusion/ej2-angular-dropdowns';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ApiService } from '../../../api.service';
import { HttpClientModule } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { SpinnerComponent } from "../../Loader/spinner/spinner.component";
import { LoaderService } from '../../Loader/loader.service';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-mode-list',
  standalone: true,
  providers: [EditService, ToolbarService, SortService, PageService],
  templateUrl: './secondUnitsList.component.html',
  styleUrl: './secondUnitsList.component.css',
  imports: [
    MatSelectModule, MatCardModule, ReactiveFormsModule,
    MatGridListModule,
    CommonModule,
    GridModule,
    DatePickerAllModule,
    TimePickerModule,
    FormsModule,
    TextBoxModule,
    MultiSelectModule,
    AutoCompleteModule,
    CheckBoxModule,
    HttpClientModule,
    DropDownListModule, MatToolbarModule, MatButtonModule, MatIconModule,
    SpinnerComponent
  ]
})
export class SecondUnitsList implements OnInit, OnDestroy {
  data: any[] = [];
  public editSettings?: EditSettingsModel;
  public toolbar?: ToolbarItems[];
  public orderIDRules?: Object;
  public customerIDRules?: Object;
  public freightRules?: Object;
  public shipCountryRules?: Object;
  public verifiedRules?: Object;
  public dateRules?: Object;
  private modesSub?: Subscription;

  constructor(private loader: LoaderService, private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.modesSub = this.apiService.getServicess('SecondUnits').subscribe(data => {
      this.data = data
    });
    this.editSettings = {
      allowEditing: false,
      allowAdding: true,
      allowDeleting: false,
      mode: 'Batch',
    };
    this.toolbar = ['Add'];
    this.customerIDRules = { required: true };
    this.shipCountryRules = { required: true };
    this.verifiedRules = { required: true };
    this.orderIDRules = { required: true };
    this.dateRules = { required: true };
    this.freightRules = { required: true, min: 1, max: 1000 };
  }

  ngOnDestroy(): void {
    this.modesSub?.unsubscribe();
  }

  clickHandler = (args: any) => {
    if (args.item.properties.text === 'Add') {
      this.router.navigate(['home/secondunit-adding']);
    }
  }

  EditItem(data: any) {
    const tempData = data
    delete tempData.column
    delete tempData.index
    delete tempData.foreignKeyData

    this.router.navigate(['home/secondunit-adding'], {
      state: {
        ...tempData
      }
    });
  }

  deleteItem(Id: any) {
    console.log(Id)
    this.loader.showLoader();
    this.apiService.dalateServices(Id, 'SecondUnits').subscribe({
      next: data => {
        window.location.reload();
        // Handle successful response
      },
      error: error => {
        // Handle error response
        console.error('Failed to update mode', error);
      }
    });
    this.loader.hideLoader();
  }

  contextMenuItems: ContextMenuItem[] = [
    'AutoFit',
    'AutoFitAll',
    'SortAscending',
    'SortDescending',
    'ExcelExport',
    'CsvExport',
    'FirstPage',
    'PrevPage',
    'LastPage',
    'NextPage',
  ]

  pageOptions = {
    currentPage: 1,
    pageSize: 12,
    pageCount: 1,
    pageSizes: true
  };
}