Ext.define('App.view.requisitionForm', {
    extend: 'Ext.window.Window',
    id: 'requisitionWindow',
    border: 0,
    height: 450,
    width: 600,
    resizable: false,
    modal: true,
    closable: false,
    title: 'Редактирование/создание заявок',
    layout: 'fit',
   
    items: [
        {
            xtype: 'form',
            layout: 'column',
            itemId: 'formPanel',
            fieldDefaults: {
                labelAlign: 'left',
                labelWidth: 115,
                msgTarget: 'side'
            },
            defaults: {
                columnWidth: 1,
                allowBlank: false,
                style: {
                    marginBottom: '15px'
                }
            },
            bodyStyle: {
                padding: '15px'
            },
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'Описание',
                    name: 'Subject'
                },
                {
                xtype: 'fieldset',
                title: 'Дополнительно',
                collapsible: true,
                defaults: {
                    labelWidth: 90,
                    anchor: '100%',
                    layout: 'hbox'
                },
                    items: [{
                             xtype: 'hiddenfield',
                             fieldLabel: 'Id',
                             name: 'RequisitionExt.Id'
                            },
                            {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Номер',
                            combineErrors: true,
                            msgTarget: 'side',
                            defaults: {
                                hideLabel: true,
                                margin: '0 5 0 0'
                            },
                            items: [{
                                xtype: 'textfield',
                                fieldLabel: 'Номер заявки',
                                name: 'RequisitionExt.Number',
                                width: 45,
                                allowBlank: false,
                                maxLength: 3,
                                enforceMaxLength: true,
                                maskRe: /[0-9.]/
                            }, { xtype: 'displayfield',value: 'Дата'},
                            {
                                    xtype: 'datefield',
                                    name: 'RequisitionExt.CreateDate',
                                    width: 353,
                                    fieldLabel: 'Дата',
                                    margin: '0 5 0 0',
                                    allowBlank: false
                            }
                            ]
                        },
                        
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Организация',
                            name: 'RequisitionExt.OrganizationName',
                            allowBlank: false
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'ФИО пользователя',
                            name: 'RequisitionExt.UserName',
                            allowBlank: false
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Должность',
                            name: 'RequisitionExt.Position',
                            allowBlank: false
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Email',
                            name: 'RequisitionExt.Email',
                            vtype: 'email',
                            msgTarget: 'side',
                            allowBlank: false
                        }
                    ]
                }
            ]
        }
    ],

    buttons: [{
        text: 'Сохранить',
        itemId: 'saveButton',
        handler: function () {

        }
    }, {
        text: 'Отмена',
        itemId: 'cancelButton',
        handler: function () {


        }
    }]


});
