define({ 

	onNavigate: function(data){
	  var me = this;
	  
	  kony.application.showLoadingScreen(null, 'Loading...', null, true, false, null);

	  this.view.lblTitle.text = data.title || '';
	  this.view.lblCreationTime.text = data.creation_time || '';
	  this.view.lblStatus.text = data.status || '';
	  this.view.lblRecipient.text = data.recipient || '';
	  this.view.lblId.text = data.id || '';
	  this.view.lblUrl.text = data.url || '';
	  this.view.lblSignedTime.text = data.signed_time || '';
	  
	  me.view.btnBack.onClick = function(){
		new kony.mvc.Navigation('frmEnvelopes').navigate();
	  };
	  
	  me.view.segDocuments.widgetDataMap = {
		lblId: 'id',
		lblSignatureTime: 'signature_time',
		lblS3Url: 'S3Url'
	  };
	  mvcApp.dbService.invokeOperation('novartis_dev_get_envelope_documents', {}, {
		envelopeID: data.id
	  }, function onSuccess(response){
		var documents = response.records;
		var items = [];
		for(var i = 0; i < documents.length; i++){
		  var document = documents[i];
		  var item = {
			id: document.id,
			S3Url: document.S3Url || '<document not uploaded to S3>',
			signature_time: document.signature_time || '<document not signed>'
		  };
		  if(document.S3Url){
			item.template = 'flxUploadedDocument';
		  } else if(document.signature_time){
			item.template = 'flxSignedDocument';
		  } else {
			item.template = 'flxUnsignedDocument';
		  }
		  items.push(item);
		}
		me.view.segDocuments.setData(items);
		
		kony.application.dismissLoadingScreen();
	  }, function onFailure(response){
		kony.application.dismissLoadingScreen();
		alert(JSON.stringify(response));
	  });
	  
	}

});