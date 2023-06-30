import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddamostraComponent } from './addamostra.component';

describe('AddamostraComponent', () => {
  let component: AddamostraComponent;
  let fixture: ComponentFixture<AddamostraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddamostraComponent]
    });
    fixture = TestBed.createComponent(AddamostraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
