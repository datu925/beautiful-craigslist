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


  var audio = new Audio();

  function searchTracks("Back in Black artist: ACDC") {
      $.ajax({
          url: 'https://api.spotify.com/v1/search',
          data: {
              q: query,
              type: 'track'
          },
          success: function (response) {
              if (response.tracks.items.length) {
                  var track = response.tracks.items[0];
                  audio.src = track.preview_url;
                  audio.play();
                  communicateAction('<div>Playing ' + track.name + ' by ' + track.artists[0].name + '</div><img width="150" src="' + track.album.images[1].url + '">');
              }
          }
      });
  }

})
