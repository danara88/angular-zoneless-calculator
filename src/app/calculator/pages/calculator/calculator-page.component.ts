import CalculatorComponent from '@/calculator/components/calculator/calculator.component';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'calculator-page',
  standalone: true,
  templateUrl: './calculator-page.component.html',
  imports: [CalculatorComponent],
  // Nos permite trabajar con zoneless
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class:
      'w-screen max-w-80 mx-auto rounded-xl bg-gray-100 shadow-xl text-gray-800 relative overflow-hidden',
  },
})
export default class CalculatorPageComponent {}
