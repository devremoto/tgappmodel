$(document).ready( function() {

	/*--------------------------------/
	/* NAVIGATION
	/*-------------------------------*/

	$(window).bind('load resize', function() {
		checkNavByScreenSize();
	});

	function checkNavByScreenSize() {
		// mobile main navigation
		if( $(window).width() < 993 ) {

			// reset padding-top since navbar-fixed-top is disabled
			$('body').css('padding-top', 0);

			// dropdown menu in navbar-fixed-top can't be scrolled, so we disabled it in mobile screen (EXCEPT for one-page template)
			if($('.navbar-default').hasClass('navbar-fixed-top') && $('.navbar-default .nav-onepage').length <= 0) {
				$('.navbar-default').removeClass('navbar-fixed-top');
			}

			// re-enable dropdown cart toggle
			$('.dropdown-cart .dropdown-toggle').removeClass('disabled');
			$('ul.main-navbar-nav > li > .dropdown-toggle').removeClass('disabled');
		} else {

			// body padding-top adjustment for page with navbar-fixed-top
			if($('.navbar').hasClass('navbar-fixed-top') && !$('.navbar').hasClass('ignore-paddingtop')) {
				$('body').css('padding-top', $('.navbar-fixed-top').innerHeight());
			}

			// re-enable navbar-fixed-top
			if($('.navbar-default').hasClass('ignore-paddingtop')) { // ignore-paddingtop class indicating that it's or it should a fixed-top nav
				$('.navbar-default').addClass('navbar-fixed-top');
			}

			// disable toggle
			$('.dropdown-cart .dropdown-toggle').addClass('disabled');
			$('ul.main-navbar-nav > li > .dropdown-toggle').addClass('disabled');
		}

		// sidebar navigation on mobile
		if($('.sidebarnav-toggle').length > 0) {
			var navWidth = $('#sidebar-nav').width();

			if( $(window).width() < 767 ) {
				$('#sidebar-nav').css({'left': -navWidth});
			} else {
				$('#sidebar-nav').css({'left': 'inherit'});
				navWidth = 0;
			}

			$('.sidebarnav-toggle').on('click', function() {
				if($('#sidebar-nav').hasClass('active')) {
					$('#sidebar-nav').css({'left': -navWidth});
					$('#sidebar-nav').removeClass('active');
				} else {
					$('#sidebar-nav').css({'left': 0});
					$('#sidebar-nav').addClass('active');
				}
			});
		}
	}

	// submenu dropdown click event
	$('ul.dropdown-menu [data-toggle=dropdown]').on('click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		$(this).parent().siblings().removeClass('open');
		$(this).parent().toggleClass('open');
	});

	// hide collapsible menu once menu item clicked
	$('.nav-onepage li a').click( function() {
		var navbarCollapse = $(this).parents('.navbar-collapse.collapse');

		if(navbarCollapse.hasClass('in')) {
			navbarCollapse.collapse('hide');
		}
	});

	// full transparent fixed-top navbar should have background when scrolled
	if($('.navbar-fixed-top.navbar-no-background').length > 0) {
		$(window).scroll(function() {
			if($(document).scrollTop() > 100) {
				$('.navbar-fixed-top').removeClass('navbar-no-background');
			}else {
				$('.navbar-fixed-top').addClass('navbar-no-background');
			}
		});
	}

	// transparent fixed-top navbar should have solid background when scrolled
	if($('.navbar-fixed-top.navbar-transparent').length > 0) {
		$(window).scroll(function() {
			if($(document).scrollTop() > 100) {
				$('.navbar-fixed-top').removeClass('navbar-transparent');
			}else {
				$('.navbar-fixed-top').addClass('navbar-transparent');
			}
		});
	}

	if($('.navbar-auto-hiding').length > 0) {
		$('.navbar-auto-hiding').autoHidingNavbar();
	}

	if($('.navbar-fixed-top.navbar-shrinkable').length > 0) {
		$(window).scroll(function() {
			if($(document).scrollTop() > 300) {
				$('.navbar-fixed-top').addClass('shrink-active');
			}else {
				$('.navbar-fixed-top').removeClass('shrink-active');
			}
		});
	}

	// scroll to top
	if( $(window).width() > 992 ) {
		$(window).scroll( function() {
			if( $(this).scrollTop() > 300 ) {
				$('.back-to-top').fadeIn();
			} else {
				$('.back-to-top').fadeOut();
			}
		});

		$('.back-to-top').click( function(e) {
			e.preventDefault();

			$('body, html').animate({
				scrollTop: 0
			}, 800, 'easeInOutExpo');
		});
	}

	// onepage scroll links
	if($('.nav-onepage').length > 0 || $('.internal-links').length > 0) {
		$('.nav-onepage, .internal-links').localScroll({
			duration: 1000,
			offset:  - ($('.navbar-fixed-top').height() + 30),
			easing: 'easeInOutExpo'
		});
	}

	if($('.nav-onepage').length > 0) {
		$('body').scrollspy({ target: '#main-navbar', offset: 120});
	}


	/*--------------------------------/
	/* SLIDER REVOLUTION
	/*-------------------------------*/

	if( $('#slider-fullscreen').length > 0 ) {
		$('#slider-fullscreen').revolution({
			sliderLayout: "fullscreen",
			delay: 6000,
			navigation: {
				onHoverStop: 'off',
				keyboardNavigation: 'on',
				touch: {
					touchenabled: "on",
					swipe_threshold: 75,
					swipe_min_touches: 1,
					swipe_direction: "horizontal",
					drag_block_vertical: false
				},
				arrows: {
					enable: true,
				},
				bullets: {
					enable: true,
					hide_onmobile: false,
					style: "hermes",
					hide_onleave: false,
					direction: "horizontal",
					h_align: "center",
					v_align: "bottom",
					h_offset: 0,
					v_offset: 30,
					space: 5,
					tmp:''
				}
			},
		});
	}


	/*--------------------------------/
	/* SIDEBAR NAVIGATION TOGGLE
	/*-------------------------------*/

	$('.submenu-toggle').click( function() {
		if(!$(this).parent().hasClass('active')) {
			$(this).parent().addClass('active');
		} else {
			$(this).parent().removeClass('active');
		}
	});

	$('.sidebar-nav a').click( function() {
		$('.sidebar-nav a').removeClass('current');
		$(this).addClass('current');
	});


	/*--------------------------------/
	/* MASKED INPUT
	/*-------------------------------*/

	if($('#masked-input-demo').length > 0) {
		$('#phone').mask('(999) 999-9999');
		$('#phone-ex').mask('(999) 999-9999? x99999');
		$('#tax-id').mask('99-9999999');
		$('#ssn').mask('999-99-9999');
		$('#product-key').mask('a*-999-a999');
	}


	/*--------------------------------/
	/* DATE PICKER
	/*-------------------------------*/

	if($('#date-picker-demo').length > 0) {
		var dtp = $('#datepicker').datepicker()
			.on('changeDate', function(e) { dtp.datepicker('hide'); });
	}


	/*--------------------------------/
	/* DATE RANGE PICKER
	/*-------------------------------*/

	if($('#date-range-picker-demo').length > 0) {

		var drInput = $('#daterange-input');

		$('#date-range-picker-demo').daterangepicker({
			startDate: drInput.attr('data-from'),
			endDate: drInput.attr('data-to'),
			ranges: {
				'Today': [moment(), moment()],
				'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
				'Last 7 Days': [moment().subtract(6, 'days'), moment()],
				'Last 30 Days': [moment().subtract(29, 'days'), moment()],
				'This Month': [moment().startOf('month'), moment().endOf('month')],
				'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
				},
			buttonClasses: ['btn btn-default'],
			applyClass: 'btn-small btn-primary',
			cancelClass: 'btn-small',
			locale: {
					format: drInput.attr('data-format'),
			}
		}, setValue);

		function setValue(start, end) {
			drInput.val( start.format(drInput.attr('data-format')) + ' - ' + end.format(drInput.attr('data-format')) );
		}
	}


	/*--------------------------------/
	/* SUMMERNOTE
	/*-------------------------------*/

	if($('#summernote-editor').length > 0) {
		$('#summernote-editor').summernote({
			height: 300,
			focus: true,
			callbacks: {
				onPaste: function(e) {
					alert('You have pasted something to the editor');
				}
			}
		});
	}


	/*--------------------------------/
	/* MARKDOWN
	/*-------------------------------*/

	if($('#markdown-editor').length > 0) {

		var initContent = '<h4>Hello there</h4> ' +
				'<p>How are you? I have below task for you :</p> ' +
					'<p>Select from this text... Click the bold on THIS WORD and make THESE ONE italic, ' +
					'link GOOGLE to google.com, ' +
					'test to insert image (and try to tab after write the image description)</p>' +
					'<p>Test Preview And ending here...</p> ' +
					'<p>Click "List"</p> Enjoy!';

		$('#markdown-editor').text(toMarkdown(initContent));
	}


	/*--------------------------------/
	/* TEXTAREA WITH COUNTER
	/*-------------------------------*/

	if($('#textarea-counter-demo').length > 0) {
		var textMax = 99;

		$('.js-textarea-help span').html(textMax + ' characters remaining');

		$('.textarea-counting').keyup(function() {
			var textLength = $('.textarea-counting').val().length;
			var textRemaining = textMax - textLength;

			$('.js-textarea-help span').html(textRemaining + ' characters remaining');
		});
	}

	/*-----------------------------------/
	/* SKILLS
	/*----------------------------------*/

	if($('.pie-chart').length > 0) {
		$('.pie-chart').easyPieChart({
			size: 180,
			barColor: '#939CA0',
			trackColor: '#f8f8f8',
			scaleColor: false,
			lineWidth: 3,
			lineCap: "square",
			animate: 2000
		});
	}


	/*-----------------------------------/
	/* COUNTDOWN
	/*----------------------------------*/

	if( $('#countdown-demo').length > 0 ){

		/* the date value below is for demo purpose only
		 * normally you would provide the value with format YYYY, MM, DD in which the countdown should stop counting
		 */
		var dateUntil = new Date(new Date().getFullYear() + 1, 01, 01);

		/*
			STOP CHANGING THE REST OF THE CODES UNLESS YOU KNOW WHAT YOU ARE DOING
		*/

		$('#countdown1').countdown({
			until: dateUntil,
		});

		$('#countdown2').countdown({
			until: dateUntil,
		});

		$('#countdown3').countdown({
			until: dateUntil,
		});

		$('#countdown4').countdown({
			until: dateUntil,
		});
	}


	/*-----------------------------------/
	/* ICON LIST
	/*----------------------------------*/

	if($('.fontawesome-icon-list').length > 0) {
		$('.fontawesome-icon-list a').on('click', function(e) {
			e.preventDefault();
		});

		new Clipboard('.fontawesome-icon-list a', {
			text: function(trigger) {
				var ahref = trigger.getAttribute('href');
				return ahref.replace('#', 'fa fa-');
			}
		}).on('success', function(e) {
			var tooltipObj = $(e.trigger).tooltip({
				title: 'copied!',
				placement: 'bottom',
				trigger: 'click',
			});

			tooltipObj.tooltip('show');
			setTimeout(function() {
				tooltipObj.tooltip('hide');
			}, 1000);
		});
	}


	/*-----------------------------------/
	/* TESTIMONIALS
	/*----------------------------------*/

	if( $('#testimonial-big-carousel').length > 0 ) {
		$('#testimonial-big-carousel').owlCarousel({
			singleItem: true,
			autoPlay: 3000,
			transitionStyle: 'fadeUp'
		});
	}

	if( $('#testimonial-standard-carousel').length > 0 ) {
		$('#testimonial-standard-carousel').owlCarousel({
			singleItem: true,
			autoPlay: 3000,
			transitionStyle: 'fade'
		});
	}

	if( $('#testimonial-slide-carousel').length > 0 ) {
		$('#testimonial-slide-carousel').owlCarousel({
			items: 3,
			pagination: false,
			slideSpeed: 800,
			autoPlay: 2000
		});
	}




	/*-----------------------------------/
	/* CAROUSELS
	/*----------------------------------*/

	if( $('#carousel-single').length > 0 ) {
		$('#carousel-single').owlCarousel({
			singleItem: true,
			navigation: true,
			slideSpeed: 800,
			autoPlay: 3000
		});
	}

	if( $('#carousel-single-fade').length > 0 ) {
		$('#carousel-single-fade').owlCarousel({
			singleItem: true,
			navigation: true,
			autoPlay: 3000,
			transitionStyle: 'fade'
		});
	}

	if( $('#carousel-images').length > 0 ) {
		$('#carousel-images').owlCarousel({
			navigation: true,
			pagination: false,
			slideSpeed: 800,
			autoPlay: 3000
		});
	}

	if( $('#content-slider').length > 0 ) {
		$('#content-slider').owlCarousel({
			singleItem: true,
			navigation: true,
			slideSpeed: 1000,
			autoPlay: 5000
		});
	}

	if( $('#content-slider2').length > 0 ) {
		$('#content-slider2').owlCarousel({
			singleItem: true,
			slideSpeed: 1000,
			autoPlay: 5000
		});
	}

	if( $('#carousel-portfolio-simple').length > 0 ) {
		$('#carousel-portfolio-simple').owlCarousel({
			items: 4,
			navigation: true,
			pagination: false,
			slideSpeed: 800,
			autoPlay: 3000
		});
	}

	if( $('#carousel-portfolio-card').length > 0 ) {
		$('#carousel-portfolio-card').owlCarousel({
			items: 3,
			navigation: true,
			slideSpeed: 800,
			autoPlay: 3000
		});
	}

	if( $('#carousel-fade-arrow').length > 0 ) {
		$('#carousel-fade-arrow').owlCarousel({
			singleItem: true,
			pagination: false,
			navigation: true,
			autoPlay: 3000,
			transitionStyle: 'fade'
		});
	}


	/*-----------------------------------/
	/* AJAX CALL FOR NEWSLETTER FUNCTION
	/*----------------------------------*/

	//$newsletter = $('.newsletter-form');
	//$newsletter.find('.btn').click( function() {
	//	$url = 'php/mailchimp.php';

	//	$attr = $newsletter.attr('action');
	//	if (typeof $attr !== typeof undefined && $attr !== false) {
	//		if($newsletter.attr('action') != '') $url = $newsletter.attr('action');
	//	}

	//	subscribe($newsletter, $url);
	//});

	function subscribe(newsletter, formUrl) {
		$btn = newsletter.find('.btn');

		$.ajax({

			url: formUrl,
			type: 'POST',
			dataType: 'json',
			cache: false,
			data: {
				email: newsletter.find('input[name="email"]').val(),
			},
			beforeSend: function(){
				$btn.addClass('loading');
				$btn.attr('disabled', 'disabled');
			},
			success: function( data, textStatus, XMLHttpRequest ){

				var className = '';

				if( data.result == true ){
					className = 'alert-success';
				}else {
					className = 'alert-danger';
				}

				newsletter.find('.alert').html( data.message )
				.removeClass( 'alert-danger alert-success' )
				.addClass( 'alert active ' + className )
				.slideDown(300);

				$btn.removeClass('loading');
				$btn.removeAttr('disabled');
			},
			error: function( XMLHttpRequest, textStatus, errorThrown ){
				console.log("AJAX ERROR: \n" + XMLHttpRequest.responseText + "\n" + textStatus);
			}
		});
	}

	if( $("#rotating-words").length > 0) {
		$("#rotating-words").Morphext({
			animation: "fadeInUp",
			separator: ",",
			speed: 3000
		});
	}


	/*-----------------------------------/
	/* AJAX CONTACT FORM
	/*----------------------------------*/

	//if($('#contact-form').length > 0) {
	//	$('#contact-form').parsley();

	//	$('#contact-form').submit( function(e) {
	//		e.preventDefault();

	//		if( !$(this).parsley('isValid') )
	//			return;

	//		$theForm = $(this);
	//		$btn = $(this).find('#submit-button');
	//		$btnText = $btn.text();
	//		$(this).parent().append('<div class="alert"></div>');
	//		$alert = $(this).parent().find('.alert');

	//		$btn.find('.loading-icon').addClass('fa-spinner fa-spin ');
	//		$btn.prop('disabled', true).find('span').text("Sending...");

	//		$url = "php/contact.php";

	//		$attr = $(this).attr('action');
	//		if (typeof $attr !== typeof undefined && $attr !== false) {
	//			if($(this).attr('action') != '') $url = $(this).attr('action');
	//		}

	//		$.post($url, $(this).serialize(), function(data){

	//			$message = data.message;

	//			if( data.result == true ){
	//				$theForm.slideUp('medium', function() {
	//					$alert.removeClass('alert-danger');
	//					$alert.addClass('alert-success').html($message).slideDown('medium');
	//				});
	//			}else {
	//				$alert.addClass('alert-danger').html($message).slideDown('medium');
	//			}

	//			$btn.find('.loading-icon').removeClass('fa-spinner fa-spin ');
	//			$btn.prop('disabled', false).find('span').text($btnText);

	//		})
	//		.fail(function() { console.log('AJAX Error'); });
	//	});
	//}


	/*----------------------------/
	/* PORTFOLIO ISOTOPE INIT
	/*---------------------------*/

	if($('.portfolio-isotope').length > 0) {
		var $container = $('.portfolio-isotope');

		$container.imagesLoaded(function() {
			var $isoObj = $container.isotope({
				itemSelector: '.portfolio-item',
				layoutMode: 'fitRows',
				transitionDuration: '0.7s'
			});

			$('.portfolio-item-filters a').click( function(e) {
				e.preventDefault();

				var selector = $(this).attr('data-filter');
				$container.isotope({
					filter: selector
				});

				$container.parent().height($container.height());

				$('.portfolio-item-filters a').removeClass('active');
				$(this).addClass('active');
			});
		});
	}


	/*----------------------------/
	/* PORTFOLIO SLIDER
	/*---------------------------*/

	if($('#portfolio-slider').length > 0) {
		$('#portfolio-slider').revolution({
			sliderLayout: 'auto',
			disableProgressBar: 'on',
			delay: 4000,
			navigation: {
				onHoverStop: 'off',
				keyboardNavigation: 'on',
				arrows: { enable: true,},
				bullets: {
					enable: true,
					style: "metis",
					hide_onleave: true,
					direction: "horizontal",
					h_align: "center",
					v_align: "bottom",
					h_offset: 20,
					v_offset: 30,
					space: 5,
					tmp: '<span class="tp-bullet-img-wrap">  <span class="tp-bullet-image"></span></span><span class="tp-bullet-title">{{title}}</span>'
				}
			},
		});
	}


	/*----------------------------/
	/* BLOG MASONRY
	/*---------------------------*/

	if($('.blog-masonry').length > 0) {
		var $container = $('.blog-masonry');
		$container.imagesLoaded(function() {
			$container.isotope({
				itemSelector: '.grid-item',
				percentPosition: true,
				masonry: {
					columnWidth: '.grid-sizer',
				}
			});
		});
	}


	/*----------------------------/
	/* FIT VIDEO
	/*---------------------------*/

	if($('.fit-video').length > 0) {
		$('.fit-video').fitVids();
	}


	/*-----------------------------------/
	/* TWITTER FETCHER
	/*----------------------------------*/

	if( $('#tweets').length > 0 ) {
		function momentDateFormatter(date, dateString) {
			return moment(dateString).fromNow();
		}

		function populateTpl(tweets){
			var element = document.getElementById('tweets');
			var html = '<ul class="list-inline">';
			for (var i = 0, lgth = tweets.length; i < lgth ; i++) {
				var tweetObject = tweets[i];

				html += '<li>'
				+ '<div class="tweet-infos">' + tweetObject.author + '</div>'
				+ '<p class="tweet-content">' + tweetObject.tweet + '</p>'
				+ '<span class="tweet-time">' + tweetObject.time  + '</span>'
				+ '</li>';
			}

			html += '</ul>';
			element.innerHTML = html;
		}

		twitterFetcher.fetch({
			"id": '441767385733668865',
			"maxTweets": 5,
			"enableLinks": true,
			"dateFunction": momentDateFormatter,
			"dataOnly": true,
			"customCallback": populateTpl
		});
	}


	/*-----------------------------------/
	/* COUNT TO PLUGIN
	/*----------------------------------*/

	if($('.countto-demo').length > 0) {
		$('.countto-demo').each(function() {
			$(this).countTo({
				to: parseInt($(this).text())
			});
		});
	}


	/*-----------------------------------/
	/* WAYPOINT
	/*----------------------------------*/

	if($('.waypoint').length > 0) {
		$('.waypoint').waypoint(function(direction) {

			$('.countto').each(function() {
				$(this).countTo({
					to: parseInt($(this).text())
				});
			});
		});
	}


	/*-----------------------------------/
	/* CLOCK  TIME PICKER
	/*----------------------------------*/

	if($('.clockpicker').length > 0) {
		$('.clockpicker').clockpicker();
	}


	/*-----------------------------------/
	/* SLIDER FULLWIDTH
	/*----------------------------------*/

    //sliderFull();


	/*-----------------------------------/
	/* SLIDER NEWS
	/*----------------------------------*/

	if($('#news-slider-rev').length > 0) {
		$('#news-slider-rev').revolution({
			sliderLayout: 'auto',
			disableProgressBar: 'on',
			delay: 4000,
			responsiveLevels: [992, 768],
			navigation: {
				onHoverStop: 'off',
				keyboardNavigation: 'on',
				arrows: { enable: true,},
				thumbnails: {
					style: "zeus",
					enable: true,
					width: 265,
					height: 140,
					min_width: 265,
					wrapper_padding: 10,
					wrapper_color: "#000000",
					wrapper_opacity: "0.70",
					tmp: '<span class="tp-thumb-over"></span><span class="tp-thumb-image"></span><span class="tp-thumb-title">{{title}}</span>',
					visibleAmount: 5,
					hide_onmobile: true,
					hide_under: 776,
					hide_onleave: false,
					direction: "horizontal",
					span: false,
					position: "inner",
					space: 10,
					h_align: "left",
					v_align: "bottom",
					h_offset: 0,
					v_offset: 0
				},
			},
		});
	}

	/*-----------------------------------/
	/* BOOTSTRAP PROGRESS BAR
	/*----------------------------------*/

	if($('.progress .progress-bar').length > 0) {
		$('.progress .progress-bar').progressbar({
			display_text: 'fill'
		});

		$('.progress.no-percentage .progress-bar').progressbar({
			display_text: 'fill',
			use_percentage: false
		});

		$('.progress.custom-format .progress-bar').progressbar({
			display_text: 'fill',
			use_percentage: false,
			amount_format: function(p, t) {return p + ' of ' + t;}
		});
	}


	/*-----------------------------------/
	/* TOASTR NOTIFICATION
	/*----------------------------------*/

	if($('#toastr-demo').length > 0) {
		toastr.options.timeout = "10000";
		toastr.options.closeButton = true;
		toastr['info']('Hi there, this is notification demo with HTML support. So, you can add HTML elements like <a href="#">this link</a>');

		$('.btn-toastr').on('click', function() {
			$context = $(this).data('context');
			$message = $(this).data('message');
			$position = $(this).data('position');

			if($context == '') {
				$context = 'info';
			}

			if($position == '') {
				$positionClass = 'toast-left-top';
			} else {
				$positionClass = 'toast-' + $position;
			}

			toastr.remove();
			toastr[$context]($message, '' , { positionClass: $positionClass });
		});

		$('#toastr-callback1').on('click', function() {
			$message = $(this).data('message');

			toastr.options = {
				"timeOut": "300",
				"onShown": function() { alert('onShown callback'); },
				"onHidden": function() { alert('onHidden callback'); }
			}

			toastr['info']($message);
		});

		$('#toastr-callback2').on('click', function() {
			$message = $(this).data('message');

			toastr.options = {
				"timeOut": "10000",
				"onclick": function() { alert('onclick callback'); },
			}

			toastr['info']($message);

		});

		$('#toastr-callback3').on('click', function() {
			$message = $(this).data('message');

			toastr.options = {
				"timeOut": "10000",
				"closeButton": true,
				"onCloseClick": function() { alert('onCloseClick callback'); }
			}

			toastr['info']($message);
		});
	}


	/*-----------------------------------/
	/* WIZARDS
	/*----------------------------------*/

	if($('#demo-wizard').length > 0) {
		$('#demo-wizard')
		.wizard()
		.on('actionclicked.fu.wizard', function(e, data) {
			// validation process for 'next' direction only
			if($('#form'+data.step).length > 0 && data.direction == 'next') {
				var parsleyForm = $('#form'+data.step).parsley();
				parsleyForm.validate();

				if(!parsleyForm.isValid())
					return false;
			}
		})
		.on('finished.fu.wizard', function(){
			alert('Your account has been created.');
		});
	}


	/*-----------------------------------/
	/* MODAL
	/*----------------------------------*/

	if($('#subscribe-modal').length > 0) {
		$dialogShown = false;

		$(this).on('mouseleave', function(e) {
			if(e.clientY < 0 && !$dialogShown) {
				$('#subscribe-modal').modal('show');
				$dialogShown = true;
			}
		});

		$('.modal-subscription .btn-close, .modal-subscription .link-close, .modal-backdrop').on('click', function() {
			$('#subscribe-modal').modal('hide');
		});
	}


	/*-----------------------------------/
	/* CONTACT WIDGET
	/*----------------------------------*/

	if($('#contact-widget-bottom').length > 0) {
		$widgetHeight = $('#contact-widget-bottom').innerHeight();
		$panelBodyHeight = $('#contact-widget-bottom').find('.panel-body').innerHeight();
		$panelHeading = $('#contact-widget-bottom').find('.panel-heading');
		$panelShown = false;

		// initial position
		$('#contact-widget-bottom').animate({
			bottom: "-=" + $panelBodyHeight
		}, 1000, "swing");

		// use min-height for any changing content
		$('#contact-widget-bottom').css('min-height', $widgetHeight);


		$panelHeading.on('click', function() {
			if(!$panelShown) {
				$('#contact-widget-bottom').animate({
					bottom: "+=" + $panelBodyHeight
				}, 300, "swing");

				$panelHeading.find('.icon-up').addClass('hide');
				$panelHeading.find('.icon-down').removeClass('hide');
				$panelShown = true;
			} else {
				$('#contact-widget-bottom').animate({
					bottom: "-=" + $panelBodyHeight
				}, 300, "swing");

				$panelHeading.find('.icon-up').removeClass('hide');
				$panelHeading.find('.icon-down').addClass('hide');

				$panelShown = false;
			}
		});
	}


	/*-----------------------------------/
	/* LIGHTBOX
	/*----------------------------------*/

	if($('.image-magnific').length > 0) {
		$('.image-magnific').magnificPopup({
			type: 'image'
		});
	}

	if($('.gallery-magnific').length > 0) {
		$('.gallery-magnific').magnificPopup({
			delegate: 'a',
			type: 'image',
			gallery: {enabled: true}
		});
	}

	if($('.iframe-magnific').length > 0) {
		$('.iframe-magnific').magnificPopup({
			type: 'iframe'
		});
	}


	/*-----------------------------------/
	/* TOOLTIPS, POPOVERS
	/*----------------------------------*/

	if($('[data-toggle="tooltip"]').length > 0) {
		$('[data-toggle="tooltip"]').tooltip();
	}

	if($('[data-toggle="popover"]').length >0) {
		$('[data-toggle="popover"]').popover();
	}

});




