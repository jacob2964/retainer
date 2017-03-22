import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingComponent } from './landing.component';
import { SavedPostsService } from '../saved-posts/saved-posts.service';

describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;
  const mockSavedPostsService = jasmine.createSpy('SavedPostsService');

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingComponent ],
      providers: [ {provide: SavedPostsService, useValue: mockSavedPostsService } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('should contain a button that redirects the user to Reddits authorization page', () => {
    let compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    let link = compiled.querySelector('a[href=""]');
    console.log(link);
  });
});
