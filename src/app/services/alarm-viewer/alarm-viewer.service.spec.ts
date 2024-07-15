import { TestBed } from "@angular/core/testing";
import { AlarmViewerService } from "./alarm-viewer.service";

describe("AlarmViewerServiceService", () => {
  let service: AlarmViewerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlarmViewerService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
