import { ConsultaCepService } from './../services/consulta-cep.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Endereco } from './models/endereco';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  public endereco?: Endereco;

  constructor(
    private router: Router, 
    private service: ConsultaCepService
  ) { }

  ngOnInit(): void {
  }

  cadastrar(form: NgForm): void{
    if(form.valid){
      this.router.navigate(['./sucesso']);
    } else {
      alert('Invalido');
    }
  }

  corrigeContato(f: NgForm): void {
    if(f.controls['telefone']?.valid){
      let telefone: string = f.controls['telefone']?.value;
      console.log(telefone);
      telefone = telefone.replace('(','').replace(')','').replace('-','');
  
      if(telefone.length == 10) {
        let telefoneAjustado = `(${telefone.slice(0, 2)}) ${telefone.slice(2, 6)}-${telefone.slice(6)}`;
  
        f.controls['telefone']?.setValue(telefoneAjustado);
      } else if (telefone.length == 11) {
        let telefoneAjustado = `(${telefone.slice(0, 2)}) ${telefone.slice(2, 7)}-${telefone.slice(7)}`;
  
        f.controls['telefone']?.setValue(telefoneAjustado);
      }
      console.log(f.controls['telefone']?.value)
    }
  }

  consultaCep(event: any, form: NgForm): void {
    if(form.controls['cep']?.valid) {
      const cep = event.target.value;
      this.service.getConsultaCep(cep).subscribe(endereco => {
        this.endereco = endereco;
      });
    }
  }
}
