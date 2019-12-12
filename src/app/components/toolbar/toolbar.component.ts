import {AfterViewInit, Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {MatSidenav} from '@angular/material/sidenav';
import {Router} from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements AfterViewInit {
  @ViewChild('drawer', {static: false}) drawer: MatSidenav;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit(): void {
    // Autofocus first element of sidenav when it is opened
    this.drawer.openedChange.subscribe(() => {
      this.focusElement('nav1');
    });
    this.arrowNavigation('nav', 1, 4);
  }

  navigate(url: string): void {
    this.router.navigate([url]).then(() => {
        this.closeDrawer();
      }
    );
  }

  getElement(id: string): any {
    return this.renderer.selectRootElement('#' + id, true);
  }

  focusElement(id: string): void {
    this.getElement(id).focus();
  }

  arrowNavigation(id: string, start: number, end: number): void {
    if (end - start > 1) {
      for (let i = start; i <= end; i++) {
        const current = this.getElement(id + i);
        const next = i === end ? id + start : id + (i + 1);
        const previous = i === start ? id + end : id + (i - 1);

        this.renderer.listen(current, 'keydown', (e: KeyboardEvent) => {
          if (e.code === 'ArrowDown' || e.code === 'ArrowRight') {
            this.focusElement(next);
          }
          if (e.code === 'ArrowUp' || e.code === 'ArrowLeft') {
            this.focusElement(previous);
          }
        });
      }
    }
  }

  closeDrawer(): void {
    this.drawer.close();
    this.focusElement('menu');
  }
}