function sliderFull() {
    if ($('#slider-fullwidth').length > 0) {
        $('#slider-fullwidth').revolution({
            sliderLayout: "fullwidth",
            minHeight: 590,
            jsFileLocation: '/assets/pages/js/plugins/revolution/js/',
            disableProgressBar: 'on',
            delay: 4000,
            navigation: {
                onHoverStop: 'off',
                arrows: { enable: true },
                bullets: {
                    enable: true,
                    hide_onmobile: false,
                    style: "hephaistos",
                    hide_onleave: false,
                    direction: "horizontal",
                    h_align: "center",
                    v_align: "bottom",
                    h_offset: 0,
                    v_offset: 30,
                    space: 5,
                    tmp: ''
                },
                touch: {
                    touchenabled: "on",
                    swipe_threshold: 75,
                    swipe_min_touches: 1,
                    swipe_direction: "horizontal",
                    drag_block_vertical: false
                },
            },
        });
    }
}




function contactWidget(){
  if($('#contact-widget-bottom').length > 0) {
		$widgetHeight = $('#contact-widget-bottom').innerHeight();
		$panelBodyHeight = 404 //$('#contact-widget-bottom').find('.panel-body')[0].clientHeight;
		$panelHeading = $('#contact-widget-bottom').find('.panel-heading');
		$panelShown = false;

		// initial position
		$('#contact-widget-bottom').animate({
			bottom: "-=" + $panelBodyHeight
		}, 1000, "swing");

		// use min-height for any changing content
		$('#contact-widget-bottom').css('min-height', $widgetHeight);


    $panelHeading.on('click', function () {
      $('#contact-name').focus();
			if(!$panelShown) {
				$('#contact-widget-bottom').animate({
					bottom: "+=" + $panelBodyHeight
				}, 300, "swing");

				$panelHeading.find('.icon-up').addClass('hide');
				$panelHeading.find('.icon-down').removeClass('hide');
				$panelShown = true;
			} else {
				$('#contact-widget-bottom').animate({
					bottom: "-=" + $panelBodyHeight
				}, 300, "swing");

				$panelHeading.find('.icon-up').removeClass('hide');
				$panelHeading.find('.icon-down').addClass('hide');

				$panelShown = false;
			}
		});
	}
}

$(document).ready(contactWidget)
