import { TestBed } from "@angular/core/testing";
import { CalculatorService } from "./calculator.service";

describe('calculatorService', () => {
    let service: CalculatorService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CalculatorService);
    });

    beforeAll(() => {});
    afterEach(() => {});
    afterAll(() => {});

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should be created with default values', () => {
        // Arrange
        const resultTextInitExpected = '0';
        const subResultTextExpected = '0';
        const lastOperatorExpected = '+';
        // Act & Assert
        expect(service.resultText()).toBe(resultTextInitExpected);
        expect(service.subResultText()).toBe(subResultTextExpected);
        expect(service.lastOperator()).toBe(lastOperatorExpected);
    });

    it('should set resultText and subResultText to 0 when C is pressed', () => {
        // Arrange
        const pressedButton = 'C';
        service.resultText.set('1000');
        service.subResultText.set('20');
        service.lastOperator.set('-');
        // Act
        service.constructNumber(pressedButton);
        // Expect
        expect(service.resultText()).toBe('0');
        expect(service.subResultText()).toBe('0');
        expect(service.lastOperator()).toBe('+');
    });

    it('should update resultText with correct input number', () => {
        // Arrange
        const inputNumber = '1';
        // Act
        service.constructNumber(inputNumber);
        service.constructNumber(inputNumber);
        // Assert
        expect(service.resultText()).toBe('11');
    });

    it('should handler operators correctly', () => {
        // Act
        service.constructNumber('1');
        service.constructNumber('-');
        // Assert
        expect(service.lastOperator()).toBe('-');
        expect(service.subResultText()).toBe('1');
        expect(service.resultText()).toBe('0');
    });

    it('should calculate result correctly for addition', () => {
        // Act
        service.constructNumber('1');
        service.constructNumber('+');
        service.constructNumber('2');
        service.constructNumber('=');
        // Assert
        expect(service.resultText()).toBe('3');
    });

    it('should calculate result correctly for substraction', () => {
        // Act
        service.constructNumber('1');
        service.constructNumber('-');
        service.constructNumber('2');
        service.constructNumber('=');
        // Assert
        expect(service.resultText()).toBe('-1');
    });

    it('should calculate result correctly for multiplication', () => {
        // Act
        service.constructNumber('3');
        service.constructNumber('*');
        service.constructNumber('2');
        service.constructNumber('=');
        // Assert
        expect(service.resultText()).toBe('6');
    });

    it('should calculate result correctly for division', () => {
        // Act
        service.constructNumber('4');
        service.constructNumber('/');
        service.constructNumber('2');
        service.constructNumber('=');
        // Assert
        expect(service.resultText()).toBe('2');
    });

    it('shoud handle decimal point correctly', () => {
        // Act
        service.constructNumber('1');
        service.constructNumber('.');
        service.constructNumber('1');
        // Assert
        expect(service.resultText()).toBe('1.1');
    });

    it('shoud handle decimal point correctly starting with 0', () => {
        // Act
        service.constructNumber('0');
        service.constructNumber('.');
        service.constructNumber('0');
        // Assert
        expect(service.resultText()).toBe('0.0');
    });

    it('should handle sign change correctly', () => {
        service.constructNumber('1');
        service.constructNumber('+/-');
        expect(service.resultText()).toBe('-1');
        service.constructNumber('+/-');
        expect(service.resultText()).toBe('1');
    });

    it('should handle backspace correctly', () => {
        service.resultText.set('123');
        service.constructNumber('Backspace');
        expect(service.resultText()).toBe('12');
        service.constructNumber('Backspace');
        expect(service.resultText()).toBe('1');
    });

    it('should handle max length correctly', () => {
        for (let i = 0; i < 8; i++) {
            service.constructNumber('1');
        }
        expect(service.resultText().length).toBe(8);
        service.constructNumber('1');
        expect(service.resultText().length).toBe(8);
    });
});