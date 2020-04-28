/**
 * login_page.js
 * 
 */
import { Selector } from 'testcafe';
require('module-alias/register');
const sw = require('@common/ta-env.js');

export class my_view_page {

  /**
   *
   */
  constructor() 
  {
    this.ux = {
      trial_banner: Selector('#trial_banner'),
      breadcrumbs: Selector('#breadcrumbs')
    }
  }

  /**
   * Mantis BT generates identity this way
   *
   *  administrator ( Marie Curie )
   *
   *  "(" is forbidden in user name
   *
   * <div id="breadcrumbs" class="breadcrumbs noprint">
   *   <ul class="breadcrumb">
   *     <li>
   *       <i class="fa fa-user home-icon active"></i>  
   *       <a href="/account_page.php">administrator ( Marie Curie ) </a>
   *     <span class="label hidden-xs label-default arrowed">amministratore</span></li>
   *   </ul>
   *   <div id="nav-search" class="nav-search">
   *     <form class="form-search" method="post" 
   *        action="/jump_to_bug.php">
   *       <span class="input-icon">
   *         <input type="text" name="bug_id" autocomplete="off" 
   *           class="nav-search-input" placeholder="Anomalia #">
   *           <i class="ace-icon fa fa-search nav-search-icon"></i>
   *       </span>
   *     </form>
   *   </div>
   * </div>
   *
   */
  async getIdentity() 
  {
    var place = this.ux.breadcrumbs
                       .child('ul.breadcrumb')
                       .child('li')
                       .find('a');
    var ident;
    if (await place.exists) {
      var theText = await place.innerText;
      ident = {};
      ident.fullText = theText.trim();

      var pieces;
      var mark = "(";
      pieces = ident.fullText.split(mark);
      ident.username = pieces[0].trim();
      ident.realname = mark + pieces[1]      
    } else {
      console.log('not found');
    }
    return ident;
  }

}