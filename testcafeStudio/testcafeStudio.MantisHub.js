/* testcafeStudio.MantisHub.js */
import { Selector } from 'testcafe';

fixture `New Fixture`
    .page `https://intothebox.mantishub.io/login_page.php`;

test('testcafe-studio-mantishub', async t => {
    await t
        .typeText(Selector('#username'), 'administrator')
        .click(Selector('[class^="width-40 pull-right btn btn-success btn-inverse bi"]'))
        .typeText(Selector('#password'), 'intothebox')
        .click(Selector('[class^="width-40 pull-right btn btn-success btn-inverse bi"]'))
        .click(Selector('.menu-icon.fa.fa-list-alt'))
        .click(Selector('#view_state_filter'))
        .click(Selector('.input-xs[name="view_state"]'))
        .click(Selector('option').withText('public'))
        .click(Selector('#filters_form_open').find('[name="filter_submit"]'))
        .click(Selector('#filter-toggle').find('i'))
        .click(Selector('#filter-toggle').find('i'))
        .click(Selector('#view_state_filter'))
        .click(Selector('.input-xs[name="view_state"]'))
        .click(Selector('option').withText('private'))
        .click(Selector('#filters_form_open').find('[name="filter_submit"]'))
        .click(Selector('#filter-toggle').find('i'))
        .click(Selector('a').withText('0000002'))
        .expect(Selector('.bug-reporter').nth(1).find('a').withText('administrator').innerText).eql(administrator)
        .expect(Selector('#view-issue-details').find('td').withText('private').textContent).eql()
        .click(Selector('.ace-icon.fa.fa.fa-question.bigger-150'))
        .click(Selector('a').withText('administrator').find('.ace-icon.fa.fa-angle-down'))
        .click(Selector('a').withText('Logout'));
});