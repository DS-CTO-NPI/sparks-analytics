import { Directive, ElementRef, OnDestroy, Renderer2 } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Directive({
	selector: "[fullscreen]",
	exportAs: "fullscreen"
})
export class FullscreenDirective implements OnDestroy {
	private isMaximizedSubject = new BehaviorSubject(false);
	isMaximized$ = this.isMaximizedSubject.asObservable();

	constructor(private el: ElementRef, private renderer: Renderer2) {}
	ngOnDestroy(): void {
		this.renderer.removeClass(document.body, "disabled-scroll");
	}
	toggle() {
		this.isMaximizedSubject?.getValue() ? this.minimize() : this.maximize();
	}
	maximize() {
		if (this.el) {
			const headerHeight = this.getHeaderHeight();
			this.isMaximizedSubject.next(true);
			this.renderer.setStyle(this.el.nativeElement, "top", `${headerHeight}px`);
			this.renderer.addClass(this.el.nativeElement, "fullscreen");
			this.renderer.addClass(document.body, "disabled-scroll");
			console.log(this.getHeaderHeight());
		}
	}
	minimize() {
		if (this.el) {
			this.isMaximizedSubject.next(false);
			this.renderer.removeClass(this.el.nativeElement, "fullscreen");
			this.renderer.removeClass(document.body, "disabled-scroll");
		}
	}

	private getHeaderHeight(): number {
		const header: HTMLElement | null = document.querySelector("header");
		return header?.clientHeight || 0; // Default height if header is not found
	}
}
