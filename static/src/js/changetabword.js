/** @odoo-module **/

import { WebClient } from "@web/webclient/webclient";
import { patch } from "@web/core/utils/patch";
import { session } from "@web/session";
import rpc from 'web.rpc';

//Allows the name of the odoo word to be changed on the browser tab
patch(WebClient.prototype, "module_name.WebClient", {
    setup() {
            this._super.apply(this, arguments);
            var domain = session.user_companies.allowed_companies;
            this.title.setParts({ zopenerp: "GO ERP" }); // zopenerp is easy to grep
            var obj = this;
            var def = rpc.query({
                fields: ['name','id',],
                model: 'res.config.settings',
                method: 'current_company_id',
                args: [domain, domain],
            })
                .then(function (result) {
                const app_system_name = session.app_system_name || 'GO ERP';
                obj.title.setParts({ zopenerp: result }); // zopenerp is easy to grep
            });
    }
});