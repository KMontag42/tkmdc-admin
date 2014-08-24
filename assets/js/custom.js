(function($) {

// prettyPhoto
	$(document).ready(function(){
		$('a[data-gal]').each(function() {
			$(this).attr('rel', $(this).data('gal'));
		});  	
		$("a[data-rel^='prettyPhoto']").prettyPhoto({animationSpeed:'slow',theme:'light_square',slideshow:false,overlay_gallery: false,social_tools:false,deeplinking:false});
	});

})(jQuery);