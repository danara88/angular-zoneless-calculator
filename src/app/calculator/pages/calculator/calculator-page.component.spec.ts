import { ComponentFixture, TestBed } from '@angular/core/testing';
import CalculatorPageComponent from './calculator-page.component';

describe('CalculatorPage', () => {
  let fixture: ComponentFixture<CalculatorPageComponent>;
  let compiled: HTMLElement;
  let component: CalculatorPageComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorPageComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should contain calculator component', () => {
    expect(compiled.querySelector('calculator')).not.toBeNull();
  });

  // it('should container basic css styling', () => {
  //   console.log(compiled);
  //   const divElement = compiled.querySelector('#root9');
  //   const mustHaveClasses: string[] =
  //     'w-screen max-w-80 mx-auto rounded-xl bg-gray-100 shadow-xl text-gray-800 relative overflow-hidden'.split(
  //       ' '
  //     );
  //   expect(divElement).not.toBeNull();
  //   const divClasses = divElement?.classList.value.split(' ');
  //   mustHaveClasses.forEach((mustHaveClass) => {
  //     expect(divClasses).toContain(mustHaveClass);
  //   });
  // });
});
