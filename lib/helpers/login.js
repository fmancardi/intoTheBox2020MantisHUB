/**
 * login.js
 * generic login method
 *
 */
var { Selector, t } = require('testcafe');
const getOpt = require('@helpers/getOpt.js');

const path = require('path');
var whoami = path.basename(__filename);
var {logger,tracer,setLoggerBehaviour} = require('@common/ta-logger.js');
setLoggerBehaviour(tracer,whoami);

let pom = {};
pom.login = require('@pom/login_page.js');
pom.pwd = require('@pom/login_password_page.js');
const login_page = new pom.login.login_page();
const login_password = new pom.pwd.login_password();

/**
 *
 */
async function login(login) {
  const _$f = 'login()';

  const userlogin = login_page.ux.username;
  const password = login_password.ux.password;
  const askPassword = login_page.ux.goButton;
  const checkUserAndPassword = login_password.ux.goButton;
  const loginFailure = {"status": "ko"};

  var replaceText = { replace: true };
  await t.typeText(userlogin, login.user, replaceText);
  await t.click(askPassword);

  // Have we reached the password page?
  if( !await password.exists ) {
    return loginFailure;
  }

  // Go ahead
  var cleanPwd = false;
  var pwd = '';
  if (login.password != undefined) {
    pwd = login.password.trim(); 
  } 
 
  if (pwd == '') {
    await t.selectText(password).pressKey('delete');
  } else {
    logger.log(_$f,'password:',login.password);
    await t.typeText(password, pwd, replaceText);    
  } 
  await t.click(checkUserAndPassword);

  // If we have returned to the login page
  // login has failed.
  if (await userlogin.exists) {
    // damm it!
    return loginFailure;
  } 

  login.status = 'ok';
  return login;
}


/**
 *
 */
async function loginTo(login) {
  const _$f = 'loginTo';

  const userlogin = Selector('#userlogin');
  const password = Selector('#password');
  const loginButton = Selector('#login');

  await t.typeText( userlogin, login.user);

  logger.log(_$f,'login credentials',login);
  if( typeof login.password == 'undefined' ) {
    login.password = 'qqq';
  }

  if( await password.exists ) {
    logger.log(_$f,'password:',login.password);
    await t.typeText(password, login.password);
  }
  await t.click(loginButton);

  // Now we have logged in!!
  if( typeof login.language == 'undefined' ) {
    login.language = "Italian";
  }

  var safeL = login.language.trim();
  logger.log(_$f,'Going to change language to:',safeL);
  await pageHeader.setLanguage(safeL);
}


/**
 *
 */
async function logout() {

  const logoutIcon = await Selector('.fa.fa-power-off.fa-lg');
  const logoutBtn = await Selector('#btn-logout');
  let clickOK = false;

  if (await logoutBtn.exists && await logoutBtn.visible) {
    clickOK = true;
    await t.click(logoutBtn);
  }

  if (clickOK == false) {
    if (await logoutIcon.exists && await logoutIcon.visible) {
      clickOK = true;
     await t.click(logoutIcon);
    }
  }

  if (clickOK == false) {
    await t.expect(true).eql(false,'Logout Button is not present');
  }

}

module.exports.login = login;
module.exports.loginTo = loginTo;
module.exports.logout = logout;

