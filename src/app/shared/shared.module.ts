import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  imports: [ReactiveFormsModule, FormsModule, NgxChartsModule, BrowserAnimationsModule],
  exports: [ReactiveFormsModule, FormsModule, NgxChartsModule, BrowserAnimationsModule]
})

export class SharedModule {
}
