import {NgModule, Optional, SkipSelf} from '@angular/core';
import {fakeBackendProvider} from "./helper/fake-backend";
import {StorageService} from "./services/storage.service";
import {AuthorizatedGuard} from "./guards/authorizated.guard";
import { AuthAdminGuard } from './guards/authAdmin.guard';
import { AuthAgenteGuard } from './guards/authAgente.guard';
import { AuthGerenteGuard } from './guards/authGerente.guard';
import { AuthLiderGuard } from './guards/authLider.guard';

@NgModule({
  declarations: [  ],
  imports: [],
  providers: [
    StorageService,
    AuthorizatedGuard,
    AuthAdminGuard,
    AuthAgenteGuard,
    AuthGerenteGuard,
    AuthLiderGuard,
    fakeBackendProvider
  ],
  bootstrap: []
})
export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
