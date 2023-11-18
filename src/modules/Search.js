import $ from 'jquery'; 

class Search {
    // 1. describe and create/initate objects
    constructor(){
        // this refers to the search object that was instantiated
        this.resultsDiv = $("#search-overlay__results");
        this.searchButton = $(".js-search-trigger");
        this.closeButton = $(".search-overlay__close");
        this.searchOverlayDiv = $(".search-overlay");
        this.searchField = $("#search-term");
        this.events();
        this.isOverlayOpen = false;
        this.isSpinnerVisible = false;
        this.previousValue;
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
        this.searchField.on("keyup", this.typingLogic.bind(this));
    }
    // 3. methods (function, action)

    typingLogic() {

       if (this.searchField.val() != this.previousValue) {
        clearTimeout(this.typingTimer);

        if (this.searchField.val()) {
          if (!this.isSpinnerVisible) {
            this.resultsDiv.html('<div class="spinner-loader"></div>');
            this.isSpinnerVisible = true;
         }
           this.typingTimer = setTimeout(this.getResults.bind(this), 2000);
        } else {
          this.resultsDiv.html('');
          this.isSpinnerVisible = false;
        }

        }

       this.previousValue = this.searchField.val();
    }

    getResults(){
        this.resultsDiv.html("Imagine real search results here...");
        this.isSpinnerVisible = false;
    }

    keyPressDispatcher(e){
       // e is a parameter holding information that was passed, about the key press event

      // If any field is currently focused, the overlay will not show   
       if (e.keyCode == 83 && !this.isOverlayOpen && !$("input, textarea").is(':focus')){
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