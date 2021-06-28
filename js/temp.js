if ($(window).width() >= 455) {
  $(".nav-item").hover(
    function () {
      $(this).addClass("show");
      $(this).children("a").attr("aria-expanded", "true");
      $(this).children("div").addClass("show");
    },
    function () {
      $(this).removeClass("show");
      $(this).children("a").attr("aria-expanded", "false");
      $(this).children("div").removeClass("show");
    }
  );
}
$(window).on("scroll", function () {
  if ($(this).scrollTop() > 100) {
    $("header").addClass("scrolldown");
  } else {
    $("header").removeClass("scrolldown");
  }
});
if ($(window).width() > 454.98 && $(window).width() < 1180) {
  $(window).scroll(function () {
    var originalLeft = 0;
    var left = originalLeft - $(this).scrollLeft();
    $("header").css("left", left);
    $(".slide-champion").css("left", left);
    $(".slide-video").css("left", left);
    $(".menu-scroll").css("left", left);
  });
} else {
}
window.onload = function () {
  if ($(window).width() > 454.98) {
    var contentHeight = $(".ad-widebox .contents").height();
    var leftAD = $(".ad-widebox .side-left");
    var rightAD = $(".ad-widebox .side");
    $(leftAD).css("height", contentHeight);
    $(rightAD).css("height", contentHeight);
  } else {
  }
};
var select_light = $(".select2.light");
if (select_light.length > 0) {
  select_light.select2({ width: "resolve", minimumResultsForSearch: -1, theme: "light" });
}
var select_dark = $(".select2.dark");
if (select_dark.length > 0) {
  select_dark.select2({ width: "resolve", minimumResultsForSearch: -1, theme: "dark" });
}
var select_suboptions = $(".select2.suboption");
if (select_suboptions.length > 0) {
  select_suboptions.select2({
    templateResult: function (data) {
      if (!data.element) {
        return data.text;
      }
      var $element = $(data.element);
      var $wrapper = $("<span></span>");
      $wrapper.addClass($element[0].className);
      $wrapper.text(data.text);
      return $wrapper;
    },
    width: "resolve",
    minimumResultsForSearch: -1,
    theme: "dark",
    dropdownCssClass: "bigdrop",
    containerCssClass: "text-left",
  });
}
$("[data-toggle=popover]:not(.manual_popover)").popover({
  html: true,
  trigger: "hover",
  content: function () {
    return $("#popover-content").html();
  },
});
$(".manual_popover")
  .popover({
    html: true,
    trigger: "manual",
    content: function () {
      return $("#popover-content").html();
    },
  })
  .on("mouseenter", function () {
    var thispoplink = $(this);
    setTimeout(function () {
      if (thispoplink.is(":hover")) {
        thispoplink.popover("show");
        $("body .popover").on("mouseleave", function () {
          thispoplink.popover("hide");
        });
      }
    }, 100);
  })
  .on("mouseleave", function () {
    var thispoplink = $(this);
    setTimeout(function () {
      if (!$("body").find(".popover:hover").length) {
        thispoplink.popover("hide");
      }
    }, 100);
  });
