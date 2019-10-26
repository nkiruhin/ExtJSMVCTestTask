Ext.define('App.model.requisitionStore', {
    extend: 'Ext.data.Store',
    model: 'App.model.requisition',
    autoLoad: true,
    //autoSync: true,
    proxy: {
        allowSingle: true,
        type: 'rest',
        url: '/api/Requisition',
        reader: {
            type: 'json',
            reader:
            {
                rootProperty: 'data',
                type: 'json'
            }
        },
        writer: {
            type: 'json',
            writeAllFields: true,
            allDataOptions: {
                associated: true,
                persist: true
            }
        }
    }
});

