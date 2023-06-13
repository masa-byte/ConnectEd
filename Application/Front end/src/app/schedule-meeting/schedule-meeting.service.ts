import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from 'environment/environment.dev';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduleMeetingService {

  constructor(private http:HttpClient) {}

  getAllApplications(articleType:string,id:number|undefined):Observable<HttpResponse<any>>{
    
    if(articleType==="book"){
      return this.http.get<any>(url+`/book/applications/${id}`,{observe:'response'});
    }else if(articleType=="paper"){
      return this.http.get<any>(url+`/paper/applications/${id}`,{observe:'response'});
    }else 
      return this.http.get<any>(url+`/project/applications/${id}`,{observe:'response'});
    
    
  }

  deleteDeclinedApplication(articleId:number,applicantId:number,applicantType:string,articleType:string):Observable<HttpResponse<any>>{
    if(articleType==="book"){
      return this.http.delete<any>(url+`/bookApplication/${articleId}/${applicantId}`,{observe:'response'});
    }else if(articleType=="paper"){
      return this.http.delete<any>(url+`/paper-application/${articleId}/${applicantId}/${applicantType}`,{observe:'response'});
    }else 
      return this.http.delete<any>(url+`/project-application/${articleId}/${applicantId}/${applicantType}`,{observe:'response'});
    
  }

  
}
