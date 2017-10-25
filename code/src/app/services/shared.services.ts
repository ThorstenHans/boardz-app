import { DesktopCameraService } from './camera/dekstop.camera.service';
import { MobileCameraService } from './camera/mobile.camera.service';
import { CameraService } from './camera/camera.service';
import { RuntimeService } from './infrastructure/runtime.service';
import { GeolocationService } from './geolocation.service';

export function cameraServiceFactory(runtimeService: RuntimeService): CameraService {
    return runtimeService.isMobile ? new MobileCameraService() : new DesktopCameraService();
}

export const SHARED_SERVICES = [
    { provide: CameraService, useFactory: cameraServiceFactory, deps: [RuntimeService] },
    GeolocationService
];
