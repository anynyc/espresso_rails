$(function() {
  console.log("MAIN.JS LOADED!!")
  //resize + center images
  window.resizeImages = function resizeImages(){
    $('.resize img').centerImage();
  }

  window.resizeImages()


//
//CONTACT MODAL
//

// Get the modal
// var contactModal = document.getElementById('contactModal');

// // Get the button that opens the modal
// var contactBtn = document.getElementById("contactBtn");

// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("contactClose")[0];

//Get the submit tag that goes to success modal
// var submit = document.getElementById("submit");

//Get success modal
// var successModal = document.getElementById("successModal");

// When the user clicks on the button, open the modal
// contactBtn.onclick = function() {
//     contactModal.style.display = "block";
// }

// When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//     contactModal.style.display = "none";

// }

//When the user clicks on submit, close modal and open success modal
// submit.onclick = function() {
//     contactModal.style.display = "none";
//     successModal.style.display = "block";

// }

// When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//     if (event.target == contactModal) {
//         contactModal.style.display = "none";
//     }
// }

//Success modal



//
//PRIVACY POLICY MODAL
//

// Get the modal
// var privacyModal = document.getElementById('privacyModal');

// Get the button that opens the modal
// var privacyBtn = document.getElementById("privacyBtn");

// Get the <span> element that closes the modal
// var span = document.getElementsByClassName("privacyClose")[0];

// When the user clicks on the button, open the modal
// privacyBtn.onclick = function() {
//     privacyModal.style.display = "block";
// }

// When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//     privacyModal.style.display = "none";
// }

// When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//     if (event.target == privacyModal) {
//         privacyModal.style.display = "none";
//     }
// }


//
//TERMS OF SERVICE MODAL
//

// Get the modal
// var tosModal = document.getElementById('tosModal');

// Get the button that opens the modal
// var tosBtn = document.getElementById("tosBtn");

// Get the <span> element that closes the modal
// var span = document.getElementsByClassName("tosClose")[0];

// When the user clicks on the button, open the modal
// tosBtn.onclick = function() {
//     tosModal.style.display = "block";
// }

// When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//     tosModal.style.display = "none";
// }

// When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//     if (event.target == tosModal) {
//         tosModal.style.display = "none";
//     }
// }

//FAQ page categories

$("#faq #section-1 ul li").on("click", function(){
		$(this).addClass("arrow-down").siblings().removeClass("arrow-down");
});


//Mobile nav
$('body').on("click", "#menu-icon", function(){
		$(this).next().show();
		document.body.style.overflow = "hidden"
		document.body.style.position = "fixed"
});


$('body').on("click",".mobile-menu .close", function(){
		$(this).parent(".mobile-menu").hide();
		document.body.style.overflow = "visible"
		document.body.style.position = "static"
});

$("body").on("click", ".dashboard-nav-container .dashboard-nav-wrapper", function(){
	$(this).children().addClass("active");

	$(this).siblings().children().removeClass("active");
});

//Shopping Cart remove item on click
$("body").on("click", ".cart-row-item .icon", function(){
	var id = $(this).data("id");
	$.ajax({
		url: '/shopping/cart/items/destroy/' + id,
		dataType: 'script',
		method: 'DELETE'
	})
});

//Shopping Checkout copy billing information to shipping
$("body").on("click", "#checkbox-container input.checkbox", function(){

	if ($(this).is(":checked")) {

		$(".shipping-street").val($(".billing-street").val())

		$(".shipping-city").val($(".billing-city").val())

		$(".shipping-state").val($(".billing-state").val())

		$(".shipping-zip").val($(".billing-zip").val())


	} else {

		$(".shipping-street").val("")
		$(".shipping-city").val("")
		$(".shipping-state").val("")
		$(".shipping-zip").val("")

	}

});

//Hide Success Modals on mouseup
$(document).mouseup(function (e)
	{
		var container = $(".success-modal-container");

		if (container.is(e.target) // if the target of the click isn't the container...
				&& container.has(e.target).length === 0) // ... nor a descendant of the container
		{
				container.hide();
		}
});

//User settings - file upload
$("body").on('change', "#fileUpload", function () {

	if (typeof (FileReader) != "undefined") {

		var image_holder = $("#image-holder");
		image_holder.empty();

		var reader = new FileReader();
		reader.onload = function (e) {
				$("<img />", {
						"src": e.target.result,
						"class": "thumb-image"
				}).appendTo(image_holder);

		}

		image_holder.show();
		reader.readAsDataURL($(this)[0].files[0]);

	} else {
		alert("This browser does not support FileReader.");
	}

});

//Orders Table dropdown
$("body").on("click", ".table.w-items", function(){
	$(this).next(".item-dropdown-wrapper").slideToggle(100);
});

//Contact form success modal
$("body").on("click", ".contact-submit", function(){
	$(".success-modal-container").show();
});


//Forgot Password Success Modal
$("body").on("click", ".forgot-password-body-wrapper .back-btn", function(){
	$(".success-modal-container").show();
});

//User settings changes saved
// $("body").on("click", ".form-body .submit-btn-wrapper .submit-settings-btn", function(){
// 	$(".succcess-modal-container").show();
// });

$("body").on("click", "#login-btn", function(){
	var email = $("#email-login").val()
	var pw = $("#pw-login").val()
	$.ajax({
		url: '/user/sessions',
		data: {email: email, password: pw, ajax: true},
		dataType: 'script',
		method: 'post'
	})
});

$("body").on("click", ".remove-node", function(){
	var node = $(this).data("id")
	$.ajax({
		url: '/user/payment/node/' + node,
		dataType: 'script',
		method: "delete"
	})
});

$("body").on("click", ".stage", function(){
	$(this).addClass("active").siblings(".stage").removeClass("active");
  var id = $(this).data("id");
  $.ajax({
    url: '/aux?id=' + id + '&type=stage',
    dataType: 'script'
  });
});

// $("body").on("change", "#checkout-form", function(e){
// 	$(this).submit()
// });

$("body").on("click", ".location-news-filter", function(){
	var locationId = $(this).data("id")
	$.ajax({
		url: '/news/location/' + locationId,
		dataType: 'script',
		method: "POST"
	})
});
	//show flash message
	if($(".success-modal-container").hasClass("trigger-message")){
  	var message = $(".success-modal-container").data("notice");
  	if(message){
  		$(".success-modal-container h1").html(message);
  	}
  	$(".success-modal-container").animate({"top":"0%"}).delay(2000).animate({"top":"-100%"});
	}

	Array.prototype.allValuesSame = function() {
		for(var i = 1; i < this.length; i++){
	    if(this[i] !== this[0]){
	    	return false;
	    }
		}
		return true;
	}

	function runCheck(){
		var array = [];

		$(".check-filled").each(function(){
			var inputValue = $(this).find("input");
			var selectValue = $(this).find("select");
			if(inputValue.val() == ""){
				array.push("false");
			}else if(selectValue.val() == ""){
				array.push("false");
			}else{
				array.push("true");
			}
		})
		if(array.allValuesSame()){
			var address = $(".billing-street").val();
			var city = $(".billing-city").val();
			var state = $(".shipping-state").val();
			var zip = $(".billing-zip").val();

			// $.ajax({
			// 	url: '/shopping/card/salestax',
			// 	dataType: "script",
			// 	method: "post",
			// 	data: {address: address, city: city, state: state, zip: zip}
			// })

			//if needed -> find from google API using zip code
			// var findState;
			// $.ajax({
			//   url: "http://maps.googleapis.com/maps/api/geocode/json",
			//   cache: false,
			//   dataType: "json",
			//   type: "GET",
			//   data: "address="+zip+"&sensor=false",
			//   success: function(result, success) {
			// 	  findState = result.results[0]['address_components'][3]['short_name']
			//   }
			// })

			$.ajax({
				url: '/shopping/card/salestax',
				dataType: "script",
				method: "post",
				data: {state: state}
			})
		}

	}

	//check billing fields to be passed to tax cloud
	$("body").on("blur", ".check-filled input[type=text], .check-filled select", function(){
		runCheck();
	})

	//check billing fields to be passed to tax cloud
	$("body").on("click", "#checkbox-container input", function(){
		runCheck();
	})



});
