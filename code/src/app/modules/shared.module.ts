import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {SHARED_COMPONENTS} from '../components/shared.components';
import {SHARED_SERVICES} from '../services/shared.services';
import {RouterModule} from '@angular/router';

@NgModule({
    declarations: [
        ...SHARED_COMPONENTS
    ],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule
    ],
    exports: [
        ...SHARED_COMPONENTS
    ],
    providers: [
        ...SHARED_SERVICES
    ]
})
export class SharedModule {

}
