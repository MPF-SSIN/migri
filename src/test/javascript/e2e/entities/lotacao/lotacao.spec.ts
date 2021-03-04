import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { LotacaoComponentsPage, LotacaoDeleteDialog, LotacaoUpdatePage } from './lotacao.page-object';

const expect = chai.expect;

describe('Lotacao e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let lotacaoComponentsPage: LotacaoComponentsPage;
  let lotacaoUpdatePage: LotacaoUpdatePage;
  let lotacaoDeleteDialog: LotacaoDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Lotacaos', async () => {
    await navBarPage.goToEntity('lotacao');
    lotacaoComponentsPage = new LotacaoComponentsPage();
    await browser.wait(ec.visibilityOf(lotacaoComponentsPage.title), 5000);
    expect(await lotacaoComponentsPage.getTitle()).to.eq('migriApp.lotacao.home.title');
    await browser.wait(ec.or(ec.visibilityOf(lotacaoComponentsPage.entities), ec.visibilityOf(lotacaoComponentsPage.noResult)), 1000);
  });

  it('should load create Lotacao page', async () => {
    await lotacaoComponentsPage.clickOnCreateButton();
    lotacaoUpdatePage = new LotacaoUpdatePage();
    expect(await lotacaoUpdatePage.getPageTitle()).to.eq('migriApp.lotacao.home.createOrEditLabel');
    await lotacaoUpdatePage.cancel();
  });

  it('should create and save Lotacaos', async () => {
    const nbButtonsBeforeCreate = await lotacaoComponentsPage.countDeleteButtons();

    await lotacaoComponentsPage.clickOnCreateButton();

    await promise.all([
      lotacaoUpdatePage.setNomeInput('nome'),
      lotacaoUpdatePage.setSiglaInput('sigla'),
      lotacaoUpdatePage.setLatitudeInput('5'),
      lotacaoUpdatePage.setLongitudeInput('5'),
    ]);

    expect(await lotacaoUpdatePage.getNomeInput()).to.eq('nome', 'Expected Nome value to be equals to nome');
    expect(await lotacaoUpdatePage.getSiglaInput()).to.eq('sigla', 'Expected Sigla value to be equals to sigla');
    expect(await lotacaoUpdatePage.getLatitudeInput()).to.eq('5', 'Expected latitude value to be equals to 5');
    expect(await lotacaoUpdatePage.getLongitudeInput()).to.eq('5', 'Expected longitude value to be equals to 5');

    await lotacaoUpdatePage.save();
    expect(await lotacaoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await lotacaoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Lotacao', async () => {
    const nbButtonsBeforeDelete = await lotacaoComponentsPage.countDeleteButtons();
    await lotacaoComponentsPage.clickOnLastDeleteButton();

    lotacaoDeleteDialog = new LotacaoDeleteDialog();
    expect(await lotacaoDeleteDialog.getDialogTitle()).to.eq('migriApp.lotacao.delete.question');
    await lotacaoDeleteDialog.clickOnConfirmButton();

    expect(await lotacaoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
