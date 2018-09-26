import { BrowserModule } from '@angular/platform-browser';
import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { TimerComponent } from './timer/timer.component';

@NgModule({
  declarations: [
    TimerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  entryComponents: [ TimerComponent ]
})
export class AppModule {
  constructor(private injector: Injector) {
    const customTimer = createCustomElement(TimerComponent, { injector });
    customElements.define('custom-timer', customTimer);
  }

  ngDoBootstrap() {}
}
