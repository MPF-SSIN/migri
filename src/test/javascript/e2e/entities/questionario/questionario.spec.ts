import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { QuestionarioComponentsPage, QuestionarioDeleteDialog, QuestionarioUpdatePage } from './questionario.page-object';

const expect = chai.expect;

describe('Questionario e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let questionarioComponentsPage: QuestionarioComponentsPage;
  let questionarioUpdatePage: QuestionarioUpdatePage;
  let questionarioDeleteDialog: QuestionarioDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Questionarios', async () => {
    await navBarPage.goToEntity('questionario');
    questionarioComponentsPage = new QuestionarioComponentsPage();
    await browser.wait(ec.visibilityOf(questionarioComponentsPage.title), 5000);
    expect(await questionarioComponentsPage.getTitle()).to.eq('migriApp.questionario.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(questionarioComponentsPage.entities), ec.visibilityOf(questionarioComponentsPage.noResult)),
      1000
    );
  });

  it('should load create Questionario page', async () => {
    await questionarioComponentsPage.clickOnCreateButton();
    questionarioUpdatePage = new QuestionarioUpdatePage();
    expect(await questionarioUpdatePage.getPageTitle()).to.eq('migriApp.questionario.home.createOrEditLabel');
    await questionarioUpdatePage.cancel();
  });

  it('should create and save Questionarios', async () => {
    const nbButtonsBeforeCreate = await questionarioComponentsPage.countDeleteButtons();

    await questionarioComponentsPage.clickOnCreateButton();

    await promise.all([
      questionarioUpdatePage.setIdentificacaoInput('identificacao'),
      questionarioUpdatePage.setDataRealizacaoInput('2000-12-31'),
      questionarioUpdatePage.lotacaoSelectLastOption(),
      questionarioUpdatePage.pessoaSelectLastOption(),
    ]);

    expect(await questionarioUpdatePage.getIdentificacaoInput()).to.eq(
      'identificacao',
      'Expected Identificacao value to be equals to identificacao'
    );
    expect(await questionarioUpdatePage.getDataRealizacaoInput()).to.eq(
      '2000-12-31',
      'Expected dataRealizacao value to be equals to 2000-12-31'
    );

    await questionarioUpdatePage.save();
    expect(await questionarioUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await questionarioComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Questionario', async () => {
    const nbButtonsBeforeDelete = await questionarioComponentsPage.countDeleteButtons();
    await questionarioComponentsPage.clickOnLastDeleteButton();

    questionarioDeleteDialog = new QuestionarioDeleteDialog();
    expect(await questionarioDeleteDialog.getDialogTitle()).to.eq('migriApp.questionario.delete.question');
    await questionarioDeleteDialog.clickOnConfirmButton();

    expect(await questionarioComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
