$(function() {
  $("h4.ban").on("click", function(event) {
    event.preventDefault();
    $(this).parent().find(".cats").slideToggle();
  })

  // $("h5.ban").on("click", function(event) {
  //   event.preventDefault();
  //   $(this).parent().find(".acitem").slideToggle();
  // })
  $(".internal-nav").click(function(event) {
      event.preventDefault();
      var destination = $(this).attr("href")
      $('html, body').animate({
          scrollTop: $(destination).offset().top - 60
      }, 1000);
  });

  window.onscroll = function() {myFunction()};

  function myFunction() {
    var content = $(".other-content *")
      if ($("body").scrollTop() > content.offset().top + content.height() - window.innerHeight) {
          $(".other-content *").css('visibility', 'visible'); // removeClass('hide');
      } else {
          $(".other-content *").css('visibility', 'hidden'); // addClass('hide');
      }
  }

})
