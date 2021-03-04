import { element, by, ElementFinder } from 'protractor';

export class QuestionarioComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-questionario div table .btn-danger'));
  title = element.all(by.css('jhi-questionario div h2#page-heading span')).first();
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

export class QuestionarioUpdatePage {
  pageTitle = element(by.id('jhi-questionario-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  identificacaoInput = element(by.id('field_identificacao'));
  dataRealizacaoInput = element(by.id('field_dataRealizacao'));

  lotacaoSelect = element(by.id('field_lotacao'));
  pessoaSelect = element(by.id('field_pessoa'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setIdentificacaoInput(identificacao: string): Promise<void> {
    await this.identificacaoInput.sendKeys(identificacao);
  }

  async getIdentificacaoInput(): Promise<string> {
    return await this.identificacaoInput.getAttribute('value');
  }

  async setDataRealizacaoInput(dataRealizacao: string): Promise<void> {
    await this.dataRealizacaoInput.sendKeys(dataRealizacao);
  }

  async getDataRealizacaoInput(): Promise<string> {
    return await this.dataRealizacaoInput.getAttribute('value');
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

  async pessoaSelectLastOption(): Promise<void> {
    await this.pessoaSelect.all(by.tagName('option')).last().click();
  }

  async pessoaSelectOption(option: string): Promise<void> {
    await this.pessoaSelect.sendKeys(option);
  }

  getPessoaSelect(): ElementFinder {
    return this.pessoaSelect;
  }

  async getPessoaSelectedOption(): Promise<string> {
    return await this.pessoaSelect.element(by.css('option:checked')).getText();
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

export class QuestionarioDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-questionario-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-questionario'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
