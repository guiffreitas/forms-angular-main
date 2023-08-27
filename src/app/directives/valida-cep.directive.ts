import { ConsultaCepService } from './../services/consulta-cep.service';
import { Directive } from '@angular/core';
import { AsyncValidator, NG_ASYNC_VALIDATORS, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, map } from 'rxjs';

@Directive({
  selector: '[validadorCep]',
  providers: [{
    provide: NG_ASYNC_VALIDATORS,
    useExisting: ValidaCepDirective,
    multi: true
  }]
})
export class ValidaCepDirective implements AsyncValidator {

  constructor(private service: ConsultaCepService) { }

  validate(control: AbstractControl): 
  Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    const cep = control.value;

    return this.service.getConsultaCep(cep).pipe(map(
      (result: any) => result.erro ? {'validadorCep': true} : null
    ));
  }

}
