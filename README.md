# Review Gate

A lightweight review gate made with jQuery to capture user reviews that are not 5-star quality. This helps businesses collect both negative and positive feedback to better enhance their customer service experience.

The screenshot(s) below use a fake/pseudo company to illustrate the review gate.

## Quick Start

### HTML Markup Sample

```html
<nav class="review-gate-navbar" style="display: none">
  <button class="review-gate-navbar__btn">&#10094;</button>
  <div class="review-gate-navbar__logo-wrapper">
    <img
      class="review-gate-navbar__logo"
      src="./img/sample-logo.png"
      alt="logo"
    />
  </div>
</nav>

<main>
  <div id="review-gate">
    <section class="review-step">
      <h2 class="review-title">Rate Your Recent Experience</h2>
    </section>
    <section class="review-step">
      <h2 class="review-title">Please Leave Us A Review!</h2>
      <p>
        We are very happy to hear you had a positive experience with [ex:
        "bluetech"]. Please take a second to leave us a review on [review
        platform]
      </p>
      <a class="btn leave-review-btn" href="#">Leave Review</a>
    </section>
    <section class="review-step">
      <h2 class="review-title">Please Leave Us Some Feedback</h2>
      <p>
        We are sorry to hear you did not have a 5-Star experience. Please take a
        moment to leave us feedback on how we can improve.
        <br />
        <br />
        [Insert Your Feedback Form Here]
      </p>
    </section>
  </div>
</main>
```

### On Document Ready

```javascript
var config = {
  navbarColor: '#0f18e9',
  onUpdate: function (count) {
    if (count >= 5) {
      // Do something on good review
      $('#review-gate').reviewGate('step', 2);
    } else {
      // Do something on bad review
      $('#review-gate').reviewGate('step', 3);
    }
  },
};

$(document).ready(function () {
  $('#review-gate').reviewGate(config);
});
```

## Default Configs

If you do not specify a config object when you initialize the review gate the following will be used:

```javascript
var defaults = {
  stepClassName: 'review-step',
  navbarColor: '#fff',
  navBarClassName: 'review-gate-navbar',
  navBarBackBtnClassName: 'review-gate-navbar__btn',
  enableNavBackBtn: true,
  emojiConfig: {
    emoji: 'star',
    fontSize: 42,
    attributes: {
      id: 'emoji-ratings-wrapper',
      // You can spread additional HTML attributes to your emoji element wrapper.
      // By default, only an ID attribute is used.
    },
    css: {},
  },
  onUpdate: function () {
    alert('Add an onUpdate function');
  },
};
```

## User Journey

![userjourney](./img/user-journey-flow.png)

## Screenshots

![screenshot](./img/screenshots/screenshot-00.png)
![screenshot](./img/screenshots/screenshot-01.png)
![screenshot](./img/screenshots/screenshot-02.png)
![screenshot](./img/screenshots/screenshot-03.png)
![screenshot](./img/screenshots/screenshot-04.png)
