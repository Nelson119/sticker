'use strict';
/*eslint-disable new-cap, no-unused-vars,
	no-use-before-define, no-trailing-spaces, space-infix-ops, comma-spacing,
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,no-empty,
	key-spacing ,curly, no-shadow, no-return-assign, no-redeclare, no-unused-vars,
	eqeqeq, no-extend-native, quotes , no-inner-declarations*/
/*global app, $, html2canvas */
app.partial.form = function(){


	var container = $('#container');
	container.on('page:update:form' , function(page, menu){
	});

	if($('#content.form').length){
		$('#container').trigger('page:update:form', null);
	}

};
