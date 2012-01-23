(function($){
	
	$.fn.Validation = function(options) {		
		var defaults = { 			 
			 autosubmit: true,
			 onBefore:function(){},
			 onError:function(){},
			 onSuccess : function(){}
		}
		//Extend options 
		this.options = $.extend(defaults, options);
				
		this.form = this;		
		var that  = this;		
		this.form.bind("submit", function(){					
			return that.Submit();				
		});	
		
		return this;
	
	},
	
	$.fn.Submit = function( ){	
		
		this.options.onBefore.call(this,this);		
		
		if( this.isValid() ){						
				this.options.onSuccess.call(this,this.collection);					
				if( this.options.autosubmit ){								
					return true;						
				}else{						
					return false;
				}
			}			
		return false;			
	},
	
	$.fn.isValid = function(){
		
		var that = this;		
		this.collection = $("input[required=required]") ;		
		this.error =  new Array(); 	
		
		$.each( this.collection, function(i,e){				
			if( e.value == '' ){												
				that.error.push( e );
			}					
		});		
		
		if( that.error.length == 0 ){				
			return true;		
		}else{				
			$.each(this.error,function(i,e){						
				$(e).addClass('errorInput');						
			});			
			this.options.onError.call(this,this.error);					
			return false;				
		}					
		return false;		
	}
		
})(jQuery);  