import {NgModule} from '@angular/core';
import {SharedModule} from './shared.module';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {CategoryResolver} from '../resolvers/category.resolver';
import {CATEGORIES_COMPONENTS} from '../components/categories.components';
import {CATEGORIES_ROUTES} from '../routes/categories.routes';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SharedModule,
        RouterModule.forChild(CATEGORIES_ROUTES)
    ],
    exports: [],
    declarations: [
        CATEGORIES_COMPONENTS
    ],
    providers: [
        CategoryResolver
    ]
})
export class CategoriesModule {

}
