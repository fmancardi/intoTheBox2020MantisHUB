/* taiko --load mantisHubLogin.js */
const { openBrowser, goto, textBox, into, write, $, 
        click, closeBrowser } = require('taiko');

/* CRITIC to be able to continue to interact
   with browser from taiko console */        
const { repl } = require('taiko/recorder');

/* -------------------------------------- */
(async () => {
    try {
        await openBrowser();
        await goto('https://intothebox.mantishub.io/');
        await write("administrator", into(textBox({id: "username"})));
        await click($('#login-form > fieldset > input[type="submit"]'));
        await write("intothebox", into(textBox({id: "password"})));
        await click($('#login-form > fieldset > input[type="submit"]'));

        /* Launch taiko REPL */
        await repl();

    } catch (error) {
        console.error(error);
    } finally {
      console.log('Hi! You can use the browser');
      console.log('When you will finish => CTRL-C to stop this script');
    }
})();
