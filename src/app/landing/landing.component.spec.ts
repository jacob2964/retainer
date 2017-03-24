import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingComponent } from './landing.component';
import { SavedPostsService } from '../saved-posts/saved-posts.service';
import { Any } from '../../test/any';
import { SavedPostsServiceMockBuilder } from '../../test/saved-posts/saved-posts-service-mock-builder';

describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;
  const mockSavedPostsService = new SavedPostsServiceMockBuilder().build();

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

  fit('should contain a button that redirects a user to the Reddit authorization url', () => {
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    const expectedAuthorizationUrl = mockSavedPostsService.redditAuthorizationUrl;
    const link = compiled.querySelector(`a[href='${expectedAuthorizationUrl}']`);
    expect(link).toBeTruthy();
  });
});
