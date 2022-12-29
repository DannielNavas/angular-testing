export class Person {
  constructor(
    public lastName: string,
    public name: string,
    public age: number,
    public weigth: number,
    public height: number
  ) {}

  calcIMC(): string {
    const result = Math.round(this.weigth / (this.height * this.height));
    if (result < 0) {
      return 'No se puede calcular';
    } else if (result < 18) {
      return 'Bajo peso';
    } else if (result >= 19 && result <= 24) {
      return 'Normal';
    } else if (result >= 25 && result <= 26) {
      return 'Sobrepeso';
    } else if (result >= 27 && result <= 29) {
      return 'Obesidad grado 1';
    } else if (result >= 30 && result <= 39) {
      return 'Obesidad grado 2';
    } else {
      return 'Obesidad grado 3';
    }
  }
}
