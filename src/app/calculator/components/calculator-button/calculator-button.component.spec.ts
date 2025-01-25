import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculatorButtonComponent } from './calculator-button.component';

@Component({
  standalone: true,
  imports: [CalculatorButtonComponent],
  template: `
    <calculator-button>
      <span class="projected-content underline">C</span>
    </calculator-button>
  `,
})
class TestHostComponent {}

describe('CalculatorButton', () => {
  let fixture: ComponentFixture<CalculatorButtonComponent>;
  let component: CalculatorButtonComponent;
  let compiled: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CalculatorButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorButtonComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;

    /**
     * ¿Por qué usar el detect changes aquí?
     * Ejemplo: Tenemos un input que modificará el HTMLElement ya sea alguna clase agregada o un nuevo id.
     * Para que nosotros tengamos esos cambios reflejados en el html, tenemos que detectar los cambios.
     * Tenemos que esperar a que se detecten los cambios, tenemos que esperar a que el input entre en acción.
     */
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should apply w-1/4 when doubleSize is false', () => {
    // Clases del host element
    const hostCssClasses: string[] = compiled.classList.value.split(' ');
    expect(hostCssClasses).toContain('w-1/4');
    expect(component.isDoubleSize()).toBeFalse();
  });

  it('should apply w-2/4 when doubleSize is true', () => {
    // Establecer el valor de un input en un componente
    fixture.componentRef.setInput('isDoubleSize', true);
    // Esperar a que el cambio se aplique (deteccion de cambios)
    fixture.detectChanges();
    // Clases del host element
    const hostCssClasses: string[] = compiled.classList.value.split(' ');
    expect(hostCssClasses).toContain('w-2/4');
    expect(component.isDoubleSize()).toBeTrue();
  });

  it('should emit onClick when handleClick is called', () => {
    /**
     * Spy: Los espias estan pendientes de algun suceso.
     */
    spyOn(component.onClick, 'emit');
    component.handleClick();
    expect(component.onClick.emit).toHaveBeenCalledWith('');
  });

  it('should set isPressed to true and then false on keyboardPressedStyle', (done: DoneFn) => {
    component.contentValue()!.nativeElement.innerText = '1';
    component.keyboardPressedStyle('1');
    expect(component.isPressed()).toBeTrue();
    setTimeout(() => {
      expect(component.isPressed()).toBeFalse();
      /**
       * Done: Le dice a Jasmine que se espere ya que todavía
       * hay otra prueba que evaluar.
       */
      done();
    }, 101);
  });

  it('should not set isPressed to true when the key is different than the content on keyboardPressedStyle', () => {
    component.contentValue()!.nativeElement.innerText = 'C';
    component.keyboardPressedStyle('1');
    expect(component.isPressed()).toBeFalse();
  });

  it('should display projects content', () => {
    const testHostFixture = TestBed.createComponent(TestHostComponent);
    const testHostCompiled: HTMLElement = testHostFixture.nativeElement as HTMLDivElement;
    const projectedContent = testHostCompiled.querySelector('.projected-content');
    expect(projectedContent).not.toBeNull();
    expect(projectedContent?.classList.contains('underline')).toBeTruthy();
    expect(projectedContent?.innerHTML).toBe('C');
  });
});
