(function($){
	
	$.fn.Validation = function(options) {		
		var defaults = { 			 
			 autosubmit: true,
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
	
	},
	
	$.fn.Submit = function( ){	
			var collection = $( '.required' ) ;
			var error =  new Array(); 			
			$.each(collection, function(i,e){				
				if( e.value == '' ){						
					error.push( e );
				}					
			});
			
			if( error.length == 0 ){				
					this.options.onSuccess.call(this,collection);					
					if( this.options.autosubmit ){								
						return true;						
					}else{						
						return false;
					}
			}else{
				
				$.each(error,function(i,e){						
					$(e).addClass('errorInput');						
				});
				
				this.options.onError.call(this,error);					
				return false;				
			}			
		return false;			
	}
		
})(jQuery);  