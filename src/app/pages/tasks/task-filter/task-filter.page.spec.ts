import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskFilterPage } from './task-filter.page';

describe('TaskFilterPage', () => {
  let component: TaskFilterPage;
  let fixture: ComponentFixture<TaskFilterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskFilterPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskFilterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
