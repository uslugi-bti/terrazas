document.addEventListener("DOMContentLoaded", function () {
    function testWebP(callback) {
        var webP = new Image();
        webP.onload = webP.onerror = function () {
            callback(webP.height == 2);
        };
        webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }
    testWebP(function (support) {
        if (support == true) {
            document.querySelector('body').classList.add('webp');
        } else {
            document.querySelector('body').classList.add('no-webp');
        }
    });

    const body = document.querySelector("body");
    const headerMenu = document.querySelector(".header__menu");
    const headerList = document.querySelector(".header__list");
    const headerBody = document.querySelector(".header__body");
    const headerClose = document.querySelector(".header__close");

    const headerLinks = document.querySelectorAll(".header__item>a");
    const headerButton = document.querySelector(".header__link");

    function moveHeaderButton() {
        const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        if (viewport_width <= 1400) {
            headerList.insertBefore(headerButton, headerList.children[2]);
        } else {
            headerBody.insertBefore(headerButton, headerBody.children[1]);
        }
    }
    moveHeaderButton();
    window.addEventListener("resize", moveHeaderButton);

    for (let i = 0; i < headerLinks.length; i++) {
        headerLinks[i].addEventListener("click", function () {
            headerMenu.classList.remove("active");
            body.classList.remove("header-lock");
            headerList.classList.remove("active");
        });
    }

    headerClose.addEventListener("click", function  () {
        headerMenu.classList.remove("active");
        body.classList.remove("header-lock");
        headerList.classList.remove("active");
    });

    headerMenu.addEventListener("click", function () {
        headerMenu.classList.add("active");
        body.classList.add("header-lock");
        headerList.classList.add("active");
    });

    if (document.querySelector(".hero")) {
        const heroItem = document.querySelector(".hero-items__item");
        const heroItems = document.querySelector(".hero__items");
        const hero = document.querySelector(".hero");

        function moveHeroItems() {
            const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
            if (viewport_width <= 767) {
                hero.insertBefore(heroItem, hero.children[2]);
            } else {
                heroItems.insertBefore(heroItem, heroItems.children[1]);
            }
        }
        moveHeroItems();
        window.addEventListener("resize", moveHeroItems);

        const input = document.querySelectorAll("#number");
        if (input) {
            for (let i = 0; i < input.length; i++) {
                const iti = window.intlTelInput(input[i], {
                    initialCountry: "es",
                    separateDialCode: true,
                    utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@25.3.1/build/js/utils.js"
                });
            }
        }
    }

    if (document.querySelector(".gallery")) {
        const galleryImages = document.querySelectorAll(".gallery__item img");
        const galleryPopup = document.querySelector(".gallery-popup");
        const imagePopup = document.querySelector(".gallery-popup__img");
        const closeImagePopup = document.querySelector(".gallery-popup__img span#close");
        const prevImagePopup = document.querySelector(".gallery-popup__img span#prev");
        const nextImagePopup = document.querySelector(".gallery-popup__img span#next");

        let currentIndex = 0;

        galleryImages.forEach((img, index) => {
            img.addEventListener("click", function () {
                currentIndex = index;
                body.classList.add("lock");
                galleryPopup.classList.add("open");

                imagePopup.querySelector("img")?.remove();

                const popupImg = document.createElement("img");
                popupImg.src = img.src;
                popupImg.alt = img.alt || "";

                imagePopup.appendChild(popupImg);
            });
        });

        galleryPopup.addEventListener("click", function (event) {
            if (!event.target.closest(".gallery-popup__img")) {
                body.classList.remove("lock");
                galleryPopup.classList.remove("open");
                imagePopup.querySelector("img")?.remove();
            }
        });

        closeImagePopup.addEventListener("click", function () {
            body.classList.remove("lock");
            galleryPopup.classList.remove("open");
            imagePopup.querySelector("img")?.remove();
        });

        prevImagePopup.addEventListener("click", function () {
            currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
            changeImage();
        });

        nextImagePopup.addEventListener("click", function () {
            currentIndex = (currentIndex + 1) % galleryImages.length;
            changeImage();
        });

        function changeImage() {
            const oldImg = imagePopup.querySelector("img");
            if (oldImg) oldImg.remove();

            const newImg = document.createElement("img");
            newImg.src = galleryImages[currentIndex].src;
            newImg.alt = galleryImages[currentIndex].alt || "";
            imagePopup.appendChild(newImg);
        }

        document.addEventListener("keydown", function (event) {
            if (event.which == 27) {
                body.classList.remove("lock");
                galleryPopup.classList.remove("open");
                imagePopup.querySelector("img")?.remove();
            }
        });
    }

    if (document.querySelector(".video-popup")) {
        const videoPopup = document.querySelector(".video-popup");
        const videoClose = document.querySelector(".video-popup__close button");
        const videoOpen = document.querySelector(".hero-video__button button");

        videoOpen.addEventListener("click", function () {
            body.classList.add("lock");
            videoPopup.classList.add("open");
        });

        videoClose.addEventListener("click", function () {
            body.classList.remove("lock");
            videoPopup.classList.remove("open");
            video.pause();
        });

        videoPopup.addEventListener("click", function (event) {
            if (!event.target.closest(".video-popup__video")) {
                body.classList.remove("lock");
                videoPopup.classList.remove("open");
                video.pause();
            }
        });

        document.addEventListener("keydown", function (event) {
            if (event.which == 27) {
                body.classList.remove("lock");
                videoPopup.classList.remove("open");
                video.pause();
                body.classList.remove("header-lock");
                headerList.classList.remove("active");
                popupForm.classList.remove("open");
            }
        });
    }

    if (document.querySelector(".swiper")) {
        const swiperGallery = new Swiper('.gallery__body.swiper', {
            slidesPerView: 1,
            spaceBetween: 22,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1401: {
                    slidesPerView: 3,
                },
            },
        });

        const swiperReviews = new Swiper('.reviews__body.swiper', {
            slidesPerView: 1,
            spaceBetween: 21,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1401: {
                    slidesPerView: 4,
                },
            },
        });

        const swiperResidential = new Swiper('.residential__body.swiper', {
            slidesPerView: 1,
            spaceBetween: 33,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1401: {
                    slidesPerView: 3,
                },
            },
        });
    }

    const whatsappButton = document.querySelector(".footer__button.whatsapp");
    const footerBlockInfo = document.querySelector(".footer__item.info");
    const footerBlockImage = document.querySelector(".footer__item.list");
    const footerSpan = document.querySelector(".footer__span.info");

    function moveFooterButton() {
        const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        if (viewport_width <= 970) {
            footerBlockImage.insertBefore(whatsappButton, footerBlockImage.children[0]);
            footerBlockImage.insertBefore(footerSpan, footerBlockImage.children[2]);
        } else {
            footerBlockInfo.insertBefore(whatsappButton, footerBlockInfo.children[3]);
            footerBlockInfo.insertBefore(footerSpan, footerBlockInfo.children[4]);
        }
    }
    moveFooterButton();
    window.addEventListener("resize", moveFooterButton);

    const openFormButtons = document.querySelectorAll("#openForm");
    const popupForm = document.querySelector(".form-popup");
    const popupFormClose = document.querySelector(".form-popup__close>button");

    for (let i = 0; i < openFormButtons.length; i++) {
        openFormButtons[i].addEventListener("click", function () {
            body.classList.add("lock");
            popupForm.classList.add("open");
        });
    }

    popupFormClose.addEventListener("click", function () {
        body.classList.remove("lock");
        popupForm.classList.remove("open");
    });

    popupForm.addEventListener("click", function (event) {
        if (!event.target.closest(".form-popup__form")) {
            body.classList.remove("lock");
            popupForm.classList.remove("open");
        }
    });

    if (document.querySelector(".accordions")) {
        const accordionItems = document.querySelectorAll(".accordions__item");

        accordionItems.forEach(item => {
            const title = item.querySelector(".accordions-item__title");
            const content = item.querySelector(".accordions-item__text");

            const style = window.getComputedStyle(content);
            const paddingTop = parseFloat(style.paddingTop);
            const paddingBottom = parseFloat(style.paddingBottom);
            const marginTop = parseFloat(style.marginTop);
            const marginBottom = parseFloat(style.marginBottom);

            content.dataset.fullHeight = content.scrollHeight + "px";

            content.style.height = "0px";
            content.style.paddingTop = "0px";
            content.style.paddingBottom = "0px";
            content.style.marginTop = "0px";
            content.style.marginBottom = "0px";
            content.style.overflow = "hidden";

            title.addEventListener("click", () => {
                const isOpen = item.classList.contains("active");

                if (isOpen) {
                    collapse(content, paddingTop, paddingBottom, marginTop, marginBottom);
                    item.classList.remove("active");
                } else {
                    expand(content, paddingTop, paddingBottom, marginTop, marginBottom);
                    item.classList.add("active");
                }
            });
        });

        function expand(element, padTop, padBottom, marTop, marBottom) {
            const targetHeight = element.dataset.fullHeight ? 
                parseFloat(element.dataset.fullHeight) : 
                element.scrollHeight;
            
            let duration = 300;
            let startTime = null;

            function animate(time) {
                if (!startTime) startTime = time;
                let progress = (time - startTime) / duration;
                if (progress > 1) progress = 1;

                const easeProgress = easeOutQuart(progress);
                
                const currentHeight = targetHeight * easeProgress;
                const currentPaddingTop = padTop * easeProgress;
                const currentPaddingBottom = padBottom * easeProgress;
                const currentMarginTop = marTop * easeProgress;
                const currentMarginBottom = marBottom * easeProgress;
                
                element.style.height = currentHeight + "px";
                element.style.paddingTop = currentPaddingTop + "px";
                element.style.paddingBottom = currentPaddingBottom + "px";
                element.style.marginTop = currentMarginTop + "px";
                element.style.marginBottom = currentMarginBottom + "px";

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    element.style.height = "auto";
                }
            }

            requestAnimationFrame(animate);
        }

        function collapse(element, padTop, padBottom, marTop, marBottom) {
            element.dataset.fullHeight = element.scrollHeight + "px";
            
            const startHeight = element.scrollHeight;
            let duration = 300;
            let startTime = null;

            function animate(time) {
                if (!startTime) startTime = time;
                let progress = (time - startTime) / duration;
                if (progress > 1) progress = 1;

                const easeProgress = easeInQuart(progress);
                
                const currentHeight = startHeight * (1 - easeProgress);
                const currentPaddingTop = padTop * (1 - easeProgress);
                const currentPaddingBottom = padBottom * (1 - easeProgress);
                const currentMarginTop = marTop * (1 - easeProgress);
                const currentMarginBottom = marBottom * (1 - easeProgress);
                
                element.style.height = currentHeight + "px";
                element.style.paddingTop = currentPaddingTop + "px";
                element.style.paddingBottom = currentPaddingBottom + "px";
                element.style.marginTop = currentMarginTop + "px";
                element.style.marginBottom = currentMarginBottom + "px";

                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            }

            requestAnimationFrame(animate);
        }

        function easeOutQuart(x) {
            return 1 - Math.pow(1 - x, 4);
        }

        function easeInQuart(x) {
            return x * x * x * x;
        }
    }
});