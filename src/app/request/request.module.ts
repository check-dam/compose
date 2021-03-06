import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { RequestComponent } from './request.component';
import { BasicAuthenticationModule } from '../basic-authentication/basic-authentication.module';
import { HeadersModule } from '../headers/headers.module';
import { AceModule } from '../ace/ace.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatExpansionModule,
    MatTabsModule,
    BasicAuthenticationModule,
    HeadersModule,
    HttpClientModule,
    AceModule,
  ],
  declarations: [RequestComponent],
  exports: [RequestComponent],
})
export class RequestModule {}
