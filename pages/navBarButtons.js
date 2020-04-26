/**
 * navBarButtons.js
 *
 */
import { Selector } from 'testcafe';
require('module-alias/register');
const sw = require('@common/ta-env.js');

export class navBarButtons {
  /**
   *
   */
  constructor() {
    var sc = Selector ('#navbar-container');
    var btnlmk = 'a.btn.btn-primary.btn-sm';
    this.ux = {
      container: sc,
      actionNewIssue: sc.find(btnlmk).find('i.fa.fa-edit'),
      actionInviteUsers: sc.find(btnlmk).find('i.fa.fa-user-plus')
    }
  }
}