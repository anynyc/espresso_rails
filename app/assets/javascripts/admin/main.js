$(document).ready(function(){
  console.log("admin MAIN.js LOADED!!")
  $("body").on("click", ".image-delete", function(){
    var id = $(this).data("image");
    var artist = $(this).data("artist");
    $.ajax({
      url: '/admin/remove-artist-image/' + id + "?artist=" + artist,
      dataType: 'script'
    })
  });

  $("body").on("keyup", "#step-two-artist-search", function(){
    var term = $(this).val();
    var eventId = $("#append-table-box").data("event")
    $.ajax({
      url: '/admin/search/' + term,
      data: {event: eventId},
      dataType: 'script'
    });
  });

  $("body").on("keyup", "#step-two-sponsor-search", function(){
    var term = $(this).val();
    var eventId = $("#append-table-box").data("event");
    $.ajax({
      url: '/admin/search/sponsor/' + term,
      data: {event: eventId},
      dataType: 'script'
    });
  });

  $("body").on("click", ".remove-artist-box", function(){
    var artist = $(this).data('artist');
    var eventId = $("#append-table-box").data("event");
    $.ajax({
      url: '/admin/remove/artist/' + artist,
      data: {event: eventId},
      dataType: 'script'
    });
  });

  $("body").on("click", ".remove-box-sponsor", function(){
    var sponsor = $(this).data("sponsorid");
    var eventId = $("#append-table-box").data("event");
    $.ajax({
      url: '/admin/remove/sponsor/' + sponsor,
      data: {event: eventId},
      dataType: 'script'
    });
  });

  $("body").on("click", "#add-stage", function(){
    var eventId = $(this).data("event");
    var val = $("#step-two-add-stage").val();
    if ($.isNumeric(val) && Math.floor(val) == val){
      $.ajax({
        url: '/admin/add-stage',
        data: {event: eventId, value: val},
        dataType: 'script'
      });
    }else{
      // errors
    }
  });

  $("body").on("click", ".remove-stage", function(){
    var stage = $(this).data("stage");
    var eventId = $("#append-table-box").data("event");
    $.ajax({
      url: '/admin/remove-stage/' + stage,
      data: {event: eventId},
      dataType: 'script'
    });
  });

  $("body").on("click", ".image-delete-product", function(){
    var id = $(this).data("image")
    var product = $(this).data("product")
    $.ajax({
      url: '/admin/remove-product-image/' + id,
      data: {product: product},
      dataType: 'script'
    });
  });
  // $("body").on("click", ".treeview-menu li", funtion(){
  //   $(this).addClass("active").siblings().removeClass("active");
  // });


});
