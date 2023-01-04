import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { query, queryById } from './finders';

// eventos que se encuentran en angular ejemplo todo lo que este ()="function()"
export function clickEvent<T>(
  fixture: ComponentFixture<T>,
  selector: string,
  withTestId = false,
  event: unknown = null
) {
  let element: DebugElement;
  if (withTestId) {
    element = queryById(fixture, selector);
  } else {
    element = query(fixture, selector);
  }
  element.triggerEventHandler('click', event);
}

// ejecuta el click sobre el elemento html nativo IMPORTANTE para los formularios
export function clickElemet<T>(
  fixture: ComponentFixture<T>,
  selector: string,
  withTestId = false
) {
  let elementDebug: DebugElement;
  if (withTestId) {
    elementDebug = queryById(fixture, selector);
  } else {
    elementDebug = query(fixture, selector);
  }
  const element: HTMLElement = elementDebug.nativeElement;
  element.click();
}
