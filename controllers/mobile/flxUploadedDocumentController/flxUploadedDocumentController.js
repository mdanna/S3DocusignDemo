define({ 
	onViewCreated: function(){
	  var me = this;
	  
	  this.view.btnViewDocument.onClick = function(button, context){
		var parentView = context.widgetInfo.parent;
			var envelopeInfo = {
			  id: parentView.lblId.text,
			  title: parentView.lblTitle.text,
			  creation_time: parentView.lblCreationTime.text,
			  status: parentView.lblStatus.text,
			  recipient: parentView.lblRecipient.text,
			  url: parentView.lblUrl.text,
			  signed_time: parentView.lblSignedTime.text
			};

			new kony.mvc.Navigation('frmPdf').navigate({
			  envelopeInfo: envelopeInfo, 
			  documentUrl: context.widgetInfo.data[context.rowIndex].S3Url
			});
	  };
	}	  
});