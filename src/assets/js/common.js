/**
 * Navボタン 演出
 */
$(function() {
  let nav_btn = $('#js-Header_Nav'),
      nav = $('.js-Nav'),
      nav_img = $('.st-Header_Logo_Wrapper'),
      header = $('#js-Header');
      header_Bg = $('#js-Nav_Bg');

  nav_btn.on('click', function() {
    $(this).toggleClass('clicked');
    nav_img.toggleClass('clicked');
    header_Bg.toggleClass('clicked');

    nav.toggleClass('clicked');

    if(header_Bg.hasClass('clicked')){
      TweenMax.to(header_Bg, 0.2, {
        left: '0%',
        opacity: 1
      });
    } else {
      TweenMax.to(header_Bg, 0.2, {
        left: '100%',
        opacity: 0
      });
    }
  });
});

/**
 * 10px スクロールしたらロゴか消える
 */
$(function() {

  let header  = $('.st-Header_Logo_Wrapper'),
  header_height = header.height(),
  windowWidth = $(window).width();

  // スクロールしたら発動
  $(window).on('scroll', function() {

    // スクロール量を変数に格納
    var current_sc_top = $(this).scrollTop();

    if (windowWidth <= 1024) {

      if (current_sc_top > 10) {
        header.addClass('hidden');
      } else {
        header.removeClass('hidden');
      }
    }
  });
});

// スムーススクロール
// 参考
// http://kyasper.com/jquery-tips/
// エラー対応 https://goo.gl/yai3jM
$(function(){
  // #で始まるアンカーをクリックした場合に処理
  $('a[href^="#"]').click(function() {
    // スクロールの速度
    var speed = 400; // ミリ秒
    // アンカーの値取得
    var href= $(this).attr("href");
    // 移動先を取得
    var target = $(href == "#" || href == "" ? 'html' : href);
    // 移動先を数値で取得
    var position = target.offset().top;
    // スムーススクロール
    $('body,html').animate({scrollTop:position}, speed, 'swing');
    return false;
  });
});

// 何秒後にloding消す
setTimeout("loading_hidden()", 7000);
function loading_hidden() {
  $('#js-Loading').css('display', 'none');
  $('#js-Loading_Bg').css('display', 'none');
}

// スクロールしたらfade in するやつ（1）
function scroll (fade_in_elements) {

  $(window).scroll(function(){

      let sc = $(this).scrollTop(),
          img = fade_in_elements.offset().top;

        if (sc + 1000 > img) {
          fade_in_elements.addClass('fade-In');
        }
  });
}
// スクロールしたらfade in するやつ（2）
$(function() {
  $('.js-img_scroll_fade_in').each(function() {
    scroll($(this));
  });
});


// ページ遷移 して自動スクロール
// 参考：http://uxmilk.jp/9205
// 参考：http://webdrawer.net/javascript/scrolljs.html
$(function() {
  // アンカーの取得、location.hashを利用して#以降の部分を取得
  let urlHash = location.hash;

  // 下層ページのナビゲーションから（PC）社員インタビューを押してTOPに遷移したら1秒待って社員インタビューまでスクロールする
  if (urlHash == "#js-Person_Wrapper") {
    $('html,body').delay(3600).animate({scrollTop: $("#top-Person_Wrapper").offset().top}, "slow");

  // 下層ページのナビゲーションから（PC）駐在員インタビューを押してTOPに遷移したら1秒待って駐在員インタビューまでスクロールする
  } else if (urlHash == "#js-Resident_Wrapper") {
    $('html,body').delay(3600).animate({scrollTop: $("#top-Resident_Wrapper").offset().top}, "slow");
  }
});

// スクロール量がMVの底辺こえたらpage top 現れる
$(function() {

      // MV超えたらtoggleClass付与する用
      let page_top = $('#js-Page_Top'),
          // contents部分の高さを計測する用
          body_top = $('#js-offset_body').offset().top;

      // スクロールしたら発動
      $(window).on('scroll', function() {

        // スクロール量を変数に格納
        let sc = $(this).scrollTop();

        if (sc > body_top) {
          page_top.addClass('show');
        } else {
          page_top.removeClass('show');
        }
      });
});
