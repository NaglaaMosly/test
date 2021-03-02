import {NgModule} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
  imports: [
    MatIconModule,
    MatInputModule,
    MatStepperModule
  ],
  declarations: [],
  exports: [
    MatIconModule,
    MatInputModule,
    MatStepperModule,
    MatMenuModule
  ],
  providers: [
  
  ]
})
export class MaterialModule { }
