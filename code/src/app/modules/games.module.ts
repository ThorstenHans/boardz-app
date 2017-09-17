import {NgModule} from '@angular/core';
import {SharedModule} from './shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {GameResolver} from '../resolvers/game.resolver';
import {GAMES_COMPONENTS} from '../components/games.components';
import {GAMES_ROUTES} from '../routes/games.routes';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SharedModule,
        RouterModule.forChild(GAMES_ROUTES)],

    exports: [],
    declarations: [
        GAMES_COMPONENTS
    ],
    providers: [
        GameResolver
    ]
})
export class GamesModule {

}
