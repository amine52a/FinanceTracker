import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProjectChartComponent } from './user-project-chart.component';

describe('UserProjectChartComponent', () => {
  let component: UserProjectChartComponent;
  let fixture: ComponentFixture<UserProjectChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserProjectChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProjectChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
