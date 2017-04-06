import { MyProjectPage } from './app.po';

describe('my-project App', () => {
  let page: MyProjectPage;

  beforeEach(() => {
    page = new MyProjectPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('my works!');
  });
});
