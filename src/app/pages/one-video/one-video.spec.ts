import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneVideo } from './one-video';

describe('OneVideo', () => {
  let component: OneVideo;
  let fixture: ComponentFixture<OneVideo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OneVideo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OneVideo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
