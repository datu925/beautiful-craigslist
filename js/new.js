$(function() {
  $("h4.ban").on("click", function(event) {
    event.preventDefault();
    $(this).parent().find(".cats").slideToggle();
  })

  // $("h5.ban").on("click", function(event) {
  //   event.preventDefault();
  //   $(this).parent().find(".acitem").slideToggle();
  // })
  $(".internal-nav").click(function() {
      var destination = $(this).attr("href")
      $('html, body').animate({
          scrollTop: $(destination).offset().top - 60
      }, 1000);
  });

})
