var page = document.getElementById('page');
var last_pane = page.getElementsByClassName('pane');
last_pane = last_pane[last_pane.length-1];
var dummy_x = null;

window.onscroll = function () {
  // Horizontal Scroll.
  var y = document.body.getBoundingClientRect().top;
  page.scrollLeft = -y;

  // Looping Scroll.
  var diff = window.scrollY - dummy_x;

  if (diff > 0) {
    window.scrollTo(0, diff);
  }
  else if (window.scrollY == 0) {
    window.scrollTo(0, 0);
  }
}
// Adjust the body height if the window resizes.
window.onresize = resize;
// Initialize resize.
resize();

// Reset window-based vars
function resize() {
  var w = page.scrollWidth-window.innerWidth+window.innerHeight;
  document.body.style.height = w + 'px';

  dummy_x = last_pane.getBoundingClientRect().left+window.scrollY;
}

$(document).ready( function(){
	var $investClose = $(".investClose");
	var $investPopup = $("#investPopup");
	var $overlay = $(".overlay");

	// Onload, trigger popup
	$investPopup.show();
	$overlay.show();

	/* -------------------------
		MUST click close button to close popup.
	 ------------------------- */
	$investClose.click(function() {
			$investPopup.hide();
			$overlay.hide();
	});
});
