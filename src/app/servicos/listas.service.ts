import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lista } from '../model/lista';

@Injectable({
  providedIn: 'root'
})
export class ListasService {

  constructor(private htpp: HttpClient) { }

  public recuperarListas(): Observable<Lista[]>{
    return this.htpp.get<Lista[]>(environment.urlAPI + "/listas");
  }

  public cadastrarLista(lista:Lista): Observable<Lista>{
    return this.htpp.post<Lista>(environment.urlAPI + "/listas", lista)
  }

  public recuperarPorId(id: number): Observable<Lista>{
    return this.htpp.get<Lista>(environment.urlAPI+"/listas/"+id);
  }

}
