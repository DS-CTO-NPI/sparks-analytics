import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControllerWidgetComponent } from './controller-widget.component';

describe('ControllerWidgetComponent', () => {
  let component: ControllerWidgetComponent;
  let fixture: ComponentFixture<ControllerWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControllerWidgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControllerWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
