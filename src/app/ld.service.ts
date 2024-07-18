import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { FlagData } from './Ld.model';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class LDService {

  private apiUrl= 'https://app.launchdarkly.com/api/v2/flags';
  private projectKey = 'ruchitha-demo-003'; 
  private apiKey = 'api-58a67e16-8632-419f-943c-23be0a8470bb';


  constructor(private http: HttpClient) { }

  getFeatureFlags(): Observable<FlagData> {
  
    const headers = new HttpHeaders({
      'Authorization': this.apiKey,
      'Content-Type': 'application/json'
    });
    
    return this.http.get<FlagData>(`${this.apiUrl}/${this.projectKey}?env=development&env=test&env=production`, { headers})
    .pipe(map(response => response));
  }

  
  updateFlag(projectKey: string, featureFlagKey: string, env: string, newState: boolean): Observable<any> {
    const url = `${this.apiUrl}/${projectKey}/${featureFlagKey}`;
    const body = {
      environmentKey: env,
      instructions: [
        {
          kind: newState ? 'turnFlagOn' : 'turnFlagOff'
        }
      ]
    };
    const headers = new HttpHeaders({
      'Authorization': this.apiKey, // Replace with your actual API key
      'Content-Type': 'application/json; domain-model=launchdarkly.semanticpatch'
    });
    return this.http.patch(url, body, { headers });
  }

 
}

