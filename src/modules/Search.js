import $ from 'jquery'; 

class Search {
    // 1. describe and create/initate objects
    constructor(){
        // this refers to the search object that was instantiated
        this.searchButton = $(".js-search-trigger");
        this.closeButton = $(".search-overlay__close");
        this.searchOverlayDiv = $(".search-overlay");
        this.events();
    }

    // 2. events 
    events(){
        /*
         on changes the value of the this to point towards the html element that got clicked,
         so I need to bind the context of this to point towards the search instance 
        */
        this.searchButton.on("click", this.openOverlay.bind(this));
        this.closeButton.on("click", this.closeOverlay.bind(this));
    }

    // 3. methods (function, action)
    openOverlay(){
        this.searchOverlayDiv.addClass("search-overlay--active");
    }

    closeOverlay(){
        this.searchOverlayDiv.removeClass("search-overlay--active");
    }

}

export default Search