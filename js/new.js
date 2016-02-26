$(function() {

  // LOADER / SONG PICKER EVENTS
  loadPage();

  $("#song-choice").on("click", "button", function(event) {
    event.preventDefault();
    if ($(this).hasClass("load-music")) {
      listSongs($(this).closest("form").find("input").val());
    } else {
      $(".song-listing").slideToggle();
      setTimeout(loadPage, 1000)
    }

  });

  $("#song-choice").on("click",".song-listing", function(event) {
    event.preventDefault();
    $(".song-listing").slideToggle();
    setTimeout(loadPageWithMusic, 1000, $(this).attr('href'));
  })

  function listSongs(query) {

    function generateSongHtml(song) {
      var $listing = $("<li>");
      var $anchor = $("<a class='song-listing' href=" + song.preview_url + ">" + song.artists[0].name + ": " + song.name + "</a>");
      return $listing.append($anchor);
    }

    function generateSongsHtml(songs) {
      return $("<ul>").append(songs.map(generateSongHtml));
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
              $("#song-container").html(generateSongsHtml(songs));
            }
        });
    }

    searchTracks(query);
  }

  // PAGE LOAD

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


  // MAINPAGE EVENTS

  $(".internal-nav").click(function(event) {
    event.preventDefault();
    var destination = $(this).attr("href")
    $('html, body').animate({
        scrollTop: $(destination).offset().top - $("header").height()
    }, 1000);
  });

  $("h4.ban").on("click", function(event) {
    event.preventDefault();
    $(this).parent().find(".cats").slideToggle();
  })

  window.onscroll = function toggleOther() {
    var content = $(".other-content *")
    if ($("body").scrollTop() > content.offset().top + content.height() - window.innerHeight) {
        content.css('visibility', 'visible');
    } else {
        content.css('visibility', 'hidden');
    }
  }

})
