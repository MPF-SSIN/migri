import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PessoaComponentsPage, PessoaDeleteDialog, PessoaUpdatePage } from './pessoa.page-object';

const expect = chai.expect;

describe('Pessoa e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let pessoaComponentsPage: PessoaComponentsPage;
  let pessoaUpdatePage: PessoaUpdatePage;
  let pessoaDeleteDialog: PessoaDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Pessoas', async () => {
    await navBarPage.goToEntity('pessoa');
    pessoaComponentsPage = new PessoaComponentsPage();
    await browser.wait(ec.visibilityOf(pessoaComponentsPage.title), 5000);
    expect(await pessoaComponentsPage.getTitle()).to.eq('migriApp.pessoa.home.title');
    await browser.wait(ec.or(ec.visibilityOf(pessoaComponentsPage.entities), ec.visibilityOf(pessoaComponentsPage.noResult)), 1000);
  });

  it('should load create Pessoa page', async () => {
    await pessoaComponentsPage.clickOnCreateButton();
    pessoaUpdatePage = new PessoaUpdatePage();
    expect(await pessoaUpdatePage.getPageTitle()).to.eq('migriApp.pessoa.home.createOrEditLabel');
    await pessoaUpdatePage.cancel();
  });

  it('should create and save Pessoas', async () => {
    const nbButtonsBeforeCreate = await pessoaComponentsPage.countDeleteButtons();

    await pessoaComponentsPage.clickOnCreateButton();

    await promise.all([
      pessoaUpdatePage.setNomeInput('nome'),
      pessoaUpdatePage.setCpfInput('cpf'),
      pessoaUpdatePage.setDataNascimentoInput('2000-12-31'),
      pessoaUpdatePage.setMatriculaInput('matricula'),
      pessoaUpdatePage.lotacaoSelectLastOption(),
    ]);

    expect(await pessoaUpdatePage.getNomeInput()).to.eq('nome', 'Expected Nome value to be equals to nome');
    expect(await pessoaUpdatePage.getCpfInput()).to.eq('cpf', 'Expected Cpf value to be equals to cpf');
    expect(await pessoaUpdatePage.getDataNascimentoInput()).to.eq('2000-12-31', 'Expected dataNascimento value to be equals to 2000-12-31');
    expect(await pessoaUpdatePage.getMatriculaInput()).to.eq('matricula', 'Expected Matricula value to be equals to matricula');

    await pessoaUpdatePage.save();
    expect(await pessoaUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await pessoaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Pessoa', async () => {
    const nbButtonsBeforeDelete = await pessoaComponentsPage.countDeleteButtons();
    await pessoaComponentsPage.clickOnLastDeleteButton();

    pessoaDeleteDialog = new PessoaDeleteDialog();
    expect(await pessoaDeleteDialog.getDialogTitle()).to.eq('migriApp.pessoa.delete.question');
    await pessoaDeleteDialog.clickOnConfirmButton();

    expect(await pessoaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
