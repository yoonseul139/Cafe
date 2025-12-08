$(function () {
  setInterval(function () {
    $(".panel").animate({ "margin-left": "-100%" }, function () {
      $(".panel li:first").appendTo(".panel");
      $(".panel").css({ "margin-left": "0px" });
    });
  }, 3000);
});
