import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { HighligthDirective } from './highligth.directive';

@Component({
  template: `
    <h5 class="title" highligth>Hay un valor</h5>
    <h5 highligth="yellow">Hay un valor</h5>
    <p highligth="blue">parrafo</p>
    <p>otro parrafo</p>
    <input [(ngModel)]="color" [highligth]="color" />
  `,
})
class HostComponent {
  color = 'pink';
}

describe('HighligthDirective', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostComponent, HighligthDirective],
      imports: [FormsModule],
    }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have three highligth elements', () => {
    const elements = fixture.debugElement.queryAll(
      By.directive(HighligthDirective)
    );
    const elementsNo = fixture.debugElement.queryAll(
      By.css('*:not([highligth])')
    );
    expect(elements.length).toBe(4);
    expect(elementsNo.length).toBe(2);
  });
  it('should the elements be match with bgColor', () => {
    const elements = fixture.debugElement.queryAll(
      By.directive(HighligthDirective)
    );
    expect(elements[0].nativeElement.style.backgroundColor).toBe('gray');
    expect(elements[1].nativeElement.style.backgroundColor).toBe('yellow');
    expect(elements[2].nativeElement.style.backgroundColor).toBe('blue');
  });

  it('should the h5.title be default color', () => {
    const element = fixture.debugElement.query(By.css('.title'));
    const dir = element.injector.get(HighligthDirective);
    expect(element.nativeElement.style.backgroundColor).toBe(dir.defaultColor);
  });

  it('should bind <input> and change the bgColor', () => {
    const inputDe = fixture.debugElement.query(By.css('input'));
    const inputEl: HTMLInputElement = inputDe.nativeElement;
    expect(inputEl.style.backgroundColor).toEqual('pink');
    inputEl.value = 'red';
    inputEl.dispatchEvent(new Event('input')); // Emula la escritura del usuario
    fixture.detectChanges();
    expect(inputEl.style.backgroundColor).toEqual('red');
    expect(component.color).toEqual('red');
  });
});
