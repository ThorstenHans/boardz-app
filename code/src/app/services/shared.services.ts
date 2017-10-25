import { DesktopCameraService } from './camera/dekstop.camera.service';
import { MobileCameraService } from './camera/mobile.camera.service';
import { CameraService } from './camera/camera.service';
import { RuntimeService } from './infrastructure/runtime.service';
import { GeolocationService } from './geolocation.service';

// ijs demo hook: cordova 2

export const SHARED_SERVICES = [
    // ijs demo hook: cordova 3
    { provide: CameraService, useClass: DesktopCameraService},
    GeolocationService
];
