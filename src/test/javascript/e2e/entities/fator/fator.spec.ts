import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { FatorComponentsPage, FatorDeleteDialog, FatorUpdatePage } from './fator.page-object';

const expect = chai.expect;

describe('Fator e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let fatorComponentsPage: FatorComponentsPage;
  let fatorUpdatePage: FatorUpdatePage;
  let fatorDeleteDialog: FatorDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Fators', async () => {
    await navBarPage.goToEntity('fator');
    fatorComponentsPage = new FatorComponentsPage();
    await browser.wait(ec.visibilityOf(fatorComponentsPage.title), 5000);
    expect(await fatorComponentsPage.getTitle()).to.eq('migriApp.fator.home.title');
    await browser.wait(ec.or(ec.visibilityOf(fatorComponentsPage.entities), ec.visibilityOf(fatorComponentsPage.noResult)), 1000);
  });

  it('should load create Fator page', async () => {
    await fatorComponentsPage.clickOnCreateButton();
    fatorUpdatePage = new FatorUpdatePage();
    expect(await fatorUpdatePage.getPageTitle()).to.eq('migriApp.fator.home.createOrEditLabel');
    await fatorUpdatePage.cancel();
  });

  it('should create and save Fators', async () => {
    const nbButtonsBeforeCreate = await fatorComponentsPage.countDeleteButtons();

    await fatorComponentsPage.clickOnCreateButton();

    await promise.all([
      fatorUpdatePage.setNomeInput('nome'),
      fatorUpdatePage.setPontuacaoInput('5'),
      fatorUpdatePage.questionarioSelectLastOption(),
    ]);

    expect(await fatorUpdatePage.getNomeInput()).to.eq('nome', 'Expected Nome value to be equals to nome');
    expect(await fatorUpdatePage.getPontuacaoInput()).to.eq('5', 'Expected pontuacao value to be equals to 5');

    await fatorUpdatePage.save();
    expect(await fatorUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await fatorComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Fator', async () => {
    const nbButtonsBeforeDelete = await fatorComponentsPage.countDeleteButtons();
    await fatorComponentsPage.clickOnLastDeleteButton();

    fatorDeleteDialog = new FatorDeleteDialog();
    expect(await fatorDeleteDialog.getDialogTitle()).to.eq('migriApp.fator.delete.question');
    await fatorDeleteDialog.clickOnConfirmButton();

    expect(await fatorComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
