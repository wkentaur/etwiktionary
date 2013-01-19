var HomeView = function(store, sWord) {
	var lang = 'en';
 
    this.initialize = function() {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        this.el = $('<div/>');
        this.el.on('keyup', '.search-key', this.findByName);
		lang = this.navigatorLang();
		if (lang != "et") 
			lang = "en";    //default lang     
		document.addEventListener("deviceready", this.checkConnection, false);			   
		if (sWord)
			$(document).ready(this.findByName());
	};

    this.checkConnection = function() {
        var networkState = navigator.network.connection.type;

		if (networkState == Connection.NONE){
			var localizedStrings={
				connError:{
				'en':'Try again later, when you are connected to internet.',
				'et':'Proovi hiljem uuesti, kui oled internetti ühendatud.'
				}
			}			
			navigator.notification.alert(localizedStrings["connError"][lang]);
		};
    };

	this.navigatorLang = function() {
		var lang = navigator.language;
		if (lang == 'en') {
			/**
			 * @fixme navigator.language is always 'en' on Android? https://code.google.com/p/android/issues/detail?id=4641
			 * Workaround grabbing from userAgent: http://comments.gmane.org/gmane.comp.handhelds.phonegap/7908
			 */
			var matches = navigator.userAgent.match(/; Android [^;]+; ([A-Za-z0-9]+(?:-[A-Za-z0-9]+)*);/);
			if (matches) {
				lang = matches[1];
			}
		}
		lang = lang.replace(/-.*?$/, ''); // strip country code
		return lang;
	};

	this.render = function() {
		var localizedStrings={
			title:{
				'en':'English-Estonian dictionary',
				'et':'inglise-eesti sõnastik'
			},
			intro:{
				'en':'<p>English-Estonian dictionary based on <a href="http://et.wiktionary.org">Wiktionary</a> data. Also the data from <a href="http://eki.ee">EKI</a> dictionary is used.</p>',
				'et':'<a href="http://et.wiktionary.org">Vikisõnastikul</a> põhinev inglise-eesti sõnastik. Kasutatud on ka <a href="http://eki.ee">EKI</a> inglise-eesti sõnastikku. <p><a href="http://et.wiktionary.org">Vikisõnastikku saad ise täiendada.</a></p>'
			},
			content:{
				'en':'Content:',
				'et':'Sisu:'
			}
		}		
		var output = new Array();
		output["word"] = sWord;
		output["title"] = localizedStrings["title"][lang];
		output["intro"] = localizedStrings["intro"][lang];
		output["copyright"] = localizedStrings["content"][lang];
		this.el.html(HomeView.template(output));
		return this;
	};

	this.findByName = function() {
		$('#desc').hide();
		store.findByName($('.search-key').val(), function(words) {
			$('.word-list').html(HomeView.liTemplate(words));
		});
	};
 
    this.initialize();
 
}
 
HomeView.template = Handlebars.compile($("#home-tpl").html());
HomeView.liTemplate = Handlebars.compile($("#word-li-tpl").html());
