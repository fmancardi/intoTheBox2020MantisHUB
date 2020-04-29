/**
 * ta-env.js
 * TestAutomation ENVironment
 *
 */

/* IMPORTANT: 
   this must be done at least once 
   before using any require() alias */
require('module-alias/register');

export const  login = require('@helpers/login.js');
export const  getOpt = require('@common/getOpt.js');
export const  fakerGenerator = require('faker');
export const  moment = require('moment');
export const path = require('path');

export const stdOutLog = {"prefix": "TC walk-through - ",
                          "failure": "TC Failed",
                          "tilde": "✓ ",
                          "ok": "✓ " };

/**
 * Given PPT-2600-crawler-WH-brown.js
 * 
 * Will return: {"id": "PPT-2600", 
 *               "name":"PPT-2600-crawler-WH-brown"} 
 *
 */
export function getTestCase(pathName) {
  let sep = '-';
  let sepFirstHit = pathName.indexOf(sep);
  let sepSecondHit = pathName.indexOf(sep, sepFirstHit+1)

  let idCard = {"tcid": pathName.substring(0, sepSecondHit),
                "whoami": path.basename(pathName).replace('.js','')
               }
  return idCard;
}


/**
 * Given 
 *   product-tree/PT.05.TMS.Planning/PT.05.01.TransportPlanning
 *               /PT.05.01.5.1.10-GestioneScenari
 *               /System.Feature.Acceptance/
 * 
 * Will return:  
 *   product-tree/PT.05.TMS.Planning/PT.05.01.TransportPlanning
 *
 */
export function getFixture(pathName) {
  
  var fxx = pathName.split('/');
  var fxn = '';
  var howMany = 3;
  for (let hdx=0; hdx < howMany; hdx++) {
    fxn += '/' + fxx.shift();
  }

  return fxn;
}

/** 
 * The maximum is exclusive and the minimum is inclusive 
 */
export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; 
}