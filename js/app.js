var app = {

registerEvents: function() {
    var self = this;
    // Check of browser supports touch events...
    if (document.documentElement.hasOwnProperty('ontouchstart')) {
        // ... if yes: register touch event listener to change the "selected" state of the item
        $('body').on('touchstart', 'a', function(event) {
            $(event.target).addClass('tappable-active');
        });
        $('body').on('touchend', 'a', function(event) {
            $(event.target).removeClass('tappable-active');
        });
    } else {
        // ... if not: register mouse events instead
        $('body').on('mousedown', 'a', function(event) {
            $(event.target).addClass('tappable-active');
        });
        $('body').on('mouseup', 'a', function(event) {
            $(event.target).removeClass('tappable-active');
        });
    }
    
	$(window).on('hashchange', $.proxy(this.route, this));
	
},

route: function() {
    var hash = window.location.hash;
    if (!hash) {
        $('body').html(new HomeView(this.store, '').render().el);
        return;
    }
    var match = hash.match(app.detailsURL);
    if (match && match[1] == 'word') {
        this.store.getDesc(match[2], function(word) {
            $('body').html(new WordView(this.store, word).render().el);
        });
    } else if (match && match[1] == 'search') {
			$('body').html(new HomeView(this.store, match[2]).render().el);
	}	
},

initialize: function() {
    var self = this;
    this.detailsURL = /^#(\w+?)\/(.+)/;
    this.registerEvents();
	$(document).bind("deviceReady", function() {
		document.addEventListener("backbutton", function(e){
			var hash = window.location.hash;
			if(!hash){                          // on homepage
				e.preventDefault();
				navigator.app.exitApp();
			}
			else {
				navigator.app.backHistory()
			}
		}, false);				
	});
    this.store = new RemoteApis(function() {
        self.route();
    });

}


};

app.initialize();
