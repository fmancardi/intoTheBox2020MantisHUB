/**
 * @filesource: getOpt.js
 *
 * functions to get custom command line paramenters
 *
 */
const path = require('path');
const minimist = require('minimist');

/**
 * Try to get base URL following this order
 *
 * 1. from config file
 * 2. from test cafe custom command line argument
 * 3. from the ENVironment variable (thanks to Raffaele Castagno)
 *
 */
function getBaseURL() {
  const args = minimist(process.argv.slice(2));

  var url='http://baseURL-Is-Undefined/';
  var gotIt = false;
  var cfg = getCfg();

  if( cfg != undefined ) {
    var file2include = '@root/config/' + cfg;
    var config = require(file2include);
    url = config.baseURL;
    gotIt = true;
  }

  if( gotIt == false && args.url != undefined ) {
    url = args.url
  }

  if( gotIt == false ) {
    url = process.env.baseUrl;
  }

  return url;
}


/**
 * Try to get default password from config file
 */
function getDefaultPassword() {
  const args = minimist(process.argv.slice(2));
  var cfg = getCfg();

  var passwd = null;
  var gotIt = false;

  if( cfg != undefined ) {
    var file2include = '@root/config/' + cfg;
    var config = require(file2include);
    passwd = config.defaultPassword;
  }

  return passwd;
}

/**
 * Try to get database configurationfollowing from config file
 */
function getDBCfg() {
  const args = minimist(process.argv.slice(2));
  var cfg = getCfg();

  var db = {};
  var gotIt = false;

  if( cfg != undefined ) {
    var file2include = '@root/config/' + cfg;
    var config = require(file2include);
    db = config.db;
  }

  return db;
}

/**
 * Try to get Platform Version from config file
 */
function getVersion() {
  const args = minimist(process.argv.slice(2));
  var cfg = getCfg();

  var version = 'unknown';
  var gotIt = false;

  if( cfg != undefined ) {
    var file2include = '@root/config/' + cfg;
    var config = require(file2include);
    version = config.version;
  }

  return version;
}

/**
 * Try to get default LANGuage from config file
 */
function getDefaultLang() {
  const args = minimist(process.argv.slice(2));
  var cfg = getCfg();

  var language = null;
  var gotIt = false;

  if( cfg != undefined ) {
    var file2include = '@root/config/' + cfg;
    var config = require(file2include);
    var lang = config.language;
  }

  return lang;
}


/**
 * Get configuration file name from args.
 *
 * WORKAROUND for INTELLIJ IDEA!
 * Testcafe plugin for Idea as of today does not support ENV variables nor additional parameters to testcafe
 * To overcome this limitation, I use the special ENV variable 'IDEA_INITIAL_DIRECTORY' which is present
 * when testcafe is run from within IDEA.
 * In such case, I search for an 'idea.json' file in the config directory, and read the Configuration File Name from there.
 *
 * Should not
 */
function getCfg() {
  const args = minimist(process.argv.slice(2));
  var configurationFileName = args.cfg;

  if(process.env.IDEA_INITIAL_DIRECTORY !== undefined) {
    try{
      var idea = require('@root/config/idea.json');
      configurationFileName = idea.configurationFileName;
    }
    catch(e) {
    }
  }
  return configurationFileName;
}

module.exports.getBaseURL = getBaseURL;
module.exports.getDefaultPassword = getDefaultPassword;
module.exports.getDBCfg = getDBCfg;
module.exports.getVersion = getVersion;
module.exports.getDefaultLang = getDefaultLang;
