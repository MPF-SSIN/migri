import { element, by, ElementFinder } from 'protractor';

export class QuestaoComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-questao div table .btn-danger'));
  title = element.all(by.css('jhi-questao div h2#page-heading span')).first();
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

export class QuestaoUpdatePage {
  pageTitle = element(by.id('jhi-questao-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  tipoInput = element(by.id('field_tipo'));
  recomendacaoInput = element(by.id('field_recomendacao'));
  perguntaInput = element(by.id('field_pergunta'));
  multiploInput = element(by.id('field_multiplo'));

  fatorSelect = element(by.id('field_fator'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setTipoInput(tipo: string): Promise<void> {
    await this.tipoInput.sendKeys(tipo);
  }

  async getTipoInput(): Promise<string> {
    return await this.tipoInput.getAttribute('value');
  }

  async setRecomendacaoInput(recomendacao: string): Promise<void> {
    await this.recomendacaoInput.sendKeys(recomendacao);
  }

  async getRecomendacaoInput(): Promise<string> {
    return await this.recomendacaoInput.getAttribute('value');
  }

  async setPerguntaInput(pergunta: string): Promise<void> {
    await this.perguntaInput.sendKeys(pergunta);
  }

  async getPerguntaInput(): Promise<string> {
    return await this.perguntaInput.getAttribute('value');
  }

  getMultiploInput(): ElementFinder {
    return this.multiploInput;
  }

  async fatorSelectLastOption(): Promise<void> {
    await this.fatorSelect.all(by.tagName('option')).last().click();
  }

  async fatorSelectOption(option: string): Promise<void> {
    await this.fatorSelect.sendKeys(option);
  }

  getFatorSelect(): ElementFinder {
    return this.fatorSelect;
  }

  async getFatorSelectedOption(): Promise<string> {
    return await this.fatorSelect.element(by.css('option:checked')).getText();
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

export class QuestaoDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-questao-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-questao'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
