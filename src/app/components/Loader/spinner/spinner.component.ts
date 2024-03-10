import { Component, ViewEncapsulation } from '@angular/core';
import { LoaderService } from '../loader.service';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode, MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
  standalone: true,
  imports: [MatCardModule, MatRadioModule, FormsModule, MatSliderModule, MatProgressSpinnerModule],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class SpinnerComponent {
  
  constructor(public loader: LoaderService) { }
}