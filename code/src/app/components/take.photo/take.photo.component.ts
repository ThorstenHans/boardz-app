import {Component, EventEmitter, Output} from '@angular/core';

import {CameraService} from '../../services/camera/camera.service';

@Component({
    selector: 'app-take-photo',
    templateUrl: 'take.photo.component.html'
})
export class TakePhotoComponent {
    @Output()
    private onPictureTaken: EventEmitter<string> = new EventEmitter<string>();

    public pictureUrl: string;
    public hasError: boolean;

    constructor(private _cameraService: CameraService) {
    }

    public takePicture() {
        this.hasError = false;

        this._cameraService.getPhoto()
            .subscribe(
                picture => this.onPictureTaken.emit(this.pictureUrl = picture),
                () => this.hasError = true
            );
    }
}
