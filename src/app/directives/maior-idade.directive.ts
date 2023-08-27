import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[maiorIdadeValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: MaiorIdadeDirective,
    multi: true
  }]
})
export class MaiorIdadeDirective implements Validator {

  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
    const dataNascimento = control.value;
    const dataMaiorIdade = this.addYears(dataNascimento, 18);

    let validacao = dataMaiorIdade <= new Date();

    return validacao ? null : {'maiorIdadeValidator': true};
  }

  private addYears(date: Date, years: number): Date {
    var result = new Date(date);
    result.setFullYear(result.getFullYear() + years);
    return result;
  }
}
