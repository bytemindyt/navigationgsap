








"use strict";
let menuLink = $(".menu-drop-link");
let content = $(".menu-dropdown");
let menuBG = $(".menu-bg");
let dropdownWrap = $(".menu-content");
let menuArrow = $(".menu-arrow-wrap");
function switchDropdown(currentLink, previousContent, currentContent) {
    gsap.to(menuArrow, {
        width: currentLink.outerWidth(),
        x: currentLink.offset().left
    });
    gsap.to(menuBG, {
        width: currentContent.outerWidth(),
        height: currentContent.outerHeight()
    });
    let moveDistance = 10;
    if (currentContent.index() < previousContent.index()) {
        moveDistance = moveDistance * -1;
    }
    gsap.fromTo(previousContent, { opacity: 1, x: "0em" }, { opacity: 0, x: -1 * moveDistance + "em", duration: 0.3 });
    gsap.fromTo(currentContent, { opacity: 0, x: moveDistance + "em" }, { opacity: 1, x: "0em", duration: 0.3 });
}
let showDropdown = gsap.timeline({ onReverseComplete: () => {
        dropdownWrap.css("display", "none");
        menuLink.removeClass("active");
    } });
showDropdown.from(dropdownWrap, { opacity: 0, rotateX: -40, duration: 0.2 }).to(menuArrow, { opacity: 1, duration: 0.2 }, "<");
function revealDropdown(currentLink, currentContent) {
    dropdownWrap.css("display", "flex");
    showDropdown.restart();
    gsap.set(menuArrow, {
        width: currentLink.outerWidth(),
        x: currentLink.offset().left
    });
    gsap.set(menuBG, {
        width: currentContent.outerWidth(),
        height: currentContent.outerHeight()
    });
    gsap.set(content, {
        opacity: 0
    });
    gsap.set(currentContent, {
        opacity: 1,
        x: "0em"
    });
}
menuLink.on("mouseenter", function () {
    let previousLink = menuLink.filter(".active").removeClass("active");
    let currentLink = $(this).addClass("active");
    let previousContent = content.filter(".active").removeClass("active");
    let currentContent = content.eq($(this).index()).addClass("active");
    if (previousLink.length > 0) {
        switchDropdown(currentLink, previousContent, currentContent);
    }
    else {
        revealDropdown(currentLink, currentContent);
    }
});
$(".menu-drop-wrapper").on("mouseleave", function () {
    showDropdown.reverse();
});

