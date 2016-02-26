$(function() {

  $(".trigger-load").on("click", function(event) {
    event.preventDefault();

    playIt($(this).closest("form").find("input").val() ||
      "Welcome to the jungle");
    // $("body").addClass("loaded");
    // document.getElementById('video-player').play();
  });

  $("h4.ban").on("click", function(event) {
    event.preventDefault();
    $(this).parent().find(".cats").slideToggle();
  })

  $(".internal-nav").click(function(event) {
      event.preventDefault();
      var destination = $(this).attr("href")
      $('html, body').animate({
          scrollTop: $(destination).offset().top - 60
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
    console.log("not yet prevented!")
    event.preventDefault();
    console.log("prevented!")
    var audio = new Audio();
    var srcUrl = $(this).attr('href');
    audio.src = srcUrl;
    $("body").addClass("loaded");
    document.getElementById('video-player').play();
    audio.play();
  })


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
              // console.log(response);
              var songs = response.tracks.items;
              console.log(songs);
              $("#song-container").html(songs.map(generateSongHtml));


              // normal play first find option
              // if (response.tracks.items.length) {
              //   var track = response.tracks.items[0];
              //   audio.src = track.preview_url;
              //   audio.play();
              //   // communicateAction('<div>Playing ' + track.name + ' by ' + track.artists[0].name + '</div><img width="150" src="' + track.album.images[1].url + '">');
              // }
            }
        });
    }

    searchTracks(query);
  }

})
