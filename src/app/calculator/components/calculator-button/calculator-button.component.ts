import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  output,
  OutputEmitterRef,
  signal,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'calculator-button',
  standalone: true,
  templateUrl: './calculator-button.component.html',
  styleUrls: ['./calculator-button.component.css'],

  // Nos permite trabajar con zoneless
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'border-r border-b border-indigo-400',
    '[class.w-2/4]': 'isDoubleSize()', // La clase w-2/4 debe existir en el padre
    '[class.w-1/4]': '!isDoubleSize()',
    // attribute: ''
    // 'data-size': 'XL'
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
    transform: (value: boolean | string) => (typeof value === 'string' ? value === '' : value),
  });

  // InputSignal
  public isDoubleSize = input(false, {
    transform: (value: boolean | string) => (typeof value === 'string' ? value === '' : value),
  });

  public isPressed = signal(false);

  // Nueva forma recomendada para emitir valores
  public onClick: OutputEmitterRef<string> = output<string>();

  // Nueva forma de acceder a los hijos de un componente
  public contentValue = viewChild<ElementRef<HTMLButtonElement>>('button');

  /**
   * HotsBinding: Es un decorador que nos permite tener acceso a las clases, atributos, etc
   * de nuestro HOST.
   * Lo que hacemos aquí es: Aplica la clase .is-command, si el InputSignal es true
   */
  // @HostBinding('class.is-command')
  // get commandStyle(): boolean {
  //   return this.isCommand();
  // }

  // @HostBinding('class.w-2/4') // Manera no recomendada de usar en las nuevas versiones de angular
  // get doubleSizeStyle(): boolean {
  //   return this.isDoubleSize();
  // }

  /**
   * @description Handles the click event when the calculator button is clicked
   */
  handleClick() {
    if (!this.contentValue()?.nativeElement) return;

    const value = this.contentValue()!.nativeElement.innerText;

    this.onClick.emit(value.trim());
  }

  keyboardPressedStyle(key: string) {
    if (!this.contentValue()) return;

    const value = this.contentValue()?.nativeElement.innerText;

    if (value !== key) return;

    this.isPressed.set(true);

    setTimeout(() => {
      this.isPressed.set(false);
    }, 100);
  }
}
