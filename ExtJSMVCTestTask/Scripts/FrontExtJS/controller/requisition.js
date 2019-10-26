Ext.define('App.controller.requisition', {
    extend: 'Ext.app.Controller',
    stores: [
        'App.model.requisitionStore'
    ],
    views: [
        'App.view.requisitions'
    ],
    refs: [
        {
            ref: 'addButton',
            selector: 'button#addRequisitionsButton'
        }
    ],
    requires: [
        'App.controller.requisitionForm'
    ],
    grid: undefined,
    viewport: undefined,
    init: function (app) {
        console.log('requisitionControllerInit');

        this.control({
            '#requisitionsGrid actioncolumn': {
                'REQ_EDITED': function (e) {
                    var controller = this.application.getController('App.controller.requisitionForm');
                    controller.show(
                        {
                            id: e.data.Id,
                            Subject: e.data.Subject
                        }
                    );

                    this.application.on('FORM_CONTROLLER_APPLY', this.onFormControllerAddOrUpdate, this);
                    this.application.on('FORM_CONTROLLER_CLOSED', this.onFormControllerClosed, this);
                }
            }
        });

    },
    renderTo: function (viewport) {
        var store = this.getStore('App.model.requisitionStore');
        var gr = this.getView('App.view.requisitions');
        this.grid = Ext.create(gr);
        this.grid.bindStore(store);
        this.viewport = viewport;
        this.addComponent(this.grid);
        this.getAddButton().on('click', this.add, this);
    },
    addComponent: function (component) {
        this.viewport.add(component);
    },
    add: function (button) {
        var controller = this.application.getController('App.controller.requisitionForm');
        controller.show();

        this.application.on('FORM_CONTROLLER_APPLY', this.onFormControllerAddOrUpdate, this);
        this.application.on('FORM_CONTROLLER_CLOSED', this.onFormControllerClosed, this);
    },

    refresh: function (button) {
        var store = this.getStore('App.model.requisitionStore');
        store.load();
    },

    onFormControllerAddOrUpdate: function (values) {
        var store = this.getStore('App.model.requisitionStore');
     
        if (values.id === undefined) {
            var req = Ext.create('App.model.requisition');

            req.set("Id", 0);
            req.set("Subject", values.Subject);

            var reqExt = Ext.create('App.model.requisitionExt', { Id: 0 });
            for (value in values) {
                if (/^RequisitionExt\./.test(value)) {
                    reqExt.set(/^RequisitionExt\.(.*)/.exec(value)[1], values[value]);
                }
            }
            req.set("requisitionExt", reqExt);

            store.add(req);
            store.sync({
                scope: this,
                failure: function (record, operation) {
                    Ext.MessageBox.alert('Ошибка', 'Ошибка синхронизации данных ');
                },
                success: function (record, operation) {
                    store.load();        
                }
            });          
        } else {

            var reqForUpdate = store.getById(values.id);
            reqExt = Ext.create('App.model.requisitionExt');

            for (value in values) {
                if (/^RequisitionExt\./.test(value)) {
                    reqExt.set(/^RequisitionExt\.(.*)/.exec(value)[1], values[value]);
                }
            }
            reqForUpdate.set("requisitionExt", reqExt);
            reqForUpdate.set("Subject", values.Subject);
            store.sync();
        }
    },
    onFormControllerClosed: function () {
        this.application.un('FORM_CONTROLLER_APPLY', this.onFormControllerAddOrUpdate, this);
        this.application.un('FORM_CONTROLLER_CLOSED', this.onFormControllerClosed, this);
    },
});
