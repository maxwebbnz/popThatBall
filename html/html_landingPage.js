/*
 * Copyright (c) 2021 Max Webb
 * All rights reserved.
 */
/**========================================================================
 *                           Landing Page Module
 *========================================================================**/
let landingPageState = true
let landingPage = {
    /**========================================================================
     **                           Show
     *?  Displays landing page
     *@param name type  
     *@param name type  
     *@return type
     *========================================================================**/
    show: function() {
        $('#landingPage').show();
        if ($("#landingPage").is(":visible")) {
            frameRate(100)
            core.generateBalls(5)
        }
    },
    /**========================================================================
     **                           Hide
     *?  Hides Landing Page and destroys balls
     *@param name type  
     *@param name type  
     *@return type
     *========================================================================**/
    hide: function() {
        $('#sidenav').fadeIn();
        resizeCanvas(windowWidth - 400, windowHeight);
        $('#landingPage').fadeOut();
        Balls.length = 0;
        landingPageState = false;
    }
}