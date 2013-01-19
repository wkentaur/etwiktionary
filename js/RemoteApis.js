
var RemoteApis = function(successCallback, errorCallback) {

    this.findByName = function(searchKey, callback) {
		if (searchKey.length > 0) {

				$.ajax({
					url: "http://toolserver.org/~kentaur/etwikt/api/api.php",
					type: "GET",
					dataType: "jsonp",
					data: {
						'action': "opensearch",
						'lang': "en",
						'format': "json",
						'source': "mobile",
						'search': searchKey
					},
					success: function(data) {
						callback(data[1]);
					},
					error: function(){
						navigator.notification.alert(
						'Connection error.',
						null,
						'Error',
						'Done'
						);
					}					
				});
		}
    }

    this.getDesc = function(request, callback) {
		word = new Array();
		
		$.ajax({
			url: "http://et.wiktionary.org/w/api.php",
			dataType: "jsonp",
			data: {
				'action': "mobileview",
				'sections': "all",
				'format': "json",
				'page': request
			},
			success: function(data) {
				var output = "";
				var isEnglish = false;
				
				for (var i=0; i<data["mobileview"]["sections"].length; i++) {
					if (isEnglish) {
						if (data["mobileview"]["sections"][i]["toclevel"] == 1)
							break;
						else 
						    output = output + data["mobileview"]["sections"][i]["text"];
					}
					if (data["mobileview"]["sections"][i]["toclevel"] == 1 &&
					    data["mobileview"]["sections"][i]["line"].toLowerCase() == 'inglise') {
							isEnglish = true;
					}
				}
				
				word["title"] = request;
				word["desc"] = output;
				callback(word);
			},
			error: function(){
				navigator.notification.alert(
					'Connection error.',
					null,
					'Error',
					'Done'
				);
			}	
		}); 
				
    }

    // Used to simulate async calls. This is done to provide a consistent interface with stores (like WebSqlStore)
    // that use async data access APIs
    var callLater = function(callback, data) {
        if (callback) {
            setTimeout(function() {
                callback(data);
            });
        }
    }


    callLater(successCallback);

}
