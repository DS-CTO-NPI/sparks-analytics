import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { ModalModule } from "ngx-bootstrap/modal";
import { NgxSpinnerModule } from "ngx-spinner";
import { PageNotFoundModule } from "./des-page-not-found/page-not-found.module";
import { COMPONENTS } from "./index";

@NgModule({
	declarations: [...COMPONENTS],
	imports: [CommonModule, FormsModule, TranslateModule, ModalModule.forRoot(), NgxSpinnerModule, PageNotFoundModule, RouterModule],
	exports: [...COMPONENTS]
})
export class ComponentsModule {}
