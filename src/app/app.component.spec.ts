import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AppComponent } from './app.component';
import { configService } from './services/config/config.service';

describe('Component: AppComponent', function () {
  let el: HTMLElement;
  let de: DebugElement;
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  // beforeEach(async(() => {
  //   configService.loadInstance('./base/site/test-config.json', 'test').then(() => {
  //     TestBed.configureTestingModule({
  //       declarations: [
  //           AppComponent
  //       ],
  //       providers: [ {provide: 'configService', useFactory: () => configService.getInstance()} ],
  //       imports: [ RouterTestingModule ]
  //     })
  //     .compileComponents();
  //   });
  // }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(AppComponent);
  //   comp = fixture.componentInstance;
  //   de = fixture.debugElement.query(By.css('h1'));
  // });

  // it('should create component', () => {
  //   expect(comp).toBeDefined();
  // });

  // it('should have expected <h1> text', () => {
  //   fixture.detectChanges();
  //   const h1 = de.nativeElement;
  //   expect(h1.innerText).toMatch(/test/i);
  // });
});
