import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MigriSharedModule } from 'app/shared/shared.module';
import { LotacaoComponent } from './lotacao.component';
import { LotacaoDetailComponent } from './lotacao-detail.component';
import { LotacaoUpdateComponent } from './lotacao-update.component';
import { LotacaoDeleteDialogComponent } from './lotacao-delete-dialog.component';
import { lotacaoRoute } from './lotacao.route';

@NgModule({
  imports: [MigriSharedModule, RouterModule.forChild(lotacaoRoute)],
  declarations: [LotacaoComponent, LotacaoDetailComponent, LotacaoUpdateComponent, LotacaoDeleteDialogComponent],
  entryComponents: [LotacaoDeleteDialogComponent],
})
export class MigriLotacaoModule {}
