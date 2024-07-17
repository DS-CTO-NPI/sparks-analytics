import { Component } from "@angular/core";
import { environment } from "src/environments/environment";
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: "des-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"]
})
export class AppComponent {

	constructor(
		
		public translate: TranslateService) {
		  translate.addLangs(['en', 'french']);
		  translate.setDefaultLang('en');
		  translate.use('en');
	
		 /*  if(sessionStorage.getItem('hems-selectedLang')==='English')
		  this.translate.use('en')
		  else if(sessionStorage.getItem('hems-selectedLang')==='French')
		  this.translate.use('fr')
		  else{
			this.translate.use('en')
		  } */
		  const application = {
			NAME: environment.name,
			DESCRIPTION: environment.description,
			VERSION: environment.version,
			APP_ID: environment.appId
		};
		sessionStorage.setItem("application", JSON.stringify(application));
		}
}
