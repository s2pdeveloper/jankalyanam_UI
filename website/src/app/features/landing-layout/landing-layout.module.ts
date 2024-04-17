import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingLayoutRoutingModule } from './landing-layout-routing.module';
import { LandingLayoutComponent } from './landing-layout.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutComponent } from './components/about/about.component';
import { GalleryComponent } from './components/gallery/gallery.component';

@NgModule({
  declarations: [LandingLayoutComponent, HeaderComponent, FooterComponent, AboutComponent, GalleryComponent],
  imports: [CommonModule, LandingLayoutRoutingModule],
  exports: [FooterComponent, HeaderComponent],
})
export class LandingLayoutModule {}
