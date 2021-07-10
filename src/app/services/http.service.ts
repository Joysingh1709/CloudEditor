import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  
  constructor(private http: HttpClient,
    @Inject('BaseUrl') private baseUrl) {
    console.log(this.baseUrl);
  }

  getallUserDocs(id): Observable<any> {
    return this.http.get(this.baseUrl + `getUserDocs/${id}`);
  }

  getAllUserSharedDocs(id): Observable<any> {
    return this.http.get(this.baseUrl + `getUserSharedDocs/${id}`);
  }

  shareDocument(data): Observable<any> {
    return this.http.put(this.baseUrl + `shareDoc`, data);
  }

  getUser(id): Observable<any> {
    return this.http.get(this.baseUrl + `getUser/${id}`);
  }

  createNewDocument(data): Observable<any> {
    return this.http.post(this.baseUrl + `addDoc`, data);
  }

  saveDocument(data): Observable<any> {
    return this.http.put(this.baseUrl + `saveDoc`, data);
  }
}
