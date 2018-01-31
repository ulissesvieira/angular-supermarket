import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralSearchDialogComponent } from './general-search-dialog.component';

describe('GeneralSearchDialogComponent', () => {
   let component: GeneralSearchDialogComponent;
   let fixture: ComponentFixture<GeneralSearchDialogComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [GeneralSearchDialogComponent]
      })
         .compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(GeneralSearchDialogComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});
