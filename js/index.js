// header scroll

let scroll_top = document.documentElement.scrollTop;
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
$(".gnb>li").hover(function () {
  $(this).children(".gnb_sub").css("display", "block").animate({ top: "35px", opacity: "1" }, 200);
});
$(".gnb>li").mouseleave(function () {
  $(this)
    .children(".gnb_sub")
    .animate({ top: "25px", opacity: "0" }, 200, function () {
      $(this).css("display", "none");
    });
});

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
console.log(current);
let current_month = (current.getMonth() < 10 ? "0" : "") + (current.getMonth() + 1);
let current_date = current.getDate();
$("#ref_time").text(current_month + "-" + current_date + " 기준");

//main-slide
