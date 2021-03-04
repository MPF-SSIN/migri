import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MigriSharedModule } from 'app/shared/shared.module';
import { QuestionarioComponent } from './questionario.component';
import { QuestionarioDetailComponent } from './questionario-detail.component';
import { QuestionarioUpdateComponent } from './questionario-update.component';
import { QuestionarioDeleteDialogComponent } from './questionario-delete-dialog.component';
import { questionarioRoute } from './questionario.route';

@NgModule({
  imports: [MigriSharedModule, RouterModule.forChild(questionarioRoute)],
  declarations: [QuestionarioComponent, QuestionarioDetailComponent, QuestionarioUpdateComponent, QuestionarioDeleteDialogComponent],
  entryComponents: [QuestionarioDeleteDialogComponent],
})
export class MigriQuestionarioModule {}
