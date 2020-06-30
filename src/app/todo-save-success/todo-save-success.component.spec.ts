import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TODOSaveSuccessComponent } from './todo-save-success.component';

describe('TODOSaveSuccessComponent', () => {
  let component: TODOSaveSuccessComponent;
  let fixture: ComponentFixture<TODOSaveSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TODOSaveSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TODOSaveSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
