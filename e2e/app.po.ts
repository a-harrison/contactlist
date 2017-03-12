import { browser, element, by } from 'protractor';

export class MeanContactlistAngular2CarbonPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