lightbox.option({ positionFromTop: 0, disableScrolling: true, maxWidth: 600, maxHeight: 600 });
window.onscroll = function (e) {
  $(".go-to-top").show(2500);
};
$(".go-to-top").click(function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
(function () {
  var doc = document.documentElement;
  var w = window;
  var prevScroll = w.scrollY || doc.scrollTop;
  var curScroll;
  var direction = 0;
  var prevDirection = 0;
  var header = document.getElementById("menu-scroll");
  var checkScroll = function () {
    curScroll = w.scrollY || doc.scrollTop;
    if (curScroll > prevScroll) {
      direction = 2;
    } else if (curScroll < prevScroll) {
      direction = 1;
    }
    if (direction !== prevDirection) {
      toggleHeader(direction, curScroll);
    }
    prevScroll = curScroll;
  };
  var toggleHeader = function (direction, curScroll) {
    if (direction === 2 && curScroll > 96) {
      if (header) {
        if (header.length > 0) header.addClass("hide");
        prevDirection = direction;
      }
    } else if (direction === 1) {
      if (header) {
        if (header.length > 0) header.removeClass("hide");
        prevDirection = direction;
      }
    }
  };
  window.addEventListener("scroll", checkScroll);
})();
if ($(window).width() < 454.98) {
  $("[data-toggle=popover]").on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    var title = "";
    if ($(this).data("original-title") != undefined && $(this).data("original-title") != "") {
      title = $(this).data("original-title");
    } else if ($(this).data("title") != undefined && $(this).data("title") != "") {
      title = $(this).data("title");
    }
    var content_ele = $("#mobile_tooltip_content");
    $("#mobile_tooltip_title").text(title);
    content_ele.html($(this).data("content"));
    var url = $(this).data("url");
    var url_name = $(this).data("url_name");
    var against_url = $(this).data("against_url");
    var against_url_name = $(this).data("against_url_name");
    if (url && url_name) {
      content_ele.append($("<br>"));
      content_ele.append($("<a>", { class: "btn btn-white-theme", href: url, text: url_name }));
    }
    if (against_url && against_url_name) {
      content_ele.append(
        $("<a>", { class: "btn btn-theme", href: against_url, text: against_url_name, style: "float: right" })
      );
    }
    $("#mobile_tooltip").removeClass("d-none");
  });
}
$("#mobile_tooltip_close_btn").on("click", function () {
  $("#mobile_tooltip").addClass("d-none");
  $("#mobile_tooltip_title").text("");
  $("#mobile_tooltip_content").empty();
});

