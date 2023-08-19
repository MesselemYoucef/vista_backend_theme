//Allows the word Odoo to disapear from the browser tab
/** @odoo-module **/

import { WebClient } from "@web/webclient/webclient";
import { patch } from "@web/core/utils/patch";
import { session } from "@web/session";

patch(WebClient.prototype, "Your custom module.WebClient", {
setup() {
this._super.apply(this, arguments);
const app_system_name = 'GO';
this.title.setParts({ zopenerp: app_system_name }); // zopenerp is easy to grep
}
});