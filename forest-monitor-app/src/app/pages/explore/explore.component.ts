import {
  Component,
  OnInit,
  HostListener,
  ElementRef,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Store, select } from '@ngrx/store';
import { AuthState } from '../auth/auth.state';
import { Router } from '@angular/router';

/**
 * Explore Component
 * Initialization component of the spatial data visualization page
 */
@Component({
  templateUrl: './explore.component.html'
})
export class ExploreComponent implements OnInit, AfterViewInit {

  /** component reference toolbar */
  @ViewChild('toolbar', {static: true}) toolbar: ElementRef;
  /** component reference sidenav */
  @ViewChild('sidenav', {static: false}) sidenav: MatSidenav;

  /** toolbar component height */
  public toolbarHeight: number;
  /** map height in window */
  public innerHeight: number;
  /** map width in window */
  public innerWidth: number;

  /** select data of the store application */
  constructor(
    private store: Store<AuthState>,
    public router: Router) {
    this.store.pipe(select('auth')).subscribe(res => {
      if (!res.userId || !res.token) {
        this.router.navigate(['/auth/login']);
      }
    });
  }

  /**
   * get Height of the toolbar and footer components
   * when initialize this component
   */
  ngOnInit() {
    this.toolbarHeight = this.toolbar.nativeElement.offsetHeight;
    this.onResize('');
  }

  /**
   * get Height of the toolbar and footer components
   * after initialize this component
   */
  ngAfterViewInit() {
    this.toolbarHeight = this.toolbar.nativeElement.offsetHeight;
    setTimeout( _ => this.onResize(''));
  }

  /**
   * toggleDrawer - enable or disable the side menu of the map page
   */
  toggleDrawer() {
    this.sidenav.toggle();
    window.dispatchEvent(new Event('resize'));
  }

  /**
   * onResize - calculate the size of the map when you modify the size of the window
   * @param _ ignored - not used
   */
  @HostListener('window:resize', ['$event'])
  onResize(_: any) {
    this.innerHeight = window.innerHeight - this.toolbarHeight;
  }

}
