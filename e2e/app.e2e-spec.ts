import { GstoresPage } from './app.po';

describe('gstores App', () => {
  let page: GstoresPage;

  beforeEach(() => {
    page = new GstoresPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
