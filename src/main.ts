import { loadManifest } from "@angular-architects/module-federation";
import { environment } from "./environments/environment";

loadManifest("./assets/manifest/" + environment.env + "/mf.manifest.json")
	.catch((err) => console.warn(err))
	.then((_) => import("./bootstrap"))
	.catch((err) => console.error(err));
