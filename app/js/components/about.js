'use strict';
/*eslint-disable new-cap, no-unused-vars,
	no-use-before-define, no-trailing-spaces, space-infix-ops, comma-spacing,
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,no-empty,
	key-spacing ,curly, no-shadow, no-return-assign, no-redeclare, no-unused-vars,
	eqeqeq, no-extend-native, quotes , no-inner-declarations*/
/*global app, $, html2canvas */
app.partial.about = function(){


	var container = $('#container');
	container.on('page:update:about' , function(page, menu){
		$('#metadog').on('input', function(e){
			// console.log(this.value);
			var url = this.value;
			$.getJSON("http://localhost:8000/?url=" + encodeURIComponent(url), function(response){
				// console.log(response);
				var sticker = 'https://sdl-stickershop.line.naver.jp/stickershop/v1/sticker/15864806/android/sticker.png;compress=true';
				$('#dog figure.og').attr('data-src', 'http://localhost:8000/proxy?u=' + encodeURIComponent(response.data.ogImage.url));
				$('#dog figure.sticker').attr('data-src', 'http://localhost:8000/proxy?u=' + encodeURIComponent(sticker));
				app.imageReload.init();
				$('#dog h3').html(response.data.ogTitle);
				$('#dog p').html(response.data.ogDescription);
				var img = new Image();
				img.onload = function(){
					// setInterval(function(){

					html2canvas($('#dog'), {
						onrendered: function(canvas) {
							$('.canvas').html(canvas);
							var dataURL = canvas.toDataURL();
							var capture = new Image();
							capture.src = dataURL;
							$('.capture').html(capture);
						}
					});
					// }, 2500);
				};
				img.src = 'http://localhost:8000/proxy?u=' + encodeURIComponent(response.data.ogImage.url);
			});
		});

	});

	if($('#content.about').length){
		$('#container').trigger('page:update:about', null);
	}


	function updateAmount(){
		var amount;
	}

};
