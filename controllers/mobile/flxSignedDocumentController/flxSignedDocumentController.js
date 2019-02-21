define({ 

	onViewCreated: function(){
	  var me = this;
	  this.view.btnUpload.onClick = function(button, context){
		var id = context.widgetInfo.selectedRowItems[0].id;
		var pos = id.lastIndexOf('-');
		var envelopeId = id.substring(0, pos);
		var documentId = id.substring(pos + 1);
		
		var parentView = context.widgetInfo.parent;
		
	  	kony.application.showLoadingScreen(null, 'Uploading file...', null, true, false, null);
		
		mvcApp.s3Service = mvcApp.s3Service || KNYMobileFabric.getIntegrationService(mvcApp.s3ServiceName);
		mvcApp.s3Service.invokeOperation('getDocFromDocusignAndUploadToS3', {}, {
		  envelopeId: envelopeId,
		  documentId: documentId
		}, function success(response){
		  
		  mvcApp.dbService.invokeOperation('novartis_dev_set_document_as_uploaded', {}, {
			document_id: id,
			s3Url: response.documentUrl
		  }, function success(){
			kony.application.dismissLoadingScreen();

			var envelopeInfo = {
			  id: parentView.lblId.text,
			  title: parentView.lblTitle.text,
			  creation_time: parentView.lblCreationTime.text,
			  status: parentView.lblStatus.text,
			  recipient: parentView.lblRecipient.text,
			  url: parentView.lblUrl.text,
			  signed_time: parentView.lblSignedTime.text
			};

			new kony.mvc.Navigation('frmPdf').navigate({envelopeInfo: envelopeInfo, documentUrl: response.documentUrl});
			
		  }, function failure(result){
			kony.application.dismissLoadingScreen();
			alert('Failure: ' + JSON.stringify(result));
		  });
		}, function failure(response){
		  kony.application.dismissLoadingScreen();
		  alert('Failure: ' + JSON.stringify(response));
		});
	  };
	}
});