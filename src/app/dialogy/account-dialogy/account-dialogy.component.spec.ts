import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDialogyComponent } from './account-dialogy.component';

describe('AccountDialogyComponent', () => {
  let component: AccountDialogyComponent;
  let fixture: ComponentFixture<AccountDialogyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountDialogyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountDialogyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
