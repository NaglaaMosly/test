import {NgModule} from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatStepperModule } from "@angular/material/stepper";

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
    MatStepperModule
  ],
  providers: [
  
  ]
})
export class MaterialModule { }
