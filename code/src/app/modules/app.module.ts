import {NgModule} from '@angular/core';
import {SharedModule} from './shared.module';
import {GamesModule} from './games.module';
import {HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {RootComponent} from '../components/root/root.component';
import {CategoriesModule} from './categories.module';
import {ROOT_COMPONENTS} from '../components/root.components';
import {ROOT_DIRECTIVES} from '../directives/root.directives';
import {ROOT_SERVICES} from '../services/root.services';
import {ROOT_ROUTES} from '../routes/root.routes';


@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        ReactiveFormsModule,
        RouterModule.forRoot(ROOT_ROUTES, {useHash: true}),
        SharedModule,
        GamesModule,
        CategoriesModule
    ],
    exports: [],
    declarations: [
        ...ROOT_COMPONENTS,
        ...ROOT_DIRECTIVES
    ],
    providers: [
        ...ROOT_SERVICES
    ],
    bootstrap: [RootComponent]
})
export class AppModule {

}
