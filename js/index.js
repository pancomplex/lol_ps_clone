// header scroll

document.addEventListener("scroll", () => {
  let scroll_top = document.documentElement.scrollTop;
  if (scroll_top > 100) {
    $(".header_bg").addClass("scrolldown");
    $(".main_logo").addClass("scrolldown");
  } else {
    $(".header_bg").removeClass("scrolldown");
    $(".main_logo").removeClass("scrolldown");
  }
});

//gnb_sub dropdown
$(".gnb>li").hover(
  function () {
    $(this).children(".gnb_sub").css("display", "block").animate({ top: "35px", opacity: "1" }, 200);
  },
  function () {
    $(this)
      .children(".gnb_sub")
      .animate({ top: "25px", opacity: "0" }, 200, function () {
        $(this).css("display", "none");
      });
  }
);
/*$(".gnb>li")
  .mouseenter(function () {
    $(this).children(".gnb_sub").css("display", "block").animate({ top: "35px", opacity: "1" }, 200);
  })
  .mouseleave(function () {
    $(this)
      .children(".gnb_sub")
      .animate({ top: "25px", opacity: "0" }, 200, function () {
        $(this).css("display", "none");
      });
  });*/

//realtime
$("#realtime").click(function () {
  $(this).parent().parent().toggleClass("open");
  $(this).parent().toggleClass("open");
  $(this).toggleClass("open");
  $(this).mouseleave(function () {
    $(this).parent().parent().removeClass("open");
    $(this).parent().removeClass("open");
    $(this).removeClass("open");
  });
});
var i = 1;
setInterval(function () {
  if (i < 10) {
    $("#realtime").css("top", -31 * i);
    i++;
  } else {
    $("#realtime").css("top", 0);
    i = 1;
  }
}, 3000);

//ref-time
let current = new Date();
let current_month = (current.getMonth() < 10 ? "0" : "") + (current.getMonth() + 1);
let current_date = current.getDate();
$("#ref_time").text(current_month + "-" + current_date + " 기준");

