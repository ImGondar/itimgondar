$(function(){
  (function(){
    // 隐藏载入动画
    $(window).load(function() {
      $('#loading').fadeOut(800);
    });
    
    // 轮播图
    var bannerSlider = $("#banner .banner-container").owlCarousel({
      loop:true,
      items: 1,
      autoplay: true,
      animateOut: 'bounceOut',
      animateIn: 'fadeIn',
      autoplayTimeout: 3000,
      mouseDrag: false,
      touchDrag: false
    });
    $('#banner .prev-button').on('click',function(){
      bannerSlider.trigger('prev.owl.carousel');
    });
    $('#banner .next-button').on('click',function(){
      bannerSlider.trigger('next.owl.carousel');
    });
    $("#members").owlCarousel({
      loop:true,
      items: 5,
      autoWidth:true,
      dots: false,
      autoplay: true,
      autoplayHoverPause: true,
      center: true,
      nav: true,
      navText: []
    });

    // 团队成员了解更多
    var $knowMores = $('.know-more');
    var $knowBacks = $('.back-icon');
    $knowMores.click(function(){
      var $front = $(this).parents('.front');
      $front.addClass('front-hover');
      $front.siblings('.back').addClass('back-hover');
      return false;
    });
    $knowBacks.click(function(){
      var $back = $(this).parents('.back');
      $back.removeClass('back-hover');
      $back.siblings('.front').removeClass('front-hover');
      return false;
    });

    // 导航栏下划线控制
    var serviceTop = $('#service').offset().top - 150,
        caseTop = $('#case').offset().top - 150,
        teamTop = $('#team').offset().top - 150,
        $anchors = $('#header .link'),
        $anchorParents = $('#header .nav li'),
        $curBar = $('#cur-bar'),
        $headerContainer = $('#header .header-container'),
        curIndex = -1,
        curFlag = 0;

    function getParam(index) {
      var i = typeof (index) == "number" ? index : curIndex,
          navLeft = $('#header .nav').offset().left,
          curWidth = $anchors.eq(i).width() + 10,
          curLeft = $anchors.eq(i).offset().left - navLeft + 52;
      return {
        curWidth: curWidth,
        curLeft: curLeft
      };
    }

    function switchCur(index) {
      if (!curFlag) {
        var params = getParam(index);
        $curBar.stop().animate({
          left: params.curLeft,
          width: params.curWidth
        }, 400);
      }
    }

    $anchors.hover(function(){
      var width = $(this).width() + 10,
          navLeft = $('#header .nav').offset().left,
          left = $(this).offset().left - navLeft + 52,
          i = $anchors.index($(this));
      $curBar.stop().animate({
        left: left,
        width: width,
      }, 400, function(){
        $anchorParents.eq(i).addClass('active').siblings('li').removeClass('active');
      });
    }, function(){
      if (!curFlag) {
        var params = getParam();
        $curBar.stop().animate({
          left: params.curLeft,
          width: params.curWidth,
        }, 800, function(){
        $anchorParents.eq(curIndex).addClass('active').siblings('li').removeClass('active');
      });
    }});

    function toggleScroll() {
      var scrollTop = $(window).scrollTop();
      var preIndex = curIndex;

      if (scrollTop > 20) {
        $headerContainer.addClass('fixed');
      } else {
        $headerContainer.removeClass('fixed');
      }
      if (scrollTop < serviceTop) {
        curIndex = 0;
      } else if (scrollTop < caseTop) {
        curIndex = 1;
      } else if (scrollTop < teamTop) {
        curIndex = 2;
      } else {
        curIndex = 3;
      }
      if ( preIndex != curIndex ) {
        switchCur(curIndex);
      }
      if (!curFlag) {
        $anchorParents.eq(curIndex).addClass('active').siblings('li').removeClass('active');
      }
    }

    toggleScroll();

    $(window).scroll(toggleScroll);

    // 滑动到锚链接
    $anchors.click(function () {
      var hr = $(this).attr("href");
      var anh = $(hr).offset().top - 80;
      var index = $anchors.index($(this));
      var params = getParam(index);
      curFlag = 1;
      $curBar.animate({
        left: params.curLeft,
        width: params.curWidth
      }, 400);
      $("html,body").stop().animate({
        scrollTop: anh
      }, 1000, function(){
        curFlag = 0;
      });
      return false;
    });

  })();
});
