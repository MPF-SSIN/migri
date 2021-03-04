import { element, by, ElementFinder } from 'protractor';

export class FatorComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-fator div table .btn-danger'));
  title = element.all(by.css('jhi-fator div h2#page-heading span')).first();
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

export class FatorUpdatePage {
  pageTitle = element(by.id('jhi-fator-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nomeInput = element(by.id('field_nome'));
  pontuacaoInput = element(by.id('field_pontuacao'));

  questionarioSelect = element(by.id('field_questionario'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNomeInput(nome: string): Promise<void> {
    await this.nomeInput.sendKeys(nome);
  }

  async getNomeInput(): Promise<string> {
    return await this.nomeInput.getAttribute('value');
  }

  async setPontuacaoInput(pontuacao: string): Promise<void> {
    await this.pontuacaoInput.sendKeys(pontuacao);
  }

  async getPontuacaoInput(): Promise<string> {
    return await this.pontuacaoInput.getAttribute('value');
  }

  async questionarioSelectLastOption(): Promise<void> {
    await this.questionarioSelect.all(by.tagName('option')).last().click();
  }

  async questionarioSelectOption(option: string): Promise<void> {
    await this.questionarioSelect.sendKeys(option);
  }

  getQuestionarioSelect(): ElementFinder {
    return this.questionarioSelect;
  }

  async getQuestionarioSelectedOption(): Promise<string> {
    return await this.questionarioSelect.element(by.css('option:checked')).getText();
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

export class FatorDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-fator-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-fator'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
