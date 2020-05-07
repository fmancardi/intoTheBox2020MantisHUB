/**
 * MHB-004.loginFailure.checkMsgText.js
 * @author Francisco Mancardi [francisco.mancardi@tesisquare.com] 
 * @author Francisco Mancardi [francisco.mancardi@gmail.com]  
 */

/* ------------------------------------------------------ */
import { Selector } from 'testcafe';
require('module-alias/register');
const sw = require('@common/ta-env.js');
const stdOutLog = sw.stdOutLog;

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

    var ok = stdOutLog.tilde + stdOutLog.prefix;
    var uf = 'Test Login KO because no password will be provided';
    console.log(stdOutLog.prefix + uf);
    var op = await sw.login.login({user: 'administrator', 
                                   password: ''});

    await t.expect(op.status).eql('ko','Login Has to fail');

    uf = 'Step Check User Feedback is present';
    console.log(stdOutLog.prefix + uf);
    await t.expect(login_page.ux.loginIssues.exists).ok(uf);
    console.log(ok + uf);

    uf = 'Step Check User Feedback Text is Valid';    
    console.log(stdOutLog.prefix + uf);

    var userFeedback = 
        {"english":"Your account may be disabled or blocked or the username/password you entered is incorrect.",
         "italiano": "L'account potrebbe essere stato disabilitato o bloccato oppure potresti aver immesso un nome e/o una password errata."
        };

    var msgIsOK = false;
    var msgOnUX = await login_page.ux.loginIssues.innerText;
    msgOnUX = msgOnUX.trim();
    for (var language in userFeedback) {
      if (msgOnUX == userFeedback[language]) {
        msgIsOK = true;
        break
      }
    }    
    await t.expect(true).eql(msgIsOK,uf);
    console.log(ok + uf);
    console.log(ok + language);
});
