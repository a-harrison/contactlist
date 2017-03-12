import { MeanContactlistAngular2CarbonPage } from './app.po';

describe('mean-contactlist-angular2-carbon App', function() {
  let page: MeanContactlistAngular2CarbonPage;

  beforeEach(() => {
    page = new MeanContactlistAngular2CarbonPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
