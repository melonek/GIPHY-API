$(document).ready(function() {
  let apis = ["cats", "house", "dogs", "games", "homework", "stressed"]; //preferably do an array with some movies
  //and then user selects his favourite movies as well.
  //This will be a function to make the buttons and add them to the page//
  function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
    $(areaToAddTo).empty();

    for (let i = 0; i < arrayToUse.length; i++) {
      let a = $("<button>");
      a.addClass(classToAdd);
      a.attr("data-type", arrayToUse[i]);
      a.text(arrayToUse[i]);
      $(areaToAddTo).append(a);
    }
  }

  //--create a function that will populate images from GIFY API--//
  $(document).on("click", ".api-button", function() {
    $("#api-images").empty();
    $(".api-button").removeClass("active");
    $(this).addClass("active");

    let type = $(this).attr("data-type");
    let queryURL =
      "http://api.giphy.com/v1/gifs/search?q=" +
      type +
      "&api_key=PK9TReEmMnKHsolrKYlgshfzzFdlAehP&limit=10";

    //--Ajax call--//
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      let results = response.data;
      console.log(results);
      for (let i = 0; i < results.length; i++) {
        let apiDiv = $("<div>");
        apiDiv.addClass("card-deck");
        let apiDiv1 = $("<div>");
        apiDiv1.addClass("card");
        let apiDiv2 = $("<div>");
        apiDiv2.addClass("card-body");

        let rating = results[i].rating;

        let p = $("<p>").text("Rating: " + rating);

        let animated = results[i].images.fixed_height.url;

        let still = results[i].images.fixed_height_still.url;

        let apiImage = $("<img>");
        apiImage.attr("id", "fotki");
        apiImage.attr("src", still);
        apiImage.attr("data-still", still);
        apiImage.attr("data-animate", animated);
        apiImage.attr("data-state", "still");
        apiImage.addClass("api-image");
        apiImage.addClass("img-fluid");

        p.appendTo(apiDiv2);
        apiImage.appendTo(apiDiv2);
        apiDiv1.appendTo(apiDiv);
        apiDiv2.appendTo(apiDiv1);
        let apiImg = $("#api-images");
        $(apiDiv).appendTo(apiImg);
        apiImg.addClass("row-fluid");
      }
    });
  });
  let nyan = new Audio("./css/nyan.mp3");
  $("#catel").click(e => nyan.play());
  $("#catel").click(e => {
    $("body").css("background-image", "url(css/giphy.gif)");
  });
  //--NyanCat :D --//
  $("#catel").mouseover(function() {
    let text = $("#text1");
    text.text("NON-STOP NYAN CAT!");

    setTimeout(fade_out, 5000);

    function fade_out() {
      text.fadeOut().empty();
    }
  });

  //--Setting the state from sill to animated when clicking individual images returned by API--//
  $(document).on("click", ".api-image", function() {
    let state = $(this).attr("data-state");

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  $("#add-api").on("click", function(event) {
    event.preventDefault();
    let newApi = $("input")
      .eq(0)
      .val();

    if (newApi.length > 2) {
      apis.push(newApi);
    }
    populateButtons(apis, "api-button", "#api-buttons");
  });
  populateButtons(apis, "api-button", "#api-buttons");
});
