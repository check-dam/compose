import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { HttpOptions, ResponseType } from '@tauri-apps/api/http';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
})
export class RequestComponent implements OnInit {
  @Output() requestUpdated = new EventEmitter();
  methods = [
    {
      id: 'get',
      text: 'Get',
    },
    {
      id: 'post',
      text: 'Post',
    },
  ];
  headers: any[] = [];
  response: any;
  requestForm = this.formBuilder.group({
    method: [this.methods[0]],
    url: [''],
  });
  requestFormChange$: Subscription | null = null;

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.requestFormChange$ = this.requestForm.valueChanges.subscribe(() => this.emitRequestChange());
  }

  onAuthUpdated(authType: string, data: any) {
    const header = { key: 'Authorization', value: `${authType} ${data}` };
    const authorizationHeader = this.headers.find((header) => header.key === 'Authorization');
    if (authorizationHeader) {
      authorizationHeader.value = `${authType} ${data}`;
    } else {
      this.headers.push(header);
    }
    this.emitRequestChange();
  }

  send() {
    const formValue = this.requestForm.value;
    const method = formValue.method;
    let request = null;
    switch (method.id) {
      case 'get': {
        request = this.httpGet(formValue);
        break;
      }
    }
  }

  httpGet(formValue: any) {
    const httpHeaders = this.headers.reduce((coll, header) => {
      coll[header.key] = header.value;
      return coll;
    }, {});
    const fetchOptions: HttpOptions = {
      method: 'GET',
      url: formValue.url,
      headers: httpHeaders,
    };
    window.__TAURI__.http.fetch(formValue.url, fetchOptions).then((result: any) => this.processResponse(result));
  }

  bodyChanged(bodyData: any) {}

  processResponse(result: any) {
    this.response = result;
  }

  emitRequestChange() {
    const formValue = this.requestForm.value;
    const request = {
      method: formValue.method,
      url: formValue.url,
      headers: this.headers,
    };
    this.requestUpdated.emit(request);
  }
}
