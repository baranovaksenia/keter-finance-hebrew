const hamburger = document.querySelector('.hamburger'),
      menu = document.querySelector('.menu'),
      closeElem = document.querySelector('.menu__close');

hamburger.addEventListener('click', () => {
    menu.classList.add('active');

closeElem.addEventListener('click', () => {
    menu.classList.remove('active');
});
});

$(document).ready(function(){
    $('.carousel__inner').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3700,
      adaptiveHeight: true,
      prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.png"></button>',
      nextArrow: '<button type="button" class="slick-next"><img src="icons/right.png"></button>',
      responsive: [
        {
          breakpoint: 768,
          settings: "unslick"
        }
      ]
    });
  
  function toggleSlide(item) {
  $(item).each(function(i) {
    $(this).on('click', function(e) {
      e.preventDefault();
      $('.services-item__content').eq(i).toggleClass('services-item__content_active');
      $('.services-item__descr').eq(i).toggleClass('services-item__descr_active');
    });
  });
  }
  
  toggleSlide('.services-item__link');
  toggleSlide('.services-item__back');
  
  // Modal
  $('[data-modal=consultation]').on('click', function() {
    $('.overlay, #consultation').fadeIn('slow');
  });
  $('.modal__close').on('click', function() {
    $('.overlay, #consultation, #thanks').fadeOut('slow');
  });
  $('.button_mini').each(function(i) {
    $(this).on('click', function() {
      $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
      $('.overlay, #order').fadeIn('slow');
    });
  });
  
  // Smoth scroll and pageup
  $(window).scroll(function() {
    if($(this).scrollTop() > 1600) {
    $('.pageup').fadeIn();
    } else {
    $('.pageup').fadeOut();
    }
    });
  
    $("a[href^='#']").click(function(){
      var _href = $(this).attr("href");
      $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
      return false;
  });
      new WOW().init();

  function validateForms(form){
    $(form).validate({
        rules: {
            name: {
                required: true,
                minlength: 2
            },
            phone: "required",
            email: {
                required: true,
                email: true
            }
        },
        messages: {
            name: {
                required: "אנא הכנס את שמך",
                minlength: jQuery.validator.format("הזן {2} תוויםа")
              },
            phone: "תכניס את מספר הטלפון שלך",
            email: {
              required: "הזן את הדואר שלך",
              email: "כתובת דוא' ל שהוזנה בצורה שגויה"
            }
        }
    });
}

validateForms('#consultation');
validateForms('#consultation-form');



$('form').submit(function(e) {
  e.preventDefault();
  $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize()
  }).done(function() {
      $(this).find("input").val("");
      $('#consultation').fadeOut();
      $('.overlay, #thanks').fadeIn('slow');

      $('form').trigger('reset');
  });
  return false;
  });
});
