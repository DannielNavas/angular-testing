import { Calculator } from './calculator';
describe('Test for Calculator', () => {
    it('#multiply should return a nine', () => {
        // Arrange
        const calculator = new Calculator();
        // Act
        const result = calculator.multiply(3, 3);
        // Assert
        expect(result).toEqual(9);
    });
    it('#multiply should return four', () => {
        // Arrange
        const calculator = new Calculator();
        // Act
        const result = calculator.multiply(1, 4);
        // Assert
        expect(result).toEqual(4);
    }
    );

    it('#divide should return value', () => {
        // Arrange
        const calculator = new Calculator();
        // Act
        const result = calculator.divide(6, 3);
        const result1 = calculator.divide(6, 3);
        expect(calculator.divide(4, 2)).toEqual(2);
        // Assert
        expect(result1).toEqual(2);
    });

    it('#divide should return a zero', () => {
        // Arrange
        const calculator = new Calculator();
        // Act
        const result = calculator.divide(6, 0);
        const result2 = calculator.divide(6, 0.5);
        // Assert
        expect(result).toBeNull();
        expect(result2).toEqual(12);
    });

    it('test matchers', () => {
        const name = 'Danniel';
        let name2;

        expect(name).toBeDefined(); // definida
        expect(name2).toBeUndefined(); // no definida
        // expect(1 + 3 === 3).toBeTruthy(); // verdadera
        expect(1 + 3 === 3).toBeFalsy(); // falsa
        // expect(5).toBeGreaterThan(10); // mayor que
        expect(5).toBeLessThan(10); // menor que
        expect('123456').toMatch(/123/); // matchea con una expresion regular
        expect(['apples', 'oranges', 'bananas']).toContain('bananas'); // contiene
        expect(name).not.toBeNull(); // no es null
        // expect(name2).toBeNull(); // es null
    });
});
