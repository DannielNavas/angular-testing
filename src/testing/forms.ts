import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { query, queryById } from './finders';

export function setInputValue<T>(
  fixture: ComponentFixture<T>,
  selector: string,
  value: string,
  withTestId = false
) {
  let debugElement: DebugElement;
  if (withTestId) {
    debugElement = queryById(fixture, selector);
  } else {
    debugElement = query(fixture, selector);
  }
  const inputEl: HTMLInputElement = debugElement.nativeElement;
  inputEl.value = value;
  // escribe en la interfaz
  inputEl.dispatchEvent(new Event('input'));
  // salir del desenfoque para que se ejecute la validación
  inputEl.dispatchEvent(new Event('blur'));
}
