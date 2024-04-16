import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { LayoutPageRoutingModule } from "./layout-routing.module";
import { IonicSelectableComponent } from "ionic-selectable";
import { LayoutPage } from "./layout.page";
import { MenuPageModule } from "./pages/menu/menu.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LayoutPageRoutingModule,
    MenuPageModule,
    SharedModule,
    IonicSelectableComponent,
    
  ],
  declarations: [LayoutPage],
})
export class LayoutPageModule {}
