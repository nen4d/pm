(function($) {

	"use strict";


  // Form
	var contactForm = function() {
		if ($('#contactForm').length > 0 ) {
			$( "#contactForm" ).validate( {
				rules: {
					name: "required",
					phone: "required",
					email: {
						required: true,
						email: true
					},
				},
				messages: {
					name: "Polje 'Ime' je obavezno. Molimo unesite vaše ime.",
					subject: "Polje 'Broj telefona' je obavezno. Molimo unesite vaš broj telefona.",
					email: "Polje 'Email adresa' je obavezno. Molimo unesite vašu email adresu."
				},
				/* submit via ajax */
				
				submitHandler: function(form) {		
					var $submit = $('.submitting'),
						waitText = 'Prijava se salje...';

					$.ajax({   	
				      type: "POST",
				      url: "php/sendEmail.php",
				      data: $(form).serialize(),

				      beforeSend: function() { 
				      	$submit.css('display', 'block').text(waitText);
				      },
				      success: function(msg) {
		               if (msg == 'OK') {
		               	$('#form-message-warning').hide();
				            setTimeout(function(){
		               		$('#contactForm').fadeOut();
		               	}, 1000);
				            setTimeout(function(){
				               $('#form-message-success').fadeIn();   
		               	}, 1400);

		               	// setTimeout(function(){
				              //  $('#form-message-success').fadeOut();   
		               	// }, 8000);

		               	setTimeout(function(){
				               $submit.css('display', 'none').text(waitText);  
		               	}, 1400);

		         //       	setTimeout(function(){
		         //       		$( '#contactForm' ).each(function(){
											//     this.reset();
											// });
		         //       	}, 1400);
			               
			            } else {
			               $('#form-message-warning').html(msg);
				            $('#form-message-warning').fadeIn();
				            $submit.css('display', 'none');
			            }
				      },
				      error: function() {
				      	$('#form-message-warning').html("Dogodila se greska! Molimo vas pokusajte ponovo.");
				         $('#form-message-warning').fadeIn();
				         $submit.css('display', 'none');
				      }
			      });    		
		  		} // end submitHandler

			});
		}
	};
	contactForm();

})(jQuery);
