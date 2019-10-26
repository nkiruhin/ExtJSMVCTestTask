
Ext.define('App.controller.requisitionForm', {
    extend: 'Ext.app.Controller',

    views: ['App.view.requisitionForm'],
    models: ['App.model.requisition', 'App.model.requisitionExt'],
    view: undefined,
    values: undefined,
    editingId: undefined,
    show: function (values) {
        var Form = this.getView('App.view.requisitionForm');
        this.view = Ext.create(Form);
        if (values !== undefined && values.id !== undefined) {
            this.editingId = values.id;
            var store = this.getStore('App.model.requisitionStore');
            var reqExt = Ext.create('App.model.requisitionExt', { id: this.editingId});
            reqExt.load(
                {
                    scope: this,
                    failure: function (record, operation) {
                        Ext.MessageBox.alert('Ошибка', 'Ошибка загрузки данных ');
                    },
                    success: function (record, operation) {
                        for (prop in record.data) {
                            values["RequisitionExt." + prop] = record.data[prop]; 
                        }
                        if (this.values) {
                            this.getFormPanel().getForm().setValues(this.values);
                        }
                    }
                }
            );            
        }
        this.view.show();
        this.values = values;

      

        this.view.on('close', this.onViewClose, this);

        this.getCancelButton().on('click', this.onCancelButtonClick, this);
        this.getSaveButton().on('click', this.onSaveButtonClick, this);
    },


    refs: [
        {
            ref: 'cancelButton',
            selector: 'button#cancelButton'
        },

        {
            ref: 'saveButton',
            selector: 'button#saveButton'
        },
        {
            ref: 'formPanel',
            selector: '#formPanel'
        }],

    onCancelButtonClick: function () {
        this.cancel();
    },

    onSaveButtonClick: function () {
        this.save();
    },

    cancel: function () {
        this.view.close();
    },

    save: function () {
        var formPanel = this.getFormPanel();
        if (!formPanel.getForm().isValid()) {
            Ext.MessageBox.alert('Ошибка', 'Заполните все поля, пожалуйста');
            return;
        }

        var values = formPanel.getValues();

        if (this.editingId !== undefined) {
            values.id = this.editingId;
        }

        this.application.fireEvent('FORM_CONTROLLER_APPLY', values);
        this.cancel();
    },

    onViewClose: function () {
        this.editingId = undefined;
        this.application.fireEvent('FORM_CONTROLLER_VIEW_CLOSED');
    }
});