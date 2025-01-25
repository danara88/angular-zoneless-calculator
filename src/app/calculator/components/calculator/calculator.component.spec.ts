import { ComponentFixture, TestBed } from '@angular/core/testing';
import CalculatorComponent from './calculator.component';
import { CalculatorService } from '@/calculator/services/calculator.service';
import { By } from '@angular/platform-browser';
import { CalculatorButtonComponent } from '../calculator-button/calculator-button.component';

class MockCalculatorService {
  resultText = jasmine.createSpy('resultText').and.returnValue('100.00');
  subResultText = jasmine.createSpy('subResultText').and.returnValue('0');
  lastOperator = jasmine.createSpy('lastOperator').and.returnValue('+');

  constructNumber = jasmine.createSpy('calculateResult');
}

describe('CalculatorComponent', () => {
  let fixture: ComponentFixture<CalculatorComponent>;
  let compiled: HTMLElement;
  let component: CalculatorComponent;
  let mockCalculatorService: MockCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CalculatorComponent],
      providers: [
        {
          provide: CalculatorService,
          useClass: MockCalculatorService,
        },
      ],
    });

    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    mockCalculatorService = TestBed.inject(CalculatorService) as unknown as MockCalculatorService;

    /**
     * Como tenemos una injección de un servicio, este esta haciendo
     * un impacto en nuestro html. Por lo que debemos esperar a los cambios
     */
    // fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial values', () => {
    expect(component.resultText()).toBe('100.00');
    expect(component.subResultText()).toBe('0');
    expect(component.lastOperator()).toBe('+');
  });

  it('should display proper calculation values', () => {
    mockCalculatorService.resultText.and.returnValue('20');
    mockCalculatorService.subResultText.and.returnValue('5');
    mockCalculatorService.lastOperator.and.returnValue('/');

    // Actualiza el HTMl con los ultimos cambios
    fixture.detectChanges();

    const span = compiled.querySelector('[data-testId="sub-result-and-last-operator-text"]');

    expect(component.resultText()).toBe('20');
    expect(component.subResultText()).toBe('5');
    expect(component.lastOperator()).toBe('/');
    expect(span).toBeTruthy();
    expect(span?.innerHTML).toBe('5 /');
  });

  it('should have 19 calculator buttons', () => {
    const calculatorButtonsElements = compiled.querySelectorAll('calculator-button');
    expect(calculatorButtonsElements.length).toBe(19);
    expect(calculatorButtonsElements[0].textContent?.trim()).toBe('C');
    expect(calculatorButtonsElements[1].textContent?.trim()).toBe('+/-');
    expect(calculatorButtonsElements[2].textContent?.trim()).toBe('%');
    // etc hasta el boton 19
  });

  it('should have 19 calculator buttons [Other approach]', () => {
    const calculatorButtonsElements = fixture.debugElement.queryAll(
      By.directive(CalculatorButtonComponent)
    );
    expect(calculatorButtonsElements.length).toBe(19);
  });

  it('should handle keyboard events correctly', () => {
    // Preparer el evento
    const eventEnter = new KeyboardEvent('keyup', { key: 'Enter' });
    // Disparar el evento
    document.dispatchEvent(eventEnter);
    expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('=');

    const eventESC = new KeyboardEvent('keyup', { key: 'Escape' });
    document.dispatchEvent(eventESC);
    expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('C');

    const eventClear = new KeyboardEvent('keyup', { key: 'C' });
    document.dispatchEvent(eventClear);
    expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('C');
  });

  it('should display result text correctly', () => {
    mockCalculatorService.resultText.and.returnValue('80.9');

    // Actualiza el HTMl con los ultimos cambios
    fixture.detectChanges();

    const span = compiled.querySelector('[data-testId="result-text"]');
    expect(component.resultText()).toBe('80.9');
    expect(span).toBeTruthy();
    expect(span?.innerHTML).toBe('80.9');
  });
});
