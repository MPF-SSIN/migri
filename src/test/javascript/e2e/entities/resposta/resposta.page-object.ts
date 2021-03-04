import { element, by, ElementFinder } from 'protractor';

export class RespostaComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-resposta div table .btn-danger'));
  title = element.all(by.css('jhi-resposta div h2#page-heading span')).first();
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

export class RespostaUpdatePage {
  pageTitle = element(by.id('jhi-resposta-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  textoInput = element(by.id('field_texto'));
  scoreInput = element(by.id('field_score'));
  selecionadoInput = element(by.id('field_selecionado'));

  questaoSelect = element(by.id('field_questao'));
  respostaSelect = element(by.id('field_resposta'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setTextoInput(texto: string): Promise<void> {
    await this.textoInput.sendKeys(texto);
  }

  async getTextoInput(): Promise<string> {
    return await this.textoInput.getAttribute('value');
  }

  async setScoreInput(score: string): Promise<void> {
    await this.scoreInput.sendKeys(score);
  }

  async getScoreInput(): Promise<string> {
    return await this.scoreInput.getAttribute('value');
  }

  getSelecionadoInput(): ElementFinder {
    return this.selecionadoInput;
  }

  async questaoSelectLastOption(): Promise<void> {
    await this.questaoSelect.all(by.tagName('option')).last().click();
  }

  async questaoSelectOption(option: string): Promise<void> {
    await this.questaoSelect.sendKeys(option);
  }

  getQuestaoSelect(): ElementFinder {
    return this.questaoSelect;
  }

  async getQuestaoSelectedOption(): Promise<string> {
    return await this.questaoSelect.element(by.css('option:checked')).getText();
  }

  async respostaSelectLastOption(): Promise<void> {
    await this.respostaSelect.all(by.tagName('option')).last().click();
  }

  async respostaSelectOption(option: string): Promise<void> {
    await this.respostaSelect.sendKeys(option);
  }

  getRespostaSelect(): ElementFinder {
    return this.respostaSelect;
  }

  async getRespostaSelectedOption(): Promise<string> {
    return await this.respostaSelect.element(by.css('option:checked')).getText();
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

export class RespostaDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-resposta-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-resposta'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
