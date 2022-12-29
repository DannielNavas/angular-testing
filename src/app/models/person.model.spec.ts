import { Person } from './person.model';

describe('Test for Person', () => {
  let person: Person;
  beforeEach(() => {
    person = new Person('Navas', 'Daniel', 32, 70, 1.7);
  });

  it('attrs', () => {
    expect(person.name).toBe('Daniel');
    expect(person.lastName).toBe('Navas');
    expect(person.age).toBe(32);
    expect(person.weigth).toBe(70);
    expect(person.height).toBe(1.7);
  });

  describe('test for calcIMC', () => {
    it('should return a string: Bajo peso', () => {
      // Arrange
      person.weigth = 40;
      person.height = 1.65;
      // Act
      const result = person.calcIMC();
      // Assert
      expect(result).toBe('Bajo peso');
    });
    it('should return a string: normal', () => {
      // Arrange
      person.weigth = 65;
      person.height = 1.65;
      // Act
      const result = person.calcIMC();
      // Assert
      expect(result).toBe('Normal');
    });
    it('should return a string: Sobrepeso', () => {
      // Arrange
      person.weigth = 70;
      person.height = 1.65;
      // Act
      const result = person.calcIMC();
      // Assert
      expect(result).toBe('Sobrepeso');
    });
    it('should return a string: Obesidad grado 1', () => {
      // Arrange
      person.weigth = 75;
      person.height = 1.65;
      // Act
      const result = person.calcIMC();
      // Assert
      expect(result).toBe('Obesidad grado 1');
    });
    it('should return a string: Obesidad grado 2', () => {
      // Arrange
      person.weigth = 100;
      person.height = 1.65;
      // Act
      const result = person.calcIMC();
      // Assert
      expect(result).toBe('Obesidad grado 2');
    });
    it('should return a string: Obesidad grado 3', () => {
      // Arrange
      person.weigth = 115;
      person.height = 1.65;
      // Act
      const result = person.calcIMC();
      // Assert
      expect(result).toBe('Obesidad grado 3');
    });
  });
});
