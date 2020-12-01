import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { InfiniteScrollLoadMoreDirective } from './share/directive/infinity-scroll.directive';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, HelloComponent,InfiniteScrollLoadMoreDirective ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
