$(document).ready(domReady);

		function domReady(){
		$("input").powerTip();		
		
		$("#message").keyup(function() {
				var input = ($(this).val().length);
				$("#result").html(input);
			})		
 };