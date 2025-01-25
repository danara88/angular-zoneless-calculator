import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should be 3', () => {
    // Arrange
    const num1 = 0;
    const num2 = 0;
    const num3 = 3;

    // Act
    const result = num1 + num2 + num3;

    // Assert
    expect(result).toBe(3);
  });

  it(`should have the 'zoneless-calculator' title`, () => {
    const app = fixture.componentInstance;
    expect(app.title).toEqual('zoneless-calculator');
  });

  it('should render router-outlet', () => {
    expect(compiled.querySelector('router-outlet')).not.toBeNull();
  });

  it('should render router-outlet wrapped with css classes', () => {
    const divElement = compiled.querySelector('div');
    const mustHaveClasses: string[] =
      'min-w-screen min-h-screen bg-slate-600 flex items-center justify-center px-5 py-5'.split(
        ' '
      );
    expect(divElement).not.toBeNull();
    const divClasses = divElement?.classList.value.split(' ');
    mustHaveClasses.forEach((mustHaveClass) => {
      expect(divClasses).toContain(mustHaveClass);
    });
  });

  it('should render title', () => {
    // Asegura que se carguen las dependencias y se detecten los cambios
    fixture.detectChanges();
    // console.log(compiled);
    // expect(compiled.querySelector('h1')?.textContent).toContain('Hello, zoneless-calculator');
  });

  it('should contain buy me a bear link', () => {
    // Arrange
    const expectedHref = 'https://www.buymeacoffe.com/';
    const expectedAnchorTitle = 'Buy me a beer';

    // Act & Assert
    const div = compiled.querySelectorAll('div')[1];
    expect(div).not.toBeNull();

    const anchorElement = div.childNodes[0] as HTMLElement;
    expect(anchorElement).not.toBeNull();

    expect(anchorElement.getAttribute('href')).toBe(expectedHref);
    expect(anchorElement.getAttribute('title')).toBe(expectedAnchorTitle);
  });
});
