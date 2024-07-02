import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ModalModule } from "ngx-bootstrap/modal";
import { NgxSpinnerModule } from "ngx-spinner";
import { COMPONENTS } from ".";

@NgModule({
	declarations: [...COMPONENTS],
	imports: [CommonModule, FormsModule, ModalModule.forRoot(), NgxSpinnerModule, RouterModule],
	exports: [...COMPONENTS]
})
export class ComponentsModule {}
