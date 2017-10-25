import {DesktopCameraService} from './camera/dekstop.camera.service';
import {MobileCameraService} from './camera/mobile.camera.service';
import {CameraService} from './camera/camera.service';
import {RuntimeService} from './infrastructure/runtime.service';
import {GeolocationService} from './geolocation.service';

// IJS Demo Hook

export const SHARED_SERVICES = [
    // IJS Demo Hook
    {provide: CameraService, useClass: DesktopCameraService},
    GeolocationService
];
