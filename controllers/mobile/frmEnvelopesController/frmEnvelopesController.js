define({ 

	onViewCreated: function(){
	  var me = this;
	  
	  kony.application.showLoadingScreen(null, 'Loading...', null, true, false, null);

	  me.view.segEnvelopes.widgetDataMap = {
		lblTitle: 'title',
		lblCreationTime: 'creation_time',
		lblStatus: 'status',
		lblRecipient: 'recipient'
	  };
	  
	  me.view.segEnvelopes.onRowClick = function(){
		new kony.mvc.Navigation('frmEnvelopeInfo').navigate(me.view.segEnvelopes.selectedRowItems[0]);
	  };

	  mvcApp.dbService = mvcApp.dbService || KNYMobileFabric.getIntegrationService(mvcApp.dbServiceName); 
	  
	  mvcApp.dbService.invokeOperation('novartis_dev_envelopes_get', {}, {}, function onSuccess(response){
		var items = response.envelopes;
		me.view.segEnvelopes.setData(items);
		kony.application.dismissLoadingScreen();
	  }, function onFailure(response){
		kony.application.dismissLoadingScreen();
		alert(JSON.stringify(response));
	  });

	}
});