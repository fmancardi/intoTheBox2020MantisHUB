/**
 * MHB-005.bannerUserName.js 
 * @author Francisco Mancardi [francisco.mancardi@tesisquare.com] 
 * @author Francisco Mancardi [francisco.mancardi@gmail.com]  
 */

/* ------------------------------------------------------ */
import { Selector } from 'testcafe';
require('module-alias/register');
const sw = require('@common/ta-env.js');
const path = require('path');
var whoami = path.basename(__filename).replace('.js','');

const targetURL = sw.getOpt.getBaseURL(process.cwd());
var fxn = __dirname.split("/test/").pop();
fixture(fxn).page(targetURL);
/* ------------------------------------------------------ */

let pom = {};
pom.login = require('@pom/login_page.js');
pom.nvbb = require('@pom/navBarButtons.js');
pom.mvp = require('@pom/my_view_page.js');

const login_page = new pom.login.login_page();
const navBarButtons = new pom.nvbb.navBarButtons();
const my_view_page = new pom.mvp.my_view_page();


/* One Test */
test
  .meta({'TCID': '','WKFSTATUS': 'ready'})
  (whoami, async t => {        

    var username = 'administrator';
    var op = await sw.login.login({user: username, 
                                   password: 'intothebox'});
    await t.expect(op.status).eql('ok','Unexpected Login Failure');

    var uf = 'Step get user name from breadcrum';
    var stepOK = sw.stdOutLog.tilde + uf;
    console.log(uf);
    console.log('Expected result: ' + username);
    var ident = await my_view_page.getIdentity();
    await t.expect(username).eql(ident.username,'Failed!');
    console.log(stepOK);

});
