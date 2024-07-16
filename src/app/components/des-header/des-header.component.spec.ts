import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesHeaderComponent } from './des-header.component';

describe('DesHeaderComponent', () => {
  let component: DesHeaderComponent;
  let fixture: ComponentFixture<DesHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
