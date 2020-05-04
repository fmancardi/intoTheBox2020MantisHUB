const { openBrowser, goto, textBox, into, write, $, click, closeBrowser } = require('taiko');
(async () => {
    try {
        await openBrowser();
        await goto('https://intothebox.mantishub.io/');
        await write("administrator", into(textBox({id: "username"})));
        await click($('#login-form > fieldset > input[type="submit"]'));
        await write("intothebox", into(textBox({id: "password"})));
        await click($('#login-form > fieldset > input[type="submit"]'));
    } catch (error) {
        console.error(error);
    }
})();
