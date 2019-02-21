define({ 
  
  onViewCreated: function(){
  },

  onNavigate: function(data){
	this.view.bwsPdf.requestURLConfig = {
	  URL: data.documentUrl
	};
	
	this.view.btnBack.onClick = function(){
       new kony.mvc.Navigation('frmEnvelopeInfo').navigate(data.envelopeInfo);  
	};

  }
});