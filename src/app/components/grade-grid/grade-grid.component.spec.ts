import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeGridComponent } from './grade-grid.component';

describe('GradeGridComponent', () => {
  let component: GradeGridComponent;
  let fixture: ComponentFixture<GradeGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GradeGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GradeGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
