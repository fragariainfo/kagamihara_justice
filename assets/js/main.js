$(window).ready(function () {

    // menu
    function toggleMenu() {
        $('.menu_icon').toggleClass('open');
        $('.navigation').toggleClass('show');
    }
    $('.menu_icon').click(function () {
        toggleMenu();
    });
    $('.navigation a[href^="#"]').click(function () {
        toggleMenu();
    });

    // smooth scroll
    $('a[href^="#"]').click(function () {
        let speed = 500;
        let href = $(this).attr("href");
        let target = $(href == "#" || href == "" ? 'html' : href);
        const header = $('header');
        let position = target.offset().top - header.outerHeight() - 20;
        $("html, body").animate({ scrollTop: position }, speed, "swing");
        location.hash = href;
        return false;
    });

    // parallax bg
});

$(window).on('load', function () {

    // start transition for Chrome
    $("body").removeClass("preloaded");

    // show navigation bg
    const header = $('header');
    function checkScrollPosition() {
        const showNavPosition = $('.show_nav_area').offset().top - header.outerHeight();
        const currentScrollPosition = $(window).scrollTop();
        if (showNavPosition < currentScrollPosition) {
            header.addClass('show_bg');
        } else {
            header.removeClass('show_bg');
        }
    }
    function parallaxBackground() {
        const currentScrollPosition = $(window).scrollTop();
        const bgPosition = currentScrollPosition / 2;

        $('html').css('background-position', `center top calc(-1% - ${bgPosition}px)`);
    }
    $(window).scroll(function () {
        checkScrollPosition();
        parallaxBackground();
    });
    checkScrollPosition();
    parallaxBackground();

    // loading
    $('.load_overlay').addClass('loaded');
});
