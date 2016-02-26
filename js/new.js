$(function() {

  $("#song-choice").on("click", "button", function(event) {
    event.preventDefault();
    if ($(this).hasClass("load-music")) {
      playIt($(this).closest("form").find("input").val());
    } else {
      $(".song-listing").slideToggle();
      setTimeout(loadPage, 500)
    }

  });

  $("h4.ban").on("click", function(event) {
    event.preventDefault();
    $(this).parent().find(".cats").slideToggle();
  })

  $(".internal-nav").click(function(event) {
      event.preventDefault();
      var destination = $(this).attr("href")
      $('html, body').animate({
          scrollTop: $(destination).offset().top - $("header").height()
      }, 1000);
  });

  window.onscroll = function() { toggleOther()};

  function toggleOther() {
    var content = $(".other-content *")
      if ($("body").scrollTop() > content.offset().top + content.height() - window.innerHeight) {
          $(".other-content *").css('visibility', 'visible');
      } else {
          $(".other-content *").css('visibility', 'hidden');
      }
  }

  $("#song-choice").on("click",".song-listing", function(event) {
    event.preventDefault();
    $(".song-listing").slideToggle();
    setTimeout(loadPageWithMusic, 1000, $(this).attr('href'));
    // var audio = document.getElementById("audio");//new Audio();
    // audio.src = $(this).attr('href');
    // loadPage();
    // audio.play();
  })

  function loadPageWithMusic(srcUrl) {
    var audio = document.getElementById("audio");//new Audio();
    audio.src = srcUrl;
    loadPage();
    audio.play();
  }

  function loadPage() {
    $("body").scrollTop(0)
    $("body").addClass("loaded");
    document.getElementById('video-player').play();
  }


  function playIt(query) {
    // var audio = new Audio();

    function generateSongHtml(song) {
      var $listing = $("<li>");
      var $anchor = $("<a class='song-listing' href=" + song.preview_url + ">" + song.artists[0].name + ": " + song.name + "</a>");
      return $listing.append($anchor);
    }

    function searchTracks(quer) {
        $.ajax({
            url: 'https://api.spotify.com/v1/search',
            data: {
                q: quer,
                type: 'track'
            },
            success: function (response) {
              var songs = response.tracks.items;
              $("#song-container").html($("<ul>").append(songs.map(generateSongHtml)));
            }
        });
    }

    searchTracks(query);
  }

})
