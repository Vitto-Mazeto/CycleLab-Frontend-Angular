import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FakechatbotComponent } from './fakechatbot.component';

describe('FakechatbotComponent', () => {
  let component: FakechatbotComponent;
  let fixture: ComponentFixture<FakechatbotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FakechatbotComponent]
    });
    fixture = TestBed.createComponent(FakechatbotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
