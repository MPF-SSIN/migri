import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { QuestaoComponentsPage, QuestaoDeleteDialog, QuestaoUpdatePage } from './questao.page-object';

const expect = chai.expect;

describe('Questao e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let questaoComponentsPage: QuestaoComponentsPage;
  let questaoUpdatePage: QuestaoUpdatePage;
  let questaoDeleteDialog: QuestaoDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Questaos', async () => {
    await navBarPage.goToEntity('questao');
    questaoComponentsPage = new QuestaoComponentsPage();
    await browser.wait(ec.visibilityOf(questaoComponentsPage.title), 5000);
    expect(await questaoComponentsPage.getTitle()).to.eq('migriApp.questao.home.title');
    await browser.wait(ec.or(ec.visibilityOf(questaoComponentsPage.entities), ec.visibilityOf(questaoComponentsPage.noResult)), 1000);
  });

  it('should load create Questao page', async () => {
    await questaoComponentsPage.clickOnCreateButton();
    questaoUpdatePage = new QuestaoUpdatePage();
    expect(await questaoUpdatePage.getPageTitle()).to.eq('migriApp.questao.home.createOrEditLabel');
    await questaoUpdatePage.cancel();
  });

  it('should create and save Questaos', async () => {
    const nbButtonsBeforeCreate = await questaoComponentsPage.countDeleteButtons();

    await questaoComponentsPage.clickOnCreateButton();

    await promise.all([
      questaoUpdatePage.setTipoInput('tipo'),
      questaoUpdatePage.setRecomendacaoInput('recomendacao'),
      questaoUpdatePage.setPerguntaInput('pergunta'),
      questaoUpdatePage.fatorSelectLastOption(),
    ]);

    expect(await questaoUpdatePage.getTipoInput()).to.eq('tipo', 'Expected Tipo value to be equals to tipo');
    expect(await questaoUpdatePage.getRecomendacaoInput()).to.eq(
      'recomendacao',
      'Expected Recomendacao value to be equals to recomendacao'
    );
    expect(await questaoUpdatePage.getPerguntaInput()).to.eq('pergunta', 'Expected Pergunta value to be equals to pergunta');
    const selectedMultiplo = questaoUpdatePage.getMultiploInput();
    if (await selectedMultiplo.isSelected()) {
      await questaoUpdatePage.getMultiploInput().click();
      expect(await questaoUpdatePage.getMultiploInput().isSelected(), 'Expected multiplo not to be selected').to.be.false;
    } else {
      await questaoUpdatePage.getMultiploInput().click();
      expect(await questaoUpdatePage.getMultiploInput().isSelected(), 'Expected multiplo to be selected').to.be.true;
    }

    await questaoUpdatePage.save();
    expect(await questaoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await questaoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Questao', async () => {
    const nbButtonsBeforeDelete = await questaoComponentsPage.countDeleteButtons();
    await questaoComponentsPage.clickOnLastDeleteButton();

    questaoDeleteDialog = new QuestaoDeleteDialog();
    expect(await questaoDeleteDialog.getDialogTitle()).to.eq('migriApp.questao.delete.question');
    await questaoDeleteDialog.clickOnConfirmButton();

    expect(await questaoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
