Ext.define('App.view.requisitions', {
    extend: 'Ext.grid.Panel',
    title: 'Редактирование списка заявок',
    itemId: 'requisitionsGrid',
    width: 1024,
    height: 450,
    columns: [
        {
            text: 'Идентификатор',
            width: 100,
            sortable: true,
            hideable: false,
            dataIndex: 'Id'
        },
        {
            text: 'Описание',
            width: 850,
            sortable: true,
            hideable: false,
            dataIndex: 'Subject'
        },
        {
            xtype: 'actioncolumn',
            width: 70,
            items: [
                {
                    iconCls: 'x-fa fa-pencil-square-o',
                    tooltip: 'Edit',
                    handler: function (grid, rowIndex, colIndex) {
                        var rec = grid.getStore().getAt(rowIndex);
                        this.fireEvent('REQ_EDITED', rec);
                    }
                }, {
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete',
                    handler: function (grid, rowIndex, colIndex) {
                        var rec = grid.getStore().getAt(rowIndex);
                        grid.getStore().remove(rec);
                        grid.getStore().sync();
                    }
                }
            ]
        }
    ],

    initComponent: function () {
        this.callParent(arguments);
    },

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [
            {
                xtype: 'button',
                name: 'add',
                text: 'Добавить заявку',
                itemId: 'addRequisitionsButton'
            },
            {
                xtype: 'button',
                name: 'refresh',
                text: 'Обновить',
                itemId: 'refreshRequisitionsButton'
            }
        ]
    }, {
        xtype: 'pagingtoolbar',
            store: Ext.data.StoreManager.get("App.model.requisitionStore"),
        dock: 'bottom',
        displayInfo: true,
        beforePageText: 'Страница',
        afterPageText: 'из {0}',
        displayMsg: '{0} - {1} из {2}'
    }]
});
