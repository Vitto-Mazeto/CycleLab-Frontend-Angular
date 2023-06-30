import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditamostraComponent } from './editamostra.component';

describe('EditamostraComponent', () => {
  let component: EditamostraComponent;
  let fixture: ComponentFixture<EditamostraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditamostraComponent]
    });
    fixture = TestBed.createComponent(EditamostraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
