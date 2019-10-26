
Ext.require([
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.util.*',
    'Ext.state.*'
]);



Ext.Loader.setPath('App', 'Scripts/FrontExtJS');

Ext.Loader.setConfig({
    enabled: true,
    path: { 'App': 'Scripts/FrontExtJS' }
});

Ext.onReady(function () {
    Ext.QuickTips.init();

    Ext.application({
        appFolder: 'Scripts/FrontExtJS',
        name: 'App',
        autoCreateViewport: true,
        requires: ['App.view.Viewport'],
        controllers: ['App.controller.requisition'],        
        stores: ['App.model.requisitionStore'],
       


        launch: function () {
            var vp = Ext.ComponentQuery.query('viewport')[0];
            var controller = this.getController('App.controller.requisition');
            controller.renderTo(vp);
        }
    });
});
