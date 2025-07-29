import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferCardsComponent } from './transfer-cards.component';

describe('TransferCardsComponent', () => {
  let component: TransferCardsComponent;
  let fixture: ComponentFixture<TransferCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransferCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
