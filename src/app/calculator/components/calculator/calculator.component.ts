import { ChangeDetectionStrategy, Component, computed, inject, viewChildren } from '@angular/core';
import { CalculatorButtonComponent } from '../calculator-button/calculator-button.component';
import { CalculatorService } from '@/calculator/services/calculator.service';

@Component({
  selector: 'calculator',
  standalone: true,
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
  imports: [CalculatorButtonComponent],

  // Nos permite trabajar con zoneless
  changeDetection: ChangeDetectionStrategy.OnPush,

  // Nueva forma recomendada del equipo de angular
  host: {
    '(document:keyup)': 'handleKeyboardEvent($event)',
  },
})
export default class CalculatorComponent {
  // Usamos la función inject porque hay varios lugares donde no tenemos acceso al constructor
  // como por ejemplo protecciones de rutas.
  // Optar por servicios privados para mejor legibilidad del codigo.
  private calculatorService = inject(CalculatorService);

  private calculatorButtons = viewChildren(CalculatorButtonComponent);

  // get resultText() {
  //   return this.calculatorService.resultText;
  // }

  // Read-only signal
  // Esta señal de solo lectura va a cambiar cuando el resultText cambie.
  public resultText = computed(() => this.calculatorService.resultText());

  public subResultText = computed(() => this.calculatorService.subResultText());

  public lastOperator = computed(() => this.calculatorService.lastOperator());

  /**
   * @description Handles logic when a calculator button is clicked
   */
  handleClick(key: string) {
    this.calculatorService.constructNumber(key);
  }

  // @HostListener('document:keyup', ['$event']) // Ya no es recomendado en las nuevas versiones de angular
  handleKeyboardEvent(event: KeyboardEvent) {
    const keyEquivalents: Record<string, string> = {
      Escape: 'C',
      Clear: 'C',
      '*': 'x',
      '/': '÷',
      Enter: '=',
    };

    const key = event.key;
    const keyValue = keyEquivalents[key] ?? key;

    this.handleClick(keyValue);

    this.calculatorButtons().forEach((button) => {
      button.keyboardPressedStyle(keyValue);
    });
  }
}