//main-slide
$.ajax({
  url: "data/index_champ_list.json",
  dataType: "json",
  success: function (res) {
    let data = res.results;
    for (j = 0; j < 3; j++) {
      for (i in data) {
        var slide = $("<div>", { class: "champ_slide" });
        $(".slide_wrapper").append(slide);

        var img = $("<div>", { class: "champ_img" });
        img.append(
          $("<img>", {
            src:
              "https://s3.lol.ps/file/lol-ps/static/img/champion/" +
              data[i].champion.data_key +
              "/loading_crop.webp",
          })
        );
        slide.append(img);

        var name = $("<div>", { class: "champ_name" });
        name
          .append(data[i].champion.name)
          .append("<span style='font-size:80%;'>(" + data[i].lane + ")</span>");
        slide.append(name);

        if (j == 1) {
          var info = $("<div>", { class: "champ_info" });
          var status = $("<ul>", { class: "champ_status" });
          for (k = 0; k < 4; k++) {
            var status_data = $("<li>");
            var label = $("<h4>", { class: "champ_status_label" });
            var before = $("<span>", { class: "champ_info_before" });
            var now = $("<span>", { class: "champ_info_now" }).append(
              $("<i>", { class: "fas fa-arrow-right" })
            );
            var diff = $("<div>", { class: "champ_info_diff" });
            if (k == 0) {
              before.append("11.12패치");
              now.append("&nbsp;&nbsp;11.13패치");
            } else if (k == 1) {
              label.append("승률");
              before.append(data[i].info.before.win_rate, "%");
              now.append("&nbsp;&nbsp;", data[i].info.now.win_rate, "%");
              var diff_rank = diff.append($("<div>", { class: "rank" }));
              var diff_rate = data[i].info.diff.win_rate;
              if (diff_rate >= 0) {
                diff_rank.children(".rank").addClass("up");
                diff_rank
                  .children(".rank")
                  .append($("<i>", { class: "fas fa-arrow-up" }), "&nbsp;", diff_rate, "%");
              } else {
                diff_rank.children(".rank").addClass("down");
                diff_rank
                  .children(".rank")
                  .append($("<i>", { class: "fas fa-arrow-down" }), "&nbsp;", diff_rate, "%");
              }
            } else if (k == 2) {
              label.append("픽률");
              before.append(data[i].info.before.pick_rate, "%");
              now.append("&nbsp;&nbsp;", data[i].info.now.pick_rate, "%");
              var diff_rank = diff.append($("<div>", { class: "rank" }));
              var diff_rate = data[i].info.diff.pick_rate;
              if (diff_rate >= 0) {
                diff_rank.children(".rank").addClass("up");
                diff_rank
                  .children(".rank")
                  .append($("<i>", { class: "fas fa-arrow-up" }), "&nbsp;", diff_rate, "%");
              } else {
                diff_rank.children(".rank").addClass("down");
                diff_rank
                  .children(".rank")
                  .append($("<i>", { class: "fas fa-arrow-down" }), "&nbsp;", diff_rate, "%");
              }
            } else if (k == 3) {
              label.append("밴율");
              before.append(data[i].info.before.ban_rate, "%");
              now.append("&nbsp;&nbsp;", data[i].info.now.ban_rate, "%");
              var diff_rank = diff.append($("<div>", { class: "rank" }));
              var diff_rate = data[i].info.diff.ban_rate;
              if (diff_rate >= 0) {
                diff_rank.children(".rank").addClass("up");
                diff_rank
                  .children(".rank")
                  .append($("<i>", { class: "fas fa-arrow-up" }), "&nbsp;", diff_rate, "%");
              } else {
                diff_rank.children(".rank").addClass("down");
                diff_rank
                  .children(".rank")
                  .append($("<i>", { class: "fas fa-arrow-down" }), "&nbsp;", diff_rate, "%");
              }
            }
            status_data.append(label, before, now, diff);
            status.append(status_data);
          }
          info.append(status);

          var point = $("<div>", { class: "champ_point" });
          var point_label = $("<h4>", { class: "champ_point_label" });
          point_label.append("주목해야 할 포인트");
          var point_txt = $("<div>", { class: "champ_point_txtbox" });
          point_txt.append(data[i].desc_func);
          point.append(point_label, point_txt);
          info.append(point);
          var button = $("<button>");
          button.append("챔피언 상세정보 ", $("<i>", { class: "fas fa-arrow-right" }));
          info.append(button);
          slide.append(info);

          $(".pointbox").append($("<span>", { class: "slide_point" }));
        }
      }
    }

    let champ_slide = $(".champ_slide");
    let info_slide = $(".champ_info").parent();
    let slide_index = 0;
    let slide_position = -196 * (23 + slide_index);
    let slide_point = $(".pointbox span");
    $(info_slide[slide_index]).addClass("active");
    $(".slide_wrapper").css({ left: "50%", transform: "translateX(" + slide_position + "px)" });
    $(slide_point[slide_index]).css("backgroundColor", "#fff");

    $(champ_slide).click(function () {
      var this_index = $(this).index() % 20;
      /*console.log($(this).index() % 20);*/
      slide_index = this_index - 1;
      slide_change();
    });

    let slide_change = function () {
      slide_index++;
      if (slide_index >= 20) {
        slide_index = 0;
      }
      slide_position = -196 * (23 + slide_index);

      $(info_slide[slide_index]).addClass("active");
      $(info_slide[slide_index]).siblings().removeClass("active");
      $(".slide_wrapper")
        .css({ transform: "translateX(" + slide_position + "px)", marginLeft: "196px" })
        .animate({ marginLeft: "20px" }, "fast");
      $(slide_point[slide_index]).css("backgroundColor", "#fff");
      $(slide_point[slide_index]).siblings().css("backgroundColor", "rgba(255,255,255,0.2)");

      /*console.log(slide_index, slide_position, $(info_slide[slide_index]).children(".champ_name").text());*/
    };

    let main_slide = setInterval(slide_change, 5000);
    /*$(".active").hover(
      function () {
        clearInterval(main_slide);
      },
      function () {
        setInterval(main_slide, 5000);
      }
    );*/
    main_slide;
  },
});

// contents
//board_left
$.ajax({
  url: "data/hot_blog_list.json",
  dataType: "json",
  success: function (res) {
    let data = res.results;
    for (i = 0; i < data.length; i++) {
      var post = $("<a>", { class: "post", href: "https://lol.ps" + data[i].url });
      post.append(
        $("<i>").text(i + 1),
        $("<p>").append($("<span>", { class: "major" }).text("[" + data[i].major_name + "]"), data[i].title),
        $("<span>", { class: "comment" }).text("댓글 " + data[i].comment_count)
      );
      $(".board_left").append(post);
    }
  },
});
//board_right
$.ajax({
  url: "data/hot_blog_list.json",
  dataType: "json",
  success: function (res) {
    let data = res.results;
    for (i = 0; i < data.length; i++) {
      var post = $("<a>", { class: "post", href: "https://lol.ps" + data[i].url });
      post.append(
        $("<i>").text(i + 1),
        $("<p>").append($("<span>", { class: "major" }).text("[" + data[i].major_name + "]"), data[i].title),
        $("<span>", { class: "comment" }).text("댓글 " + data[i].comment_count)
      );
      $(".board_right").append(post);
    }
  },
});

// footer
$(".modal_btn").click(function () {
  $(this).siblings(".modal_bg").css({ display: "flex", alignItems: "center" }).animate({ opacity: "1" });
});

$(".close").click(function () {
  $(".modal_bg").hide();
});

//top_btn
$(".top_btn").click(function () {
  document.documentElement.scrollTop = 0;
});
$(".top_btn i").hover(
  function () {
    $(this).css("opacity", "0.5");
  },
  function () {
    $(this).css("opacity", "0.2");
  }
);
