import $ from 'jquery'; 

class Search {
    // 1. describe and create/initate objects
    constructor(){
        // this refers to the search object that was instantiated
        this.searchButton = $(".js-search-trigger");
        this.closeButton = $(".search-overlay__close");
        this.searchOverlayDiv = $(".search-overlay");
        this.searchField = $("#search-term");
        this.events();
        this.isOverlayOpen = false;
        this.typingTimer;

    }

    // 2. events 
    events(){
        /*
         on changes the value of the this to point towards the html element that got clicked,
         so I need to bind the context of this to point towards the search instance 
        */
        this.searchButton.on("click", this.openOverlay.bind(this));
        this.closeButton.on("click", this.closeOverlay.bind(this));
        $(document).on("keydown", this.keyPressDispatcher.bind(this));
        this.searchField.on("keydown", this.typingLogic.bind(this));
    }
    // 3. methods (function, action)

    typingLogic() {
       clearTimeout(this.typingTimer);
       this.typingTimer = setTimeout(function () {console.log("TEST TIMEOUT")}, 2000);
    }

    keyPressDispatcher(e){
       // e is a parameter holding information that was passed, about the key press event

       if (e.keyCode == 83 && !this.isOverlayOpen){
        this.openOverlay();

       }

       if (e.keyCode == 27 && this.isOverlayOpen){
        this.closeOverlay();

       }
    }

    openOverlay(){
        this.searchOverlayDiv.addClass("search-overlay--active");
        $("body").addClass("body-no-scroll");
        this.isOverlayOpen = true;
    }

    closeOverlay(){
        this.searchOverlayDiv.removeClass("search-overlay--active");
        $("body").removeClass("body-no-scroll");
        this.isOverlayOpen = false;
    }

}

export default Search