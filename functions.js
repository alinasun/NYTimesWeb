function myCallback(json){

	console.log(json.response.docs[0].web_url);
}
/*

function search(){
	var searchTerm = "travel";

	var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
	url += '?' + $.param({
		'api-key': "911f2d3a5aa54d86a4e3a6eff4765176",
		'fq': "travel"
	});

	$.ajax({

		url: url, 
		type: 'GET',
		data: {
			term: searchTerm,
		},
		dataType: 'jsonp',
		jsonpCallback: 'myCallback',
		error: function(xhr, status, error){
			console.log("Error");
		},

	});

	/*
	$.ajax({
		url: url,
		method: 'GET',
	}).done(function(result) {
		console.log(result);
	}).fail(function(err) {
		throw err;
	});

}
*/

function search(){
	var searchTerm = "travel";

	var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
	url += '?' + 'api-key=911f2d3a5aa54d86a4e3a6eff4765176' + '&' +    'fq=' +searchTerm;
	});
	$.ajax({
		url: url,
		method: 'GET',
	}).done(function(result) {
		console.log(result);
	}).fail(function(err) {
		throw err;
	});


}





