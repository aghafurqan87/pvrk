var winWidth = $(window).width();
var winHeight = $(window).height();

/*$('.js-carousel-1').slick({
	slidesToShow: 4,
	dots: true,
	autoplay: true,
  	autoplaySpeed: 10000,
	slidesToScroll: 1,
});*/

$('.js-carousel-1').owlCarousel({
    loop:true,
    //nav:true,
    //items: 4,
    autoplay: true,
    autoplayTimeout: 10000,
    dots: true,
    dotsEach: true,
    slideBy: 1,
    responsiveClass:true,
    responsive:{
        0:{
            items:2,
            nav:false 
        },
        768:{
            items:3,
            nav:false
        },
        1000:{
            items:4,
            nav:true,
            loop:false
        }
    }
});




$(function () {
	$('.screen-overlay.right').hover( function () {
		$('.player-wrap').removeClass('pan-left');
		$('.player-wrap').removeClass('pan-mid');
		$('.player-wrap').addClass('pan-right');
	});

	$('.screen-overlay.left').hover( function () {
		$('.player-wrap').removeClass('pan-right');
		$('.player-wrap').removeClass('pan-mid');
		$('.player-wrap').addClass('pan-left');
	});
	$('.screen-overlay.mid').hover( function () {
		$('.player-wrap').removeClass('pan-right');
		$('.player-wrap').removeClass('pan-left');
		$('.player-wrap').addClass('pan-mid');
	});

  	$('#fullpage').fullpage({
		'verticalCentered': false,
		'css3': true,
		//'sectionsColor': ['#F0F2F4', '#fff', '#fff', '#fff'],
		'navigation': true,
		'navigationPosition': 'left',
		'showActiveTooltip': true,
		'navigationTooltips': ['01 Home', '02 About us', '03 packages', '04 Experience'],
    //'anchors': ['section0', 'section1', 'section2', 'section3'],

	});
  // $('#mouse-icn').click(function(){
  //     $.fn.fullpage.moveSectionDown([1]);
  // });

});

$(window).on('load', function () {
	winDimCalc();
});

$(window).on('resize', function () {
	if(winWidth != $(window).width()){
		winDimCalc();
	}
});

function winDimCalc() {
	winWidth = $(window).width();
	winHeight = $(window).height();
}

// 2. This code loads the IFrame Player API code asynchronously.
  var tag = document.createElement('script');

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  // 3. This function creates an <iframe> (and YouTube player)
  //    after the API code downloads.
  var player;
  function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
      videoId: 'zmPzbZVUp3g',
	  playerVars: { 'autoplay': 1, 'controls': 0, 'showinfo': 0, 'iv_load_policy': 3 },
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
  }

  // 4. The API will call this function when the video player is ready.
  function onPlayerReady(event) {
    event.target.playVideo();
  }

  // 5. The API calls this function when the player's state changes.
  //    The function indicates that when playing a video (state=1),
  //    the player should play for six seconds and then stop.
  var done = false;
  function onPlayerStateChange(event) {
    // if (event.data == YT.PlayerState.PLAYING && !done) {
    //   setTimeout(stopVideo, 6000);
    //   done = true;
    // }
  }
  function stopVideo() {
    player.stopVideo();
  }