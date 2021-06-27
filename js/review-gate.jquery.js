(function ($) {
  $.fn.reviewGate = function (options) {
    var defaults = {
      stepClassName: 'review-step',
      navbarColor: '#fff',
      navBarClassName: 'review-gate-navbar',
      navBarBackBtnClassName: 'review-gate-navbar__btn',
      enableBackButton: true,
      emojiConfig: {
        emoji: 'star',
        fontSize: 42,
        attributes: {
          id: 'emoji-ratings-wrapper',
        },
        css: {},
      },
      onUpdate: function () {
        alert('Add an onUpdate function');
      },
    };

    // -- Configs
    var settings = $.extend(true, {}, defaults, options);
    var emojiConfig = Object.create(settings.emojiConfig);
    emojiConfig.onUpdate = settings.onUpdate;

    // Selectors
    var $selector = this;
    var $navbar = $('.' + settings.navBarClassName);
    var $navBarBackBtn = $('.' + settings.navBarBackBtnClassName);

    // -- Utility functions
    var findCurrentStep = function () {
      return $selector.find('.current').attr('data-step');
    };

    var updateCurrentStep = function (step) {
      var currentStep = step || findCurrentStep();
      window.reviewGateSettings.currentStep = currentStep;
      $('body').attr('data-current-step', currentStep);
    };

    var handleNavBackBtnDisplay = function () {
      var step = window.reviewGateSettings.currentStep;
      if (step > 1) {
        $navBarBackBtn.removeClass('hide');
      } else {
        $navBarBackBtn.addClass('hide');
      }
    };

    // -- Initialize Functions

    var initNavBar = function () {
      $navbar.fadeIn();
      $navbar.css('background-color', settings.navbarColor);
      $navBarBackBtn.addClass('hide');

      if (settings.enableBackButton) {
        $navBarBackBtn.click(function () {
          methods.step(1);
        });
      }
    };

    var initSteps = function () {
      var $step = $('.' + settings.stepClassName);
      !$step.hasClass('current') && $step.first().addClass('current');
      $step.each(function (index) {
        $(this).attr('data-step', index + 1);
      });
    };

    var initEmojiRating = function () {
      var emojiWrapper = $('<div />')
        .attr(settings.emojiConfig.attributes)
        .css(settings.emojiConfig.css)
        .appendTo($selector.children()[0]);

      if (!$.fn.emojiRating) {
        $.getScript('./js/jquery.emojiRatings.min.js', function () {
          try {
            $.fn.emojiRating;
            emojiWrapper.emojiRating(emojiConfig);
          } catch (err) {
            throw new Error('emojiRating library is a required dependency');
          }
        });
      } else {
        emojiWrapper.emojiRating(emojiConfig);
      }
    };

    var methods = {
      init: function () {
        window.reviewGateSettings = settings;
        initNavBar();
        initSteps();
        initEmojiRating();
        updateCurrentStep();
      },
      step: function (step) {
        console.log('WORKING', step);
        $('.review-step.current').removeClass('current');
        var target = $($selector).find("[data-step='".concat(step, "']"));
        target.fadeIn(400);
        target.addClass('current');
        updateCurrentStep(step);
        !!window.reviewGateSettings.enableBackButton &&
          handleNavBackBtnDisplay(step);
      },
    };

    if (methods[options]) {
      return methods[options].apply(
        this,
        Array.prototype.slice.call(arguments, 1)
      );
    } else if (typeof options === 'object' || !options) {
      // Default to "init"
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method ' + options + ' does not exist');
    }

    return this;
  };
})(jQuery);
