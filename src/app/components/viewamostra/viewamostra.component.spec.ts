import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewamostraComponent } from './viewamostra.component';

describe('ViewamostraComponent', () => {
  let component: ViewamostraComponent;
  let fixture: ComponentFixture<ViewamostraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewamostraComponent]
    });
    fixture = TestBed.createComponent(ViewamostraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
