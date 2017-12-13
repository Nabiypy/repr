import { RePrPage } from './app.po';

describe('re-pr App', () => {
  let page: RePrPage;

  beforeEach(() => {
    page = new RePrPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
