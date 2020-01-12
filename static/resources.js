$(window).on("load",  function () {
  labels = document.querySelectorAll("label[for='sn-anything']");
  inputs = document.querySelectorAll("input[id='sn-anything']");

  for (var i = 0; i < labels.length; i++) {
    var string = "sn-"
    var string = string + i.toString()
    labels[i].setAttribute("for", string)
    inputs[i].setAttribute("id", string)
  }; 
});

$(window).on("load", function() {
  enquire.register("screen and (max-width: 760px)", {
    match : function() {
      $('#blogdesc').insertBefore('.thefooter');
    },
    unmatch : function() {
      $('#blog-p').append($('#blogdesc'));
    }
  });
});

$(window).on("load",  function () {
  $(".thearticle > article > p:nth-of-type(2)").html(function (i, html) {
    return html.replace(/(([α-ωA-Ω]|[a-zA-Z])+\S+\s)/,
      '<span class="newthought">$1</span>')
  });
});

$(window).on("load", function () {
  $("p.caption").each(function (i, html) {
    $(this).insertBefore($(this).prev().parent());
    $(this).replaceWith("<figcaption>"+$(this).text()+"</figcaption>");
  });
});

$(window).on("load", function () {
  if ($("figure").length > 0) {
    console.log("Pandoc 2.x -- figcaption there")

    var array = $("figcaption").each(function () {
      return $("figcaption").text();
    });
    for (var i = array.length - 1; i >= 0; i--) {
      array[i] = $(array[i]).text();
    }
    // console.log(array);

    $("figure").map(function (i, html) {
      $("figcaption").remove();
      $(this).prepend("<span class='marginnote'>" + array[i] + "</span>");
      $(this).prepend("<input type='checkbox' id='mn-exports-imports' \
       class='margin-toggle'>");
      $(this).prepend("<label for='mn-exports-imports' \
        class='margin-toggle'></label>");
    })
  }

  if ($(".figure").length > 0) {
    console.log("Pandoc 1.x -- no figcaption")

    var array2 = $("figcaption").each(function () {
      return $("figcaption").text();
    });
    for (var i = array2.length - 1; i >= 0; i--) {
      array2[i] = $(array2[i]).text();
    }
    // console.log(array2);

    $(".figure").each(function (i, html) {
      $(this).prepend("<span class='marginnote'>" + array2[i] + "</span>");
    })
    $("article > figcaption").remove();
  }
})
