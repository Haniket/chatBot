import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const baseUrl = `http://localhost:3000/api`;
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }
  getResponse(userMessage: any) {
    return this.http.post<any>(`${baseUrl}/chatbot/chat`, {userMessage});
  };
}

