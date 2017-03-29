new WOW().init();

// Gallery

$(document).ready(function(){
	var window_width    = $(window).width();
	var main_width      = $(".main_container").width();
	var long_container  = $(".long_container");
	var item            = $(".item");
	var slide_number    = 0;


	long_container.css("width", main_width * 3.05);
	item.css("width", long_container.width() / 9);

	$(".see_next").click(function(){
		if (slide_number < 6) {
			slide_number++

			if(slide_number == 6){
				$(".see_next").animate({opacity: 0});
			} else {
				$(".see_next").animate({opacity: 1});
			}

			if(slide_number == 0){
				$(".see_previous").animate({opacity: 0});
			} else {
				$(".see_previous").animate({opacity: 1});
			}

			var item_width   = $(".item").width();
			var pixels_moved = item_width * slide_number;

			long_container.animate({
				marginLeft: -pixels_moved
			});
		}
	})



	$(".see_previous").click(function(){
		if (slide_number > 0){
			slide_number--

			if(slide_number == 0){
				$(".see_previous").animate({opacity: 0});
			} else {
				$(".see_previous").animate({opacity: 1});
			}

			if(slide_number == 6){
				$(".see_next").animate({opacity: 0});
			} else {
				$(".see_next").animate({opacity: 1});
			}

			var item_width   = $(".item").width();
			var pixels_moved = item_width = slide_number;

			long_container.animate({
				marginLeft: -pixels_moved
			});
		}
	})
})

// Validare contact

$(function () {

	$.validator.setDefaults({
		errorClass: 'help-block',
		highlight: function(element) {
			$(element)
				.closest('.input-group')
				.addClass('has-error');
		},
		unhighlight: function(element) {
			$(element)
				.closest('.input-group')
				.removeClass('has-error');
		},
		errorPlacement: function(error, element) { 
			if (element.prop('type') === 'checkbox') {
				error.insertAfter(element.parent());
			} else {
				error.insertAfter(element);
			}
		}
	});

	$.validator.addMethod('strongPassword', function(value, element) {
		return this.optional(element)
		|| value.length >= 6
		&& /\d/.test(value)
		&& /[a-z]/i.test(value);
	}, 'Your password must be at least 6 characters long and contain at least one number and one char\.');

	$.validator.addMethod('phoneRO', function(phoneNumber, element) {
	    phoneNumber = phoneNumber.replace(/\s+/g, ""); 
		return this.optional(element) 
		|| phoneNumber.length > 9 
		&& phoneNumber.match(/^(?:(?:(?:00\s?|\+)40\s?|0)(?:7\d{2}\s?\d{3}\s?\d{3}|(21|31)\d{1}\s?\d{3}\s?\d{3}|((2|3)[3-7]\d{1})\s?\d{3}\s?\d{3}|(8|9)0\d{1}\s?\d{3}\s?\d{3}))$/);
	}, 'Please specify a valid phone number');

	$.validator.addMethod('mail', function(mail, element) {
		return this.optional(element) 
		|| (mail.indexOf('@') >= 2 
			&& mail.indexOf('@') == mail.lastIndexOf('@') 
            && mail.lastIndexOf('.')  <= (mail.length - 3) 
            && mail.lastIndexOf('.') >= (mail.indexOf('@') + 3));
	}, 'Please specify a valid mail');


	$("#register-form").validate({
		rules: {
			email: {
				required: true,
				mail: true
			},
			password: {
				required: true,
				strongPassword: true
			},
			password2: {
				required: true,
				equalTo: "#password"
			},
			firstName: {
				required: true,
				nowhitespace: true,
				lettersonly: true
			},
			secondName: {
				required: true,
				nowhitespace: true,
				lettersonly: true
			},
			phoneNumber: {
				required: true,
				phoneRO: true
			},
			agreement: {
      			required: true
    		}
		},
		messages: {
			email: {
				required: 'Please enter an email address.',
				email: 'Please enter a <em>valid</em> email address.'
			}
		}
	});

});

