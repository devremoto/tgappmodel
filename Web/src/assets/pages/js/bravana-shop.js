$(document).ready( function() {

	/*-----------------------------------/
	/* SLIDER
	/*----------------------------------*/

	if($('#slider-shop-fullwidth').length > 0) {
		$('#slider-shop-fullwidth').revolution({
			sliderLayout: "fullwidth",
			minHeight: 650,
			disableProgressBar: 'on',
			delay: 4000,
			navigation: {
				onHoverStop: "off",
				arrows: {enable: true},
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
	

	/*-----------------------------------/
	/* MODAL
	/*----------------------------------*/

	if($('#offer-modal').length > 0) {
		$dialogShown = false;

		$(this).on('mouseleave', function(e) {
			if(e.clientY < 0 && !$dialogShown) {
				$('#offer-modal').modal('show');
				$dialogShown = true;
			}
		});

		$('.modal-subscription .btn-close').on('click', function() {
			$('#offer-modal').modal('hide');
		});
	}
	

	/*-----------------------------------/
	/* CATEGORY GRID
	/*----------------------------------*/

	if($('.category-grid').length > 0) {
		$('.category-grid').isotope({
			layoutMode: 'packery',
			itemSelector: '.category',
		});

	}


	/*-----------------------------------/
	/* BANNER CAROUSELS
	/*----------------------------------*/

	if( $('#carousel-banner').length > 0 ) {
		$('#carousel-banner').owlCarousel({
			singleItem: true,
			navigation: false,
			autoPlay: 4000,
			transitionStyle: 'fade'
		});
	}


	/*-----------------------------------/
	/* PRODUCT FILTERS
	/*----------------------------------*/

	if($('.input-range').length > 0) {
		$('.input-range').ionRangeSlider({
			type: "double",
			min: 0,
			max: 500,
			from: 100,
			to: 400,
			prefix: '$'
		});

		var rangeSlider = $('.input-range').data('ionRangeSlider');

		$('#price-from').on('blur', function() {
			rangeSlider.update({
				from: $('#price-from').val()
			});
		});

		$('#price-to').on('blur', function() {
			rangeSlider.update({
				to: $('#price-to').val()
			});
		});
	}


	/*-----------------------------------/
	/* PRODUCT IMAGE GALLERY
	/*----------------------------------*/

	if( $('#product-thumnails').length > 0 ) {
		$('#product-thumnails').owlCarousel({
			navigation: true,
			pagination: false,
			slideSpeed: 800,
			autoPlay: false,
			items: 3
		});

		$('#product-thumnails a').on('click', function(e) {
			e.preventDefault();
			$('.product-single-image img').attr('src', $(this).attr('href'));
		});
	}


	/*-----------------------------------/
	/* PRODUCT IMAGE ZOOM
	/*----------------------------------*/

	if( $('.product-single-image').length > 0) {
		var el = $('.product-single-image img');

		if($('#zoom-wrapper').length > 0) {
			el.parent()
			.zoom({
				touch: false
			});
		} else{
			el.wrap('<span id="zoom-wrapper" style="display:inline-block"></span>')
			.parent()
			.zoom({
				touch: false
			});
		}
	}


	/*-----------------------------------/
	/* PRODUCT CAROUSEL
	/*----------------------------------*/

	if( $('#product-carousel').length > 0 ) {
		$('#product-carousel').owlCarousel({
			navigation: true,
			items: 4,
			pagination: false,
			slideSpeed: 800,
			autoPlay: 3000
		});
	}


	/*-----------------------------------/
	/* CHECKOUT PROCESS
	/*----------------------------------*/

	/* checkout wizard */
	if($('#checkout-wizard').length > 0) {
		var checkoutText = $('#btn-checkout-next span').text() + ' ',
			nextText = 'NEXT ';
			payText = 'PAY NOW'

		$('#checkout-wizard')
		.wizard()
		.on('changed.fu.wizard', function(e, data) {
			if($('#btn-checkout-next').hasClass('btn-paynow')) {
				$('#btn-checkout-next').removeClass('btn-paynow');
			}

			if(data.step == 1) { // if step at shopping cart
				$('#btn-checkout-prev').addClass('hide-first');
				$('#btn-checkout-next span').text(checkoutText);
			} else if(data.step == 2) { // if step at shipping
				$('#btn-checkout-prev').removeClass('hide-first');
				$('#btn-checkout-next span').text(nextText);
			} else if(data.step == 3) { // if at payment
				$('#btn-checkout-next span').text(payText)
					.addClass('btn-paynow');
			}
		})
		.on('actionclicked.fu.wizard', function(e, data) {
			// validation process for 'next' direction only
			if($('#form'+data.step).length > 0 && data.direction == 'next') {
				var parsleyForm = $('#form'+data.step).parsley();
				parsleyForm.validate();

				if(!parsleyForm.isValid())
					return false;
			}
		})
		.on('finished.fu.wizard', function(e) {
			if($('#form-payment').length > 0) {
				var parsleyForm = $('#form-payment').parsley();
				parsleyForm.validate();
			}

			if(!parsleyForm.isValid())
				return false;

			$(location).attr('href', 'shop-thankyou.html');
		});
	}

	// quantity spinner at shopping cart
	if($('.qty-spinner').length > 0) {
		$('.qty-spinner').TouchSpin({
			min: 1,
			max: 999,
		});
	}

	// billing and shipping
	if($('.form-billing-shipping').length > 0) {
		$('.form-billing-shipping').on('change', function() {
			if($('#sameAsBilling').is(':checked')) {
				// disable fields validation
				$('#shp-firstname').attr('required', false);
				$('#shp-address1').attr('required', false);
				$('#shp-country').attr('required', false);
				$('#shp-phone').attr('required', false);

				$('#shipping-inputs').slideUp('medium');
			} else {
				// enable fields validation back
				$('#shp-firstname').attr('required', true);
				$('#shp-address1').attr('required', true);
				$('#shp-country').attr('required', true);
				$('#shp-phone').attr('required', true);

				$('#shipping-inputs').slideDown('medium');
			}
		});
	}

	// payment methods
	if($('#form-payment').length > 0) {
		$('#form-payment').on('change', function() {
			paymentMethodSelected();
		});
	}

	function paymentMethodSelected() {
		if($('#radio-credit-card').is(':checked')) {
			// enable validation
			$('#inputCardName').attr('required', true);
			$('#inputCardNumber').attr('required', true);
			$('#inputExpiryMonth').attr('required', true);
			$('#inputExpiryYear').attr('required', true);
			$('#inputSecurityCode').attr('required', true);

			// disable validation
			$('#inputPaypalEmail').attr('required', false);

			$('.credit-card-box').slideDown();
			$('.paypal-input').slideUp();
		} else {
			$('#inputCardName').attr('required', false);
			$('#inputCardNumber').attr('required', false);
			$('#inputExpiryMonth').attr('required', false);
			$('#inputExpiryYear').attr('required', false);
			$('#inputSecurityCode').attr('required', false);

			// disable validation
			$('#inputPaypalEmail').attr('required', true);

			$('.credit-card-box').slideUp();
			$('.paypal-input').slideDown();
		}
	}
});

