import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageJuegoComponent } from './page-juego.component';

describe('PageJuegoComponent', () => {
  let component: PageJuegoComponent;
  let fixture: ComponentFixture<PageJuegoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageJuegoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageJuegoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
