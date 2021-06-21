var reviewGate = {
  default: {
    navbarColor: '#fff',
    emojiConfig: {
      emoji: 'star',
      fontSize: 42,
    },
  },
  init: function (selector, config) {
    var emojiConfig = config.emoji || this.default.emojiConfig;
    var navBarColor = config.navbarColor || this.default.navbarColor;
    var $step = $('.review-step');
    var $navbar = $('.review-gate-navbar');
    $('body').attr('data-active-step', 0);
    $navbar.fadeIn();
    $navbar.css('background-color', navBarColor);
    emojiConfig.onUpdate = config.onUpdate;
    $(selector).emojiRating(emojiConfig);
    !$step.hasClass('current') && $step.first().addClass('current');
    $step.each(function (index) {
      $(this).attr('data-step', index + 1);
    });
    $('.review-gate-navbar__btn').click(function () {
      reviewGate.step(1);
    });
  },
  step: function (step) {
    var $navBarButton = $('.review-gate-navbar__btn');
    $('body').attr('data-active-step', step);
    $('.review-step.current').removeClass('current');
    var target = $('#review-gate').find("[data-step='".concat(step, "']"));
    target.fadeIn(400);
    target.addClass('current');
    if (step > 1) {
      $navBarButton.removeClass('hide');
    } else {
      $navBarButton.addClass('hide');
    }
  },
};
