import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Endereco } from '../cadastro/models/endereco';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultaCepService {

  apiUrl:string = 'http://viacep.com.br/ws/';

  constructor(private client: HttpClient) { }

  getConsultaCep(cep: string): Observable<Endereco>{
    const url = `${this.apiUrl}${cep}/json`;
    return this.client.get<Endereco>(url);
  }
}
