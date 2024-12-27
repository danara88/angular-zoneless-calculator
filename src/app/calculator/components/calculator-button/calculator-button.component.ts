import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  input,
} from '@angular/core';

@Component({
  selector: 'calculator-button',
  standalone: true,
  templateUrl: './calculator-button.component.html',
  styleUrls: ['./calculator-button.component.css'],

  // Nos permite trabajar con zoneless
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'w-1/4 border-r border-b border-indigo-400',
  },

  // No quiero ningún tipo de encapsulamiento para este componente
  // Esto puede provocar que algunos estilos css se filtren a otros componentes.
  // encapsulation: ViewEncapsulation.None,
})
export class CalculatorButtonComponent {
  // InputSignal required
  // public isCommand = input.required();

  // InputSignal
  public isCommand = input(false, {
    // Esta funcion se ejecuta antes de que nuestro componente se construya
    transform: (value: boolean | string) =>
      typeof value === 'string' ? value === '' : value,
  });

  // InputSignal
  public isDoubleSize = input(false, {
    transform: (value: boolean | string) =>
      typeof value === 'string' ? value === '' : value,
  });

  /**
   * HotsBinding: Es un decorador que nos permite tener acceso a las clases, atributos, etc
   * de nuestro HOST.
   * Lo que hacemos aquí es: Aplica la clase .is-command, si el InputSignal es true
   */
  // @HostBinding('class.is-command')
  // get commandStyle(): boolean {
  //   return this.isCommand();
  // }

  @HostBinding('class.w-2/4')
  get doubleSizeStyle(): boolean {
    return this.isDoubleSize();
  }
}
