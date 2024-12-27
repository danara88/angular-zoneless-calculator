import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CalculatorButtonComponent } from '../calculator-button/calculator-button.component';

@Component({
  selector: 'calculator',
  standalone: true,
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
  imports: [CalculatorButtonComponent],

  // Nos permite trabajar con zoneless
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CalculatorComponent {}
