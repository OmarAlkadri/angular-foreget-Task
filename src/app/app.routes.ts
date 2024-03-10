import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/pages/layout/layout.component';
import { shipmentAdding } from './components/pages/shipmentAdding/shipmentAdding.component';
import { shipmentList } from './components/pages/shipmentList/shipmentList.component';
import { createUser } from './components/pages/createUser/createUser.component';
import { authFunctionGuard } from './auth-function.guard';
import { modeAdding } from './components/pages/modeAdding/modeAdding.component';
import { modeList } from './components/pages/modeList/modeList.component';
import { MovementTypeAdding } from './components/pages/movementTypeAdding/movementTypeAdding.component';
import { MovementTypeList } from './components/pages/movementTypeList/movementTypeList.component';
import { PackageTypeAdding } from './components/pages/packageTypeAdding/packageTypeAdding.component';
import { PackageTypeList } from './components/pages/packageTypeList/packageTypeList.component';
import { IncotermsAdding } from './components/pages/incotermsAdding/incotermsAdding.component';
import { IncotermsList } from './components/pages/incotermsList/incotermsList.component';
import { SecondUnitsAdding } from './components/pages/secondUnitsAdding/secondUnitsAdding.component';
import { SecondUnitsList } from './components/pages/secondUnitsList/secondUnitsList.component';
import { UnitFirstsAdding } from './components/pages/unitFirstsAdding/unitFirstsAdding.component';
import { UnitFirstsList } from './components/pages/unitFirstsList/unitFirstsList.component';
import { CurrencyAdding } from './components/pages/currencyAdding/currencyAdding.component';
import { CurrencyList } from './components/pages/currencyList/currencyList.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'create-user', component: createUser, canActivate: [authFunctionGuard] },
    {
        path: 'home', component: LayoutComponent,
        children: [{
            path: 'shipment-adding',
            component: shipmentAdding,
            canActivate: [authFunctionGuard]
        },
        {
            path: 'shipment-list',
            component: shipmentList,
            canActivate: [authFunctionGuard]
        },
        {
            path: 'mode-adding',
            component: modeAdding,
            canActivate: [authFunctionGuard]
        },
        {
            path: 'mode-list',
            component: modeList,
            canActivate: [authFunctionGuard]
        },
        {
            path: 'movementtype-adding',
            component: MovementTypeAdding,
            canActivate: [authFunctionGuard]
        },
        {
            path: 'movementtype-list',
            component: MovementTypeList,
            canActivate: [authFunctionGuard]
        },


        {
            path: 'packagetype-adding',
            component: PackageTypeAdding,
            canActivate: [authFunctionGuard]
        },
        {
            path: 'packagetype-list',
            component: PackageTypeList,
            canActivate: [authFunctionGuard]
        },
        {
            path: 'incoterms-adding',
            component: IncotermsAdding,
            canActivate: [authFunctionGuard]
        },
        {
            path: 'incoterms-list',
            component: IncotermsList,
            canActivate: [authFunctionGuard]
        },
        {
            path: 'secondunit-adding',
            component: SecondUnitsAdding,
            canActivate: [authFunctionGuard]
        },
        {
            path: 'secondunit-list',
            component: SecondUnitsList,
            canActivate: [authFunctionGuard]
        },
        {
            path: 'unitfirst-adding',
            component: UnitFirstsAdding,
            canActivate: [authFunctionGuard]
        },
        {
            path: 'unitfirst-list',
            component: UnitFirstsList,
            canActivate: [authFunctionGuard]
        },
        {
            path: 'currency-adding',
            component: CurrencyAdding,
            canActivate: [authFunctionGuard]
        },
        {
            path: 'currency-list',
            component: CurrencyList,
            canActivate: [authFunctionGuard]
        },


        { path: 'add-new-user', component: createUser, canActivate: [authFunctionGuard] },
        ],
    },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];
