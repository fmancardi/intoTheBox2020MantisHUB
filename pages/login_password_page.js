/**
 * login_password.js
 * 
 */
import { Selector } from 'testcafe';
require('module-alias/register');
const sw = require('@common/ta-env.js');

export class login_password {
  /**
   *
   */
  constructor() {
    const fset = '#login-form > fieldset';
    this.ux = {
      password: Selector('#password'),
      rememberLogin: Selector('#remember-login'),
      siteLogo: Selector('#login-div > div.login-logo'),

      goButton: Selector(fset + ' > input[type="submit"]'),
      lostPassword: Selector( fset + ' > a')
    }
  }
}