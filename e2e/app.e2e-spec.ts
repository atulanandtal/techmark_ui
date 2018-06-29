import { FiveCPage } from './app.po';

describe('five-c App', () => {
  let page: FiveCPage;

  beforeEach(() => {
    page = new FiveCPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