$(document).mouseup(function (e) {
  var container = $("#search_form");
  if (!container.is(e.target) && container.has(e.target).length === 0) {
    $(".result-prev").addClass("d-none");
  }
});
var realtime_ul = $("#realtime_ul");
var real_ul_total_height = realtime_ul.height();
var real_ul_max_margin = 31 - real_ul_total_height;
var real_ul_now_margin = 0;
function real_time_search() {
  $.ajax({
    method: "get",
    url: "/realtime_search/",
    success: function (res) {
      console.log(res);
      for (var i = 0; i < res["word_list"].length; i++) {
        var li_ele = $("<li>");
        realtime_ul.append(li_ele);
        var a_ele = $("<a>", { class: "realtime_word_a", href: "javascript:;", on: { click: word_click } });
        li_ele.append(a_ele);
        a_ele.append($("<span>", { text: i + 1 }));
        a_ele.append(res["word_list"][i]);
      }
      real_ul_total_height = realtime_ul.height();
      real_ul_max_margin = 31 - real_ul_total_height;
      recursive();
    },
  });
}
real_time_search();
function scrolling() {
  real_ul_now_margin -= 31;
  if (real_ul_now_margin < real_ul_max_margin) {
    real_ul_now_margin = 0;
  }
  realtime_ul.css({ transform: "translate3d(0px, " + real_ul_now_margin + "px, 0px)" });
}
function recursive() {
  setTimeout(function () {
    scrolling();
    recursive();
  }, 3000);
}
function word_click() {
  var event_ele = $(this);
  var realtime_div = $(this).parents("div.realtime:first");
  if (realtime_div.hasClass("open")) {
    $("div.searchbar")
      .find("input:first")
      .val($(this).contents().not($(this).children()).text());
    $("#search_form").submit();
  } else {
    realtime_div.addClass("open");
    var now_number = parseInt($(this).find("span").text());
    realtime_ul.find("li").each(function () {
      if (parseInt($(this).find("span").text()) === now_number + 1) {
        event_ele.parents("li").insertBefore($(this));
      }
    });
  }
}
function set_blog_list(wrapper, id) {
  var ajax_url = "/community/api/hot_blog_list/";
  if (id) {
    ajax_url += "?category_id=" + id;
  }
  $.ajax({
    method: "get",
    url: ajax_url,
    success: function (res) {
      var hot_blog_wrapper = wrapper;
      var data = res["results"];
      for (var i = 0; i < data.length; i++) {
        var a_tag = $("<a>", { class: "post", href: data[i]["url"] });
        hot_blog_wrapper.append(a_tag);
        a_tag.append($("<i>", { text: i + 1 }));
        if (i < 3) {
          var thumb = $("<span>", { class: "thumb" });
          thumb.append(
            $("<div>", { class: "img", style: 'background-image: url("' + data[i]["img_url"] + '");' })
          );
          a_tag.append(thumb);
          var item_wrapper = $("<div>");
          a_tag.append(item_wrapper);
          var title_p = $("<p>");
          item_wrapper.append(title_p);
          title_p.append($("<span>", { text: "[" + data[i]["major_name"] + "]" }));
          title_p.append(data[i]["title"]);
          var vote = $("<span>", { class: "vote" });
          item_wrapper.append(vote);
          var icon = $("<span>", { class: " iconfont up" });
          icon.append($("<i>", { class: "icf-arrow-thick" }));
          vote.append(icon).append(data[i]["like_count"]);
          var comment_wrapper = $("<div>");
          a_tag.append(comment_wrapper);
          comment_wrapper.append($("<span>", { text: "�볤� " + data[i]["comment_count"] }));
          comment_wrapper.append($("<span>", { text: data[i]["time_since"] + " ��" }));
        } else {
          var vote = $("<span>", { class: "vote" });
          a_tag.append(vote);
          var icon = $("<span>", { class: " iconfont up" });
          icon.append($("<i>", { class: "icf-arrow-thick" }));
          vote.append(icon).append(data[i]["like_count"]);
          var title_p = $("<p>");
          a_tag.append(title_p);
          title_p.append($("<span>", { text: "[" + data[i]["major_name"] + "]" }));
          title_p.append(data[i]["title"]);
          a_tag.append($("<span>", { text: "�볤� " + data[i]["comment_count"] }));
        }
      }
    },
  });
}
function index_champ_list() {
  $.ajax({
    method: "get",
    url: "/index_champ/",
    success: function (res) {
      var wrapper = $("#index_champ_wrapper");
      var data = res["results"];
      for (var i = 0; i < data.length; i++) {
        var slide = $("<div>", { class: "swiper-slide champ-slide" });
        wrapper.append(slide);
        var slide_img = $("<div>", { class: "slide-image" });
        slide_img.append(
          $("<div>", {
            class: "champslide-loadimg hide-mobile champ_loading_" + data[i]["champion"]["data_key"],
          })
        );
        slide.append(slide_img);
        var faceimg = $("<div>", { class: "champslide-faceimg hide-pc" });
        faceimg.append(
          $("<div>", { class: "champion-portrait champ_portrait_" + data[i]["champion"]["data_key"] })
        );
        slide.append(faceimg);
        var name_ele = $("<h3>", { class: "champion-name", text: data[i]["champion"]["name"] });
        name_ele.append($("<small>", { text: "(" + data[i]["lane"] + ")" }));
        slide.append(name_ele);
        var info = $("<div>", { class: "champslide-infobox" });
        slide.append(info);
        var status_ul = $("<ul>", { class: "champ-status" });
        info.append(status_ul);
        var header = $("<li>", { class: "header" });
        status_ul.append(header);
        header.append($("<h2>", { class: "champinfo-label" }));
        header.append(
          $("<span>", { class: "champinfo-before", text: data[i]["info"]["before"]["version"] + "�⑥튂" })
        );
        var now = $("<span>", { class: "champinfo-now" });
        header.append(now);
        var header_icf = $("<span>", { class: "iconfont" });
        now.append(header_icf);
        header_icf.append($("<i>", { class: "icf-arrow-thick" }));
        now.append(data[i]["info"]["now"]["version"] + "�⑥튂");
        header.append($("<div>", { class: "champinfo-difference" }));
        var win_rate_li = $("<li>");
        status_ul.append(win_rate_li);
        win_rate_li.append($("<h4>", { class: "champinfo-label", text: "�밸쪧" }));
        win_rate_li.append(
          $("<span>", { class: "champinfo-before", text: data[i]["info"]["before"]["win_rate"] + "%" })
        );
        now = $("<span>", { class: "champinfo-now" });
        win_rate_li.append(now);
        header_icf = $("<span>", { class: "iconfont" });
        now.append(header_icf);
        header_icf.append($("<i>", { class: "icf-arrow-thick" }));
        now.append(data[i]["info"]["now"]["win_rate"] + "%");
        var diff = $("<div>", { class: "champinfo-difference" });
        win_rate_li.append(diff);
        var win_rate_up_down = "";
        if (data[i]["info"]["diff"]["win_rate"] > 0) {
          win_rate_up_down = "up";
        } else if (data[i]["info"]["diff"]["win_rate"] < 0) {
          win_rate_up_down = "down";
        }
        var win_rate_rank_div = $("<div>", { class: "rank" });
        win_rate_rank_div.addClass(win_rate_up_down);
        diff.append(win_rate_rank_div);
        var win_rate_rank_inner = $("<div>");
        win_rate_rank_div.append(win_rate_rank_inner);
        var win_rate_icf = $("<span>", { class: "iconfont" });
        win_rate_rank_inner.append(win_rate_icf);
        var win_rate_diff_class = "icf-arrow-thick";
        if (win_rate_up_down == "") {
          win_rate_diff_class = "icf-minus";
        }
        win_rate_icf.append($("<i>", { class: win_rate_diff_class }));
        var win_rate_span = $("<span>", { text: data[i]["info"]["diff"]["win_rate"] + "%" });
        if (data[i]["info"]["diff"]["win_rate"] >= 10 || data[i]["info"]["diff"]["win_rate"] <= -10) {
          win_rate_span.css("font-size", "12px");
        }
        win_rate_rank_inner.append(win_rate_span);
        var pick_rate_li = $("<li>");
        status_ul.append(pick_rate_li);
        pick_rate_li.append($("<h4>", { class: "champinfo-label", text: "�쎈쪧" }));
        pick_rate_li.append(
          $("<span>", { class: "champinfo-before", text: data[i]["info"]["before"]["pick_rate"] + "%" })
        );
        now = $("<span>", { class: "champinfo-now" });
        pick_rate_li.append(now);
        header_icf = $("<span>", { class: "iconfont" });
        now.append(header_icf);
        header_icf.append($("<i>", { class: "icf-arrow-thick" }));
        now.append(data[i]["info"]["now"]["pick_rate"] + "%");
        var diff = $("<div>", { class: "champinfo-difference" });
        pick_rate_li.append(diff);
        var pick_rate_up_down = "";
        if (data[i]["info"]["diff"]["pick_rate"] > 0) {
          pick_rate_up_down = "up";
        } else if (data[i]["info"]["diff"]["pick_rate"] < 0) {
          pick_rate_up_down = "down";
        }
        var pick_rate_rank_div = $("<div>", { class: "rank" });
        pick_rate_rank_div.addClass(pick_rate_up_down);
        diff.append(pick_rate_rank_div);
        var pick_rate_rank_inner = $("<div>");
        pick_rate_rank_div.append(pick_rate_rank_inner);
        var pick_rate_icf = $("<span>", { class: "iconfont" });
        pick_rate_rank_inner.append(pick_rate_icf);
        var pick_rate_diff_class = "icf-arrow-thick";
        if (pick_rate_up_down == "") {
          pick_rate_diff_class = "icf-minus";
        }
        pick_rate_icf.append($("<i>", { class: pick_rate_diff_class }));
        var pick_rate_span = $("<span>", { text: data[i]["info"]["diff"]["pick_rate"] + "%" });
        if (data[i]["info"]["diff"]["pick_rate"] >= 10 || data[i]["info"]["diff"]["pick_rate"] <= -10) {
          pick_rate_span.css("font-size", "12px");
        }
        pick_rate_rank_inner.append(pick_rate_span);
        var ban_rate_li = $("<li>");
        status_ul.append(ban_rate_li);
        ban_rate_li.append($("<h4>", { class: "champinfo-label", text: "諛댁쑉" }));
        ban_rate_li.append(
          $("<span>", { class: "champinfo-before", text: data[i]["info"]["before"]["ban_rate"] + "%" })
        );
        now = $("<span>", { class: "champinfo-now" });
        ban_rate_li.append(now);
        header_icf = $("<span>", { class: "iconfont" });
        now.append(header_icf);
        header_icf.append($("<i>", { class: "icf-arrow-thick" }));
        now.append(data[i]["info"]["now"]["ban_rate"] + "%");
        var diff = $("<div>", { class: "champinfo-difference" });
        ban_rate_li.append(diff);
        var ban_rate_up_down = "";
        if (data[i]["info"]["diff"]["ban_rate"] > 0) {
          ban_rate_up_down = "up";
        } else if (data[i]["info"]["diff"]["ban_rate"] < 0) {
          ban_rate_up_down = "down";
        }
        var ban_rate_rank_div = $("<div>", { class: "rank" });
        ban_rate_rank_div.addClass(ban_rate_up_down);
        diff.append(ban_rate_rank_div);
        var ban_rate_rank_inner = $("<div>");
        ban_rate_rank_div.append(ban_rate_rank_inner);
        var ban_rate_icf = $("<span>", { class: "iconfont" });
        ban_rate_rank_inner.append(ban_rate_icf);
        var ban_rate_diff_class = "icf-arrow-thick";
        if (ban_rate_up_down == "") {
          ban_rate_diff_class = "icf-minus";
        }
        ban_rate_icf.append($("<i>", { class: ban_rate_diff_class }));
        var ban_rate_span = $("<span>", { text: data[i]["info"]["diff"]["ban_rate"] + "%" });
        if (data[i]["info"]["diff"]["ban_rate"] >= 10 || data[i]["info"]["diff"]["ban_rate"] <= -10) {
          ban_rate_span.css("font-size", "12px");
        }
        ban_rate_rank_inner.append(ban_rate_span);
        var point_div = $("<div>", { class: "champ-point" });
        info.append(point_div);
        point_div.append($("<h4>", { class: "champinfo-label", text: "二쇰ぉ�댁빞 �� �ъ씤��" }));
        point_div.append(
          $("<div>", { html: data[i]["desc_func"], class: "simple-bar" })
            .attr("data-simplebar", "")
            .attr("data-simplebar-auto-hide", "false")
        );
        var champ_link = $("<div>", { class: "champ-link text-right" });
        info.append(champ_link);
        var link_ele = $("<a>", {
          class: "btn btn-white-theme",
          href: "/champ/" + data[i]["champion"]["data_key"] + "/statistics/",
        });
        champ_link.append(link_ele);
        link_ele.append($("<i>", { class: "hide-mobile", text: "梨뷀뵾�� " }));
        link_ele.append("�곸꽭�뺣낫");
        var link_icf = $("<span>", { class: "iconfont" });
        link_ele.append(link_icf);
        link_icf.append($("<i>", { class: "icf-arrow-thick" }));
      }
      new Swiper(".slide-champion", {
        slidesPerView: "auto",
        navigation: { nextEl: ".champslide-next", prevEl: ".champslide-prev" },
        centeredSlides: true,
        autoplay: { delay: 5000, disableOnInteraction: false },
        slideToClickedSlide: true,
        loop: true,
        pagination: { el: ".champlist-pagination" },
      });
    },
  });
}
