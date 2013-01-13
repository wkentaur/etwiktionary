var WordView = function(store, word) {
 
    this.initialize = function() {
        this.el = $('<div/>');
        this.el.on('keyup', '.search-key', this.findByName);
        $('base').attr('href', 'http://et.m.wiktionary.org/');
    };
    
this.render = function() {
    this.el.html(WordView.template(word));
    return this;
}; 


this.findByName = function() {
	$('base').attr('href', '');
	if (typeof store == 'undefined')
		store = new RemoteApis();
	$('#desc').hide();
    store.findByName($('.search-key').val(), function(words) {
        $('.word-list').html(WordView.liTemplate(words));
    });
};

    this.initialize();
 
 }
 
WordView.template = Handlebars.compile($("#word-tpl").html());
WordView.liTemplate = Handlebars.compile($("#word-li-tpl").html());
