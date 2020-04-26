/**
 * login_page.js
 * 
 */
import { Selector } from 'testcafe';
require('module-alias/register');
const sw = require('@common/ta-env.js');

export class login_page {

  /**
   *
   */
  constructor() {
    const fset = '#login-form > fieldset';
    this.ux = {
      username: Selector('#username'),
      loginIssues: Selector('#login-div > div.alert.alert-danger'),
      siteLogo: Selector('#login-div > div.login-logo'),

      goButton: Selector( fset + ' > input[type="submit"]')
    }
  }

  /**
   *
   */
  async ISeeBadLoginMessage(actor) {
    await actor.expect(this.ux.loginIssues).ok();
  }
}

/*
Your account may be disabled or blocked or the username/password you entered is incorrect.

L'account potrebbe essere stato disabilitato o bloccato oppure potresti aver immesso un nome e/o una password errata.
*/