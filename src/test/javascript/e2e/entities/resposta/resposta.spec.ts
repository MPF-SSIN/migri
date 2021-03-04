import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { RespostaComponentsPage, RespostaDeleteDialog, RespostaUpdatePage } from './resposta.page-object';

const expect = chai.expect;

describe('Resposta e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let respostaComponentsPage: RespostaComponentsPage;
  let respostaUpdatePage: RespostaUpdatePage;
  let respostaDeleteDialog: RespostaDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Respostas', async () => {
    await navBarPage.goToEntity('resposta');
    respostaComponentsPage = new RespostaComponentsPage();
    await browser.wait(ec.visibilityOf(respostaComponentsPage.title), 5000);
    expect(await respostaComponentsPage.getTitle()).to.eq('migriApp.resposta.home.title');
    await browser.wait(ec.or(ec.visibilityOf(respostaComponentsPage.entities), ec.visibilityOf(respostaComponentsPage.noResult)), 1000);
  });

  it('should load create Resposta page', async () => {
    await respostaComponentsPage.clickOnCreateButton();
    respostaUpdatePage = new RespostaUpdatePage();
    expect(await respostaUpdatePage.getPageTitle()).to.eq('migriApp.resposta.home.createOrEditLabel');
    await respostaUpdatePage.cancel();
  });

  it('should create and save Respostas', async () => {
    const nbButtonsBeforeCreate = await respostaComponentsPage.countDeleteButtons();

    await respostaComponentsPage.clickOnCreateButton();

    await promise.all([
      respostaUpdatePage.setTextoInput('texto'),
      respostaUpdatePage.setScoreInput('5'),
      respostaUpdatePage.questaoSelectLastOption(),
      respostaUpdatePage.respostaPaiSelectLastOption(),
    ]);

    expect(await respostaUpdatePage.getTextoInput()).to.eq('texto', 'Expected Texto value to be equals to texto');
    expect(await respostaUpdatePage.getScoreInput()).to.eq('5', 'Expected score value to be equals to 5');
    const selectedSelecionado = respostaUpdatePage.getSelecionadoInput();
    if (await selectedSelecionado.isSelected()) {
      await respostaUpdatePage.getSelecionadoInput().click();
      expect(await respostaUpdatePage.getSelecionadoInput().isSelected(), 'Expected selecionado not to be selected').to.be.false;
    } else {
      await respostaUpdatePage.getSelecionadoInput().click();
      expect(await respostaUpdatePage.getSelecionadoInput().isSelected(), 'Expected selecionado to be selected').to.be.true;
    }

    await respostaUpdatePage.save();
    expect(await respostaUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await respostaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Resposta', async () => {
    const nbButtonsBeforeDelete = await respostaComponentsPage.countDeleteButtons();
    await respostaComponentsPage.clickOnLastDeleteButton();

    respostaDeleteDialog = new RespostaDeleteDialog();
    expect(await respostaDeleteDialog.getDialogTitle()).to.eq('migriApp.resposta.delete.question');
    await respostaDeleteDialog.clickOnConfirmButton();

    expect(await respostaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
