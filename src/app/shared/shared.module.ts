import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ModalModule } from "ngx-bootstrap/modal";
import { NgxSpinnerModule } from "ngx-spinner";
import { ProgressAnimationType, ToastrModule } from "ngx-toastr";
import { ComponentsModule } from "src/app/components/components.module";
import { CONTAINERS } from "src/app/containers";

@NgModule({
	declarations: [...CONTAINERS],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		ModalModule.forRoot(),
		ComponentsModule,
		NgxSpinnerModule,
		ToastrModule.forRoot({
			maxOpened: 1,
			timeOut: 3500,
			preventDuplicates: true,
			progressBar: true,
			progressAnimation: "increasing" as ProgressAnimationType
		}),
		RouterModule
	],
	exports: [...CONTAINERS]
})
export class SharedModule {}
