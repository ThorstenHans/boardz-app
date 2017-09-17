import {GameResolver} from '../resolvers/game.resolver';
import {GamesDetailsComponent} from '../components/games.details/games.details.component';
import {GamesListComponent} from '../components/games.list/games.list.component';
import {AuthenticatedGuard} from '../guards/authenticated.guard';
import {GamesRootComponent} from '../components/games.root/games.root.component';

export const GAMES_ROUTES = [

    {
        path: 'games',
        component: GamesRootComponent,
        canActivate: [AuthenticatedGuard],
        children: [
            {path: 'all', component: GamesListComponent, data: {displayName: 'Game overview'}},
            {
                path: 'new',
                component: GamesDetailsComponent,
                data: {displayName: 'Create a new game'}
            },
            {
                path: 'details/:id',
                component: GamesDetailsComponent,
                resolve: {game: GameResolver},
                data: {displayName: 'Game details'}
            }
        ]
    }

];
