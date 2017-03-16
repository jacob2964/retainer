import { RetainerPage } from './app.po';

describe('retainer App', () => {
  let page: RetainerPage;

  beforeEach(() => {
    page = new RetainerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
