import { StaffManagementToolPage } from './app.po';

describe('staff-management-tool App', () => {
  let page: StaffManagementToolPage;

  beforeEach(() => {
    page = new StaffManagementToolPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
