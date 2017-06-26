import { MySpinnerPage } from './app.po';

describe('my-spinner App', function() {
  let page: MySpinnerPage;

  beforeEach(() => {
    page = new MySpinnerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
