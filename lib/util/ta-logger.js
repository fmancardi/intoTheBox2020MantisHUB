/**
 * ta-logger.js
 * TestAutomation LOGGER wrapper
 *
 */

require('module-alias/register');

export const tracer = require('tracer');
export var logger = tracer.console(
      { format : "({{file}}:{{line}}) {{message}} ",
        preprocess :  function(data){
                        if( data.args.length > 1 ) {
                          // 0 -> function name
                          data.file += ':' + data.args[0];
                          data.args[0]='';  
                        }
                    }
      }               
      );

/**
 *
 */
export function setLoggerBehaviour(tracer,whoami) {
  var doChecks = true;
  if( typeof process.env.DO_LOG != 'undefined' ) {
    var zi = process.env.DO_LOG.split(',');
    if( zi.indexOf(whoami) >= 0 ) {
      doChecks = false;
    }
  } 

  if( doChecks && typeof process.env.HIDE_LOG != 'undefined' ) {
    var zi = process.env.HIDE_LOG.split(',');
    console.log(zi.indexOf(whoami));
    if( zi.indexOf(whoami) >= 0 ) {
      doChecks = false;
      tracer.close();
    }
  }

  if( doChecks ) {
    if( typeof process.env.RUN_MODE == 'undefined' ) {
      tracer.close();
    } else {
      switch (process.env.RUN_MODE) {
        case 'test':
        break;

        case 'prod':
        default:
          tracer.close();
        break;
      }
    }  
  }
}


/**
 *
 */
export function getLoggerConfig(tracer) {
  var settings = {do: [],donot: []};
  if( typeof process.env.DO_LOG != 'undefined' ) {
    settings.do = process.env.DO_LOG.split(',');
  } 

  if( typeof process.env.HIDE_LOG != 'undefined' ) {
    settings.donot = process.env.HIDE_LOG.split(',');
  }

  return settings;
}
