Ext.define('App.model.requisition', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',   
    fields: [
        { name: 'Id', type: 'int' },
        { name: 'Subject', type: 'string' },
        {
            name: 'requisitionExt',
            reference: 'App.model.requisitionExt',
            unique: true
        }
    ]
});
Ext.define('App.model.requisitionExt', {
    extend: 'Ext.data.Model',
    idProperty: 'id',

    fields: [
        { name: 'id' },
        { name: 'Number', type: 'int' },
        { name: 'CreateDate', type: 'date' },
        { name: 'OrganizationName', type: 'string' },
        { name: 'UserName', type: 'string' },
        { name: 'Position', type: 'string' },
        { name: 'Email', type: 'string' }
    ],
    proxy: {
        allowSingle: true,
        type: 'rest',
        url: 'http://localhost:51807/api/Requisition',
        reader: {
            type: 'json',
            rootProperty: 'RequisitionExt'
        }
    }
});


