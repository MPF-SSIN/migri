import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MigriSharedModule } from 'app/shared/shared.module';
import { FatorComponent } from './fator.component';
import { FatorDetailComponent } from './fator-detail.component';
import { FatorUpdateComponent } from './fator-update.component';
import { FatorDeleteDialogComponent } from './fator-delete-dialog.component';
import { fatorRoute } from './fator.route';

@NgModule({
  imports: [MigriSharedModule, RouterModule.forChild(fatorRoute)],
  declarations: [FatorComponent, FatorDetailComponent, FatorUpdateComponent, FatorDeleteDialogComponent],
  entryComponents: [FatorDeleteDialogComponent],
})
export class MigriFatorModule {}
