/*globals jQuery, document */
(function ($) {
    "use strict";

    $(document).ready(function () {

        // Init the posts
        postInit();

    });

    function postInit() {
        // Set lead paragraphs
       // $('.post-body p:first-child').addClass('lead');

        // Set feature image
        var featured = $('.featured-image').find('img').attr('src');
        if (featured) {
            $('.blog-header').css('backgroundImage', 'url(' + featured + ')');
            $('#footer').css('backgroundImage', 'url(' + featured + ')');
        }
    }

}(jQuery));
