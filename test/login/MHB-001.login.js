/**
 * MHB-001.login.js 
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
pom.nvbb = require('@pom/widgets/navBarButtons.js');

const login_page = new pom.login.login_page();
const navBarButtons = new pom.nvbb.navBarButtons();


/* One Test */
test
  .meta({'TCID': '','WKFSTATUS': 'ready'})
  (whoami, async t => {        
    var op = await sw.login.login({user: 'administrator', 
                                   password: 'intothebox'});
    await t.expect(op.status).eql('ok','Unexpected Login Failure');
    await t.expect(navBarButtons.ux.actionNewIssue.exists).ok();
});
