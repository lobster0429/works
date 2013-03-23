function xx(t){console.log(t);}

(function($){
  
	window.MyTab = function ( root ) {
		
		this.root = $(root);
		this.prepare();
		this.observe();
	}
	
	window.MyTab.prototype = {
		
		prepare : function () {
			
			this.tab = this.root.find('a')
			this.box = $('.main')
		},
		
		observe : function () {
			
			this.tab.on( 'click', $.proxy( this.show, this ) );
		
		},
		
		show : function ( event ) {
			
			var nowTab = $(event.currentTarget);
			var nowBox = $(event.currentTarget).attr('name');

			this.tab.removeClass( 'selected' );
			nowTab.addClass( 'selected' );
			
			this.box.hide().each( function () {
				if( $(this).attr('id') === nowBox ){
					$(this).show();
				}
			});
			
			return false;
		}
		
	}
	
	
	window.Count = function ( root ) {
	
		this.root = $(root);
		this.prepare();
		this.observe();
		
	}
	
	window.Count.prototype = {
	
		prepare : function () {
			
			this.fill = this.root.find('.fill');
			this.count = this.root.find('.count');
			this.result = this.root.find('.result');
		},
		
		observe : function () {
			
			this.count.on( 'click', $.proxy( this.check, this ) );
			
		},
		
		check : function () {
			
			var self = this;
			var num = parseInt( $('.num').val() );
			var hr  = parseInt( $('.hr').val() );
			
			this.fill.each( function () {
				
				var getVal =  $(this).val()
				
				if( getVal === '' ||  getVal <= 0 || isNaN(getVal) || hr > 24  ){
					
					self.fill.val('');
					$('.result').html( '請填入正確數值' );
					return false;
				
				}
				
				var oCost =  parseInt(( 215 / 24 * num * hr )  * 365 * 2 + ( 200 * 2 * num ));
					var lCost =  parseInt(( 55 / 24 * num * hr ) * 365 * 2 );
					var saveMoney = oCost - lCost;
					
					function addCommas(nStr) {
						nStr += '';
						var x = nStr.split('.');
						var x1 = x[0];
						var x2 = x.length > 1 ? '.' + x[1] : '';
						var rgx = /(\d+)(\d{3})/;
						while (rgx.test(x1)) {
							x1 = x1.replace(rgx, '$1' + ',' + '$2');
						}
						return x1 + x2;
					}

					var finalNum =  addCommas( saveMoney );
					
					$('.getLength').html( finalNum );
					var numberLength = $('.getLength').width();
					xx(numberLength);
					
					$('.result').html( "改用 LED燈管二年可省<br>NT$<input type=\"text\" readonly=\"readonly\" class=\"final\" style=\"width:" + numberLength + "px\" value=\"" + finalNum + "\" >元" );
			});
			
			
			
			
		}
	
	}
	
	
	var ledTab = new MyTab( 'menu' );
	var ledCount = new Count( '#count' );
  
})(jQuery);