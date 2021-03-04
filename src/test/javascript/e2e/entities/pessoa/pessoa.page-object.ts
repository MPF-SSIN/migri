import { element, by, ElementFinder } from 'protractor';

export class PessoaComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-pessoa div table .btn-danger'));
  title = element.all(by.css('jhi-pessoa div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class PessoaUpdatePage {
  pageTitle = element(by.id('jhi-pessoa-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nomeInput = element(by.id('field_nome'));
  cpfInput = element(by.id('field_cpf'));
  dataNascimentoInput = element(by.id('field_dataNascimento'));
  matriculaInput = element(by.id('field_matricula'));

  lotacaoSelect = element(by.id('field_lotacao'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNomeInput(nome: string): Promise<void> {
    await this.nomeInput.sendKeys(nome);
  }

  async getNomeInput(): Promise<string> {
    return await this.nomeInput.getAttribute('value');
  }

  async setCpfInput(cpf: string): Promise<void> {
    await this.cpfInput.sendKeys(cpf);
  }

  async getCpfInput(): Promise<string> {
    return await this.cpfInput.getAttribute('value');
  }

  async setDataNascimentoInput(dataNascimento: string): Promise<void> {
    await this.dataNascimentoInput.sendKeys(dataNascimento);
  }

  async getDataNascimentoInput(): Promise<string> {
    return await this.dataNascimentoInput.getAttribute('value');
  }

  async setMatriculaInput(matricula: string): Promise<void> {
    await this.matriculaInput.sendKeys(matricula);
  }

  async getMatriculaInput(): Promise<string> {
    return await this.matriculaInput.getAttribute('value');
  }

  async lotacaoSelectLastOption(): Promise<void> {
    await this.lotacaoSelect.all(by.tagName('option')).last().click();
  }

  async lotacaoSelectOption(option: string): Promise<void> {
    await this.lotacaoSelect.sendKeys(option);
  }

  getLotacaoSelect(): ElementFinder {
    return this.lotacaoSelect;
  }

  async getLotacaoSelectedOption(): Promise<string> {
    return await this.lotacaoSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class PessoaDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-pessoa-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-pessoa'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
