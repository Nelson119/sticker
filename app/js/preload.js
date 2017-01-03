'use strict';
/*eslint-disable new-cap, no-unused-vars,
	no-use-before-define, no-trailing-spaces, space-infix-ops, comma-spacing,
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,no-empty,
	key-spacing ,curly, no-shadow, no-return-assign, no-redeclare, no-unused-vars,
	eqeqeq, no-extend-native, quotes , no-inner-declarations*/
/*global app, $ */
app.partial.preload = function(){

	app.dementions = {
		mobile: false,
		desktop: false
	};


	function imageReload(callback){

		var imagePreload = {}, elements = [];

		var main = $('img[data-src]:visible, figure[data-src]:visible').not('[src],[style]');
		main.each(function(idx, ele){
			if($(ele).attr('data-src')){
				imagePreload[$(ele).attr('data-src')] = false;
				elements.push(ele);
			}
		});
		
		$.each(imagePreload, function(src, stat){
			if(/\.svg$/.test(src)){

				$.get(src, function(svg){
					var ret = $(elements).filter(function(){
						return src == $(this).attr('data-src');
					}).each(function(i, ele){

						if(ele.tagName.toLowerCase() === 'img'){
							$('svg', svg).clone().insertAfter(ele);
							$(ele).remove();
						}else{
							$(ele).html($('svg', svg).clone());
						}
					});	
				});
			}else{
				var img = new Image();
				img.onload = function(){
					imagePreload[src] = true;
					var alldone = true;
					$.each(imagePreload, function($s, $done){
						alldone = $done && alldone;
					});
					var ret = $(elements).filter(function(){
						return src == $(this).attr('data-src');
					}).each(function(i, ele){
						if(ele.tagName.toLowerCase() === 'img'){
							$(ele).attr('src', $(ele).attr('data-src'));
						}else{
							$(ele).css('background-image', 'url(' + $(ele).attr('data-src') + ')');
						}
					});				

					if(alldone){
						//全部圖片下載完成
						imageLoaded();
					}
				};
				img.src = src;
			}
		});

		function imageLoaded(){
			if(typeof callback == 'function'){
				callback();
			}
		}

	}


	app.imageReload = {
		init: function(){
			$(window).on('resize', function(){
				if($('img[data-src]:visible, figure[data-src]:visible').not('[src],[style]').length && $(window).width() <=768){
					imageReload(function(){
						app.dementions.mobile = true;
					});
				} else if($('img[data-src]:visible, figure[data-src]:visible').not('[src],[style]').length && $(window).width() > 768){
					imageReload(function(){
						app.dementions.desktop = true;
					});
				}
				// if( $('html.ios').length && window.innerHeight ){
				// 	$('html, body').height(window.innerHeight);
				// }
			}).trigger('resize');
		}
	};

};	
