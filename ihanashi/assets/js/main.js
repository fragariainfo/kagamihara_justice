$(window).ready(function () {

    // menu
    function toggleMenu() {
        $('.menu_icon').toggleClass('open');
        $('.side_navigation').toggleClass('show');
    }
    $('.menu_icon').click(function () {
        toggleMenu();
    });
    $('.side_navigation a[href^="#"]').click(function () {
        toggleMenu();
    });
    $('.side_navigation').click(function (event) {
        if ($(event.target).closest('.navigation').length == 0) {
            toggleMenu();
        }
    })

    // character slider
    const characterSlider = $('.character_list').slick();
    $('.character_icon_list > li').click(function (event) {
        const index = $(event.currentTarget).data('slider-index');
        characterSlider.slick('slickGoTo', index);
    });
    $('.character_list').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        $('.character_icon_list > li').removeClass('selected');
        $(`.character_icon_list > li[data-slider-index=${nextSlide}]`).addClass('selected');
    })
    AOS.refresh();

    // gallery modal
    const modal = $('#modal');
    $('.gallery_list a').click(function (event) {
        event.preventDefault();
        const imgURL = $(event.currentTarget).attr('href');
        const newImgEl = $('<img>').addClass('content').attr('src', imgURL);

        modal.children('.content').remove();
        modal.append(newImgEl);
        modal.fadeIn(300);
    })
    modal.click(function (event) {
        if (!$(event.target).hasClass('content')) {
            modal.fadeOut(300);
        }
    })

    // smooth scroll
    $('a[href^="#"]').click(function () {
        let speed = 500;
        let href = $(this).attr("href");
        let target = $(href == "#" || href == "" ? 'html' : href);
        let position = target.offset().top - $('header').outerHeight();
        $("html, body").animate({ scrollTop: position }, speed, "swing");
        location.hash = href;
        return false;
    });
});

$(window).on('load', function () {

    function toggleNavigationBackground() {
        const header = $('header');
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
        const bgPosition = currentScrollPosition / 8;

        $('.bg_dust').css('top', `-${bgPosition}px`);
    }

    $(window).scroll(function () {
        toggleNavigationBackground();
        parallaxBackground();
    });
    toggleNavigationBackground();
    parallaxBackground();

    $('.load_overlay').addClass('loaded');
});
