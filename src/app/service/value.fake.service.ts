// este tiene bastantes devilidades de mantenimiento
export class ValueFakeService {
  private value = 'my value';

  getValue() {
    // solo importa el retorno al tener el fake service como este y no como el real
    return this.value;
  }
  setValue(value: string) {
    this.value = value;
  }

  getPromiseValue() {
    return Promise.resolve('value from a promise');
  }

}
