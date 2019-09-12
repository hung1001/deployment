new ClipboardJS("#btnCopy");

$("#btnCopy").tooltip({
  trigger: "click",
  placement: "top"
});

$("#clear").on("click", function() {
  $("#code").html("");
});

var clipboard = new ClipboardJS("#btnCopy");

clipboard.on("success", function() {
  setTooltip("Copied");
  hideTooltip();
});

clipboard.on("error", function() {
  setTooltip("Failed");
  hideTooltip();
});

$(".js-nav-item").map(function(index, item) {
  $(item).on("click", function() {
    $.ajax({
      url: "assests/ajax/" + $(this).data("ajax") + ".txt",
      success: function(data) {
        $("#code").html(data);
      }
    });
  });
});

function setTooltip(message) {
  $("#btnCopy").tooltip("hide").attr("data-original-title", message).tooltip("show");
}

function hideTooltip() {
  setTimeout(function() {
    $("#btnCopy").tooltip("hide");
  }, 1000);
}
