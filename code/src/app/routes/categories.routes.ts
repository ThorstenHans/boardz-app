import {CategoriesRootComponent} from '../components/categories.root/categories.root.component';
import {AuthenticatedGuard} from '../guards/authenticated.guard';
import {CategoriesListComponent} from '../components/categories.list/categories.list.component';
import {CategoriesDetailsComponent} from '../components/categories.details/categories.details.component';
import {CategoryResolver} from '../resolvers/category.resolver';

export const CATEGORIES_ROUTES = [

    {
        path: 'categories',
        component: CategoriesRootComponent,
        canActivate: [AuthenticatedGuard],
        children: [
            {path: 'all', component: CategoriesListComponent, data: {displayName: 'Category overview'}},
            {
                path: 'new',
                component: CategoriesDetailsComponent,
                data: {displayName: 'Create a new category'}
            },
            {
                path: 'details/:id',
                component: CategoriesDetailsComponent,
                resolve: {category: CategoryResolver},
                data: {displayName: 'Category details'}
            }
        ]
    }

];
