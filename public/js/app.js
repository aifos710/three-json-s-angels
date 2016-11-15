$(document).ready(function(){

	//lenguajes
	$(document).ready(function() {
    $('select').material_select();
  });

	// 
	$('ul.tabs').tabs();
   
   var count = 0;

	$('#star').click(function(){
	    var clicked = $(this).data('clicked');

	    if ( clicked ) {
			count--;
			$("#star").removeClass("star");
			$("#counter").html(count +"Likes");
		    	
	    }else{
	       count++;
			$("#star").addClass("star");
			$("#counter").html(count +"Likes")
	    }

	    $(this).data('clicked', !clicked);
	});
	
})

