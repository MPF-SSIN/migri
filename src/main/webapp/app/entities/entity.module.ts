import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'questionario',
        loadChildren: () => import('./questionario/questionario.module').then(m => m.MigriQuestionarioModule),
      },
      {
        path: 'fator',
        loadChildren: () => import('./fator/fator.module').then(m => m.MigriFatorModule),
      },
      {
        path: 'questao',
        loadChildren: () => import('./questao/questao.module').then(m => m.MigriQuestaoModule),
      },
      {
        path: 'resposta',
        loadChildren: () => import('./resposta/resposta.module').then(m => m.MigriRespostaModule),
      },
      {
        path: 'lotacao',
        loadChildren: () => import('./lotacao/lotacao.module').then(m => m.MigriLotacaoModule),
      },
      {
        path: 'pessoa',
        loadChildren: () => import('./pessoa/pessoa.module').then(m => m.MigriPessoaModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class MigriEntityModule {}
