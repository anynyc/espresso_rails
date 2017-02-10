//********************************************
//VALIDATE FORMS
//********************************************
$(document).ready(function(){
  //validate email address
  function validateEmail($email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailReg.test( $email );
  }

  //add error class to empty forms
  $("body").on("click", ".validate-form", function(e){
    window.validateForm($(this), e)
  })

  window.validateForm = function validateForm($this, e){
    var this_ = $this
    var clickToGoTo = this_.closest(".validator").data("click-go");
    var goTo = this_.closest(".validator").data("jump");
    var hasErrors = false;
    var hasImages = false;
    var validateImg = this_.closest(".validator").data("image");
    //used to validate if all fields are empty but no necessarily any one field

    //prevent default
    function stopSubmit(){
      if(e != null){
        e.preventDefault();
      }
    }

    //if errors, set false and dont trigger ajax save -> starts true
    window.ajaxstatus = true;

    //image validation
    if(validateImg == true){
      this_.closest(".content-wrapper").find(".validate-img").each(function(){
        if($(this).find(".new-img-add .img-wrapper.resize").length == 0){
          stopSubmit();
          $(this).find(".add-unit-image").addClass("error");
          hasErrors = true;
          hasImages = true;
        }else{
          hasErrors = false;
        }; //end if -> no images
      }); //end each -> validate images
    }; //end if -> validate images

    //input validation
    this_.closest(".validator").find(".validate").each(function(){
      //reset error class + remove error message
      $(this).removeClass("error");

      var targetInput = $(this).find("input");
      var targetSelect = $(this).find("select");
      var targetTextarea = $(this).find("textarea");
      var isChosen = false;

      //if manual stop needed -> ex: email is taken, passwords dont match
      if($(this).hasClass("validate-stop")){
        $(this).addClass("error").find(".input-tooltip-wrapper").show();
        stopSubmit();
        hasErrors = true;
      }

      //if chosen or selectize -> search input field in chosen gets picked up on this
      if($(this).hasClass("validate-chosen") || $(this).hasClass("validate-selectize")){
        targetInput = $(this).find("select");
        isChosen = true;
      }

      //regular error
      if(!$(this).hasClass("blocked")){

        if(targetInput.val() == "" || targetSelect.val() == "" || targetTextarea.val() == "" || (isChosen == true && targetInput.val() == null)){
          //if empty
          stopSubmit();
          $(this).addClass("error").find("label.error").show();
          hasErrors = true;

          //if DOB
          if($(this).hasClass("dob-wrapper")){
            $(this).closest(".input-container").addClass("error").find(".input-tooltip-wrapper").fadeIn(200);
          }

        }else if(targetInput.attr("type") == "text" && $.trim(targetInput.val()) == ""){
          //if input[type=text] -> strip whitespace and then validate
          stopSubmit();
          $(this).addClass("error").find("label.error").show();
          hasErrors = true;

        }else if(targetInput.attr("type") == "checkbox" && !targetInput.is(":checked")){
          stopSubmit();
          $(this).addClass("error").find("label.error").show();
          hasErrors = true;

        }else if($(this).hasClass("val-email")){
          //if email is invalid
          if(!validateEmail(targetInput.val())){
            stopSubmit();
            $(this).addClass("error").find("span.email-error").html("(Invalid Email)").end().find(".input-tooltip-wrapper").fadeIn(200);
            hasErrors = true;
           }
        }//end if/else -> blank forms

      }else{
        //handle blocked inputs -> both have validations but only 1 needs to be selected

        //if its either or -> checkbox/input
        if($(this).hasClass("target")){
          var currentBlocked = $(this).find(".block");
          var siblingsBlocked = $(this).siblings(".blocked").find(".block");
          if(currentBlocked.val() == null && !siblingsBlocked.is(":checked")){
            stopSubmit();
            $(this).addClass("error").find("label.error").show();
            hasErrors = true;
          }else if(currentBlocked.val() == "" && !siblingsBlocked.is(":checked")){
            stopSubmit();
            $(this).addClass("error").find("label.error").show();
            hasErrors = true;
          }else if(hasErrors != true){
            hasErrors = false;
           }
        }; //end if -> hasClass: target

        //if its either or -> inputs (file upload + text)
        if($(this).hasClass("either")){
          var currentChoice = $(this).find("input");
          var siblingsChoice = $(this).siblings(".blocked").find("input");
          if(!currentChoice.val() && !siblingsChoice.val()){
            stopSubmit();
            $(this).addClass("error").find("label.error").show();
            hasErrors = true;
          }; //end if -> empty values
        }; //end if -> hasClass: either
      };// end if/else -> if blocked
    }); //end each -> validate

    //****************
    //SPECIAL CASE
    //custom validations -> specifically used for .radio-box elements (Tenant - ACH: add bank account)
    if($(".custom-val").is(":visible") && !$(".w-radio-box").is(":visible")){
      $(".custom-val").each(function(){
        var select = $(this).find("select");
        var radioBox = $(this).find(".radio-box");

        if(select.length && !select.val() && !$(".radio-box").hasClass("active")){
          $(this).addClass("error")
        }; //end if -> select + empty

        //if there is no radio-box with active + radio boxes exist
        if(!$(".radio-box").hasClass("active") && radioBox.length && !$(".custom-val select").val()){
          $(this).find(".radio-box").addClass("error")
        }

      }); //end each -> custom-val
    }; //end if -> visible
    //*****************

    //if anchor jump is added and the form has errors, scroll to first error
    if(goTo == true && hasErrors == true && clickToGoTo != true){
      //if its an image error go there second
      if(hasImages == true && !$(".validate.error").length){
        var container = $(".validate-img .add-unit-image.error");
      }else{
        var container = $(".validate.error");
      }
      //scroll to error
      $("body").animate({scrollTop: container.first().offset().top-20},200);

    }else if(clickToGoTo == true && hasErrors == true){
      //if clickToGo allow user to click to jump to errors
      $(".submit-success").find("span").html("Errors Found <div class='go-to-errors'>Go</div>").end().find("icon").removeClass("icon-check-circle-2").addClass("icon-delete-3").end().show().stop().animate({"top":0},400);
      $("body").on("click", ".go-to-errors", function(){

        $(".submit-success").animate({"top":"-100%", "display": "none"}, 400);

        if(hasImages == true && !$(".validate.error").length){
          var container = $(".validate-img .add-unit-image.error");
        }else{
          var container = $(".validate.error");
        }
        //scroll to error
        $("body").animate({scrollTop: container.first().offset().top-20},200);
      }); //end click -> go-to-errors

    }; //end if/else -> anchoring

    //if there are errors, prevent ajax from submitting the form, else let form submit, set errors back to 'false'
    if(hasErrors == true){

      window.ajaxstatus = false;
      //stop loader
      // window.deactivateLoader();

    }else{

      window.ajaxstatus = true;
      hasErrors = false;

      //start loader if present
      if(this_.closest(".validator").hasClass("start-loader")){
        window.activateLoader();
        if(this_.closest(".validator").hasClass("add-wait-message")){
          var message = this_.closest(".validator").data("message");
          $(".submit-success").find("span").html(message).end().find("icon").removeClass("icon-delete-3 icon-check-circle-2").addClass("icon-alert-3").end().show().stop().animate({"top":0},400).delay(1000);
        }; //end if -> wait message

      }else if(this_.hasClass("start-loader")){
        window.activateLoader();
      }; //end if/else -> loader

    }

  }; //end function -> validate-form


  //REMOVE ERROR CLASS ON FOCUS
  $("body").on("focus", "input, select, textarea", function(){
    $(this).closest(".validate").removeClass("error").find("span.email-error").html("").end().find(".input-tooltip-wrapper").fadeOut(200);
  }); //end focus -> input

  //REMOVE ERROR CLASS ON CLICK  -> CHECKBOX
  $("body").on("click", "input[type=checkbox]", function(){
    $(this).closest(".validate").removeClass("error");
  }); //end focus -> input


}); //end doc ready
