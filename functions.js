var headlines = [];
var abstracts = [];

var currentTabOption;

function clear(){
	headlines = [];
	abstracts = [];
}

function myCallbackTopStories(json){
	clear();
	console.log('sup');
        var output = '';
        var first = 0;

        for(var i = 0; i < json.results.length; i++){

            output += '<tr>';
            output += '<td id="top-title-' + i + '">' +'<a href="' + json.results[i].short_url + '">' + json.results[i].title + '</a><br><img class="img" src="' + json.results[i].multimedia[2].url + '"></td>';
            output += '<td id="top-abstract-' + i + '"">' + json.results[i].abstract + '</td>';
            output += '</tr>';
            output += '<br>';

            headlines.push(json.results[i].title);
            abstracts.push(json.results[i].abstract);
        }

        document.querySelector('#results-top-stories #results-table tbody').innerHTML = output;
    }

    function myCallbackMostPopular(json){
    	clear()
    	console.log('sup');

        var output = '';
        var first = 0;

        for(var i = 0; i < json.results.length; i++){
            output += '<tr>';
            output += '<td id="most-title-' + i + '">' + '<a href="' + json.results[i].short_url + '">' + json.results[i].title + '</a></td>';
            output += '<td id="most-abstract-' + i + '">' + json.results[i].abstract + '</td>';
            output += '</tr>';
            output += '<br>';
            headlines.push(json.results[i].title);
            abstracts.push(json.results[i].abstract);
        }

        document.querySelector('#results-most-popular #results-table tbody').innerHTML = output;
    }


    
    function myCallbackArchiveSearch(json){
    	clear();
    	console.log('sup');
    	console.log(json);

        var output = '';
        var first = 0;

        for(var i = 0; i < json.response.docs.length; i++){

        	output += '<tr>';
        	output += '<td id="archive-title-' + i + '">'+'<a href="' + json.response.docs[i].web_url + '">' + json.response.docs[i].headline.main + '</a></td>';
        	output += '<td id="archive-abstract-' + i + '">' + json.response.docs[i].lead_paragraph + '</td>';
        	output += '</tr>';
        	output += '<br>';
        	headlines.push(json.response.docs[i].headline.main);
        	abstracts.push(json.response.docs[i].lead_paragraph);
        }

        document.querySelector('#results-archive-search #results-table tbody').innerHTML = output;
    }    


    function loadTopStories(){
    	var url = "https://api.nytimes.com/svc/topstories/v2/home.json";
    	url += "?" + "api-key=911f2d3a5aa54d86a4e3a6eff4765176";

    	$.ajax({
    		url: url,
    		method: 'GET',
    	}).done(function(result) {
    		console.log('suck it');

    		console.log(result);
    		myCallbackTopStories(result); 
    	}).fail(function(err) {
    		throw err;
    	});
    }

    function loadMostPopular(){
    	var url = "https://api.nytimes.com/svc/mostpopular/v2/mostemailed/all-sections/7.json";
    	url += '?' + 'api-key=911f2d3a5aa54d86a4e3a6eff4765176';

    	$.ajax({
    		url: url,
    		method: 'GET',
    	}).done(function(result) {
    		console.log(result);
    		myCallbackMostPopular(result);
    	}).fail(function(err) {
    		throw err;
    	});
    }

    function loadArchiveSearch(){
    	var searchTerm = document.querySelector('#search-term').value;
    	searchTerm = searchTerm.trim();

    	if(searchTerm == ''){
    		searchTerm = "politics";
    		console.log('term is in quotes');
    	}   

    	searchTerm.toString();

    	var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    	url += "?" + 
    	"api-key=911f2d3a5aa54d86a4e3a6eff4765176"+ "&fq=";
    	url += searchTerm;

    	$.ajax({
    		url: url,
    		method: 'GET',
    	}).done(function(result) {
    		console.log(result);
    		myCallbackArchiveSearch(result);
    	}).fail(function(err) {
    		throw err;
    	});
    }

    /*
     * https://www.w3schools.com/howto/howto_js_tabs.asp
     * 
     * used this as a template to get the tabs
     *
     */

    function openTab(evt, searchMethod) {
        // Declare all variables
        var i, tabcontent, tablinks;

        // Get all elements with class="tabcontent" and hide them
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
        	tabcontent[i].style.display = "none";
        }

        // Get all elements with class="tablinks" and remove the class "active"
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
        	tablinks[i].className = tablinks[i].className.replace(" active", "");
        }

        // Show the current tab, and add an "active" class to the button that opened the tab
        document.getElementById(searchMethod).style.display = "block";
        if(searchMethod == "top-stories") {
        	loadTopStories();
        	currentTabOption = "top";
        }
        else if(searchMethod == "most-popular") {
        	loadMostPopular();
        	currentTabOption = "most";
        }
        else if(searchMethod == "archive-search") {
        	loadArchiveSearch();
        	currentTabOption = "archive";
        }
        else {
        	loadTopStories();
        	currentTabOption = "top-stories";
        }

        evt.currentTarget.className += " active";
    }

    /*
     * http://stackoverflow.com/questions/5379120/get-the-highlighted-selected-text
     *
     * Used the above source to get the function getSelectionText() then modified it slightly 
     * to get what we needed 
     */
    function getSelectionText() {
    	var text = "";
    	var activeEl = document.activeElement;
    	var activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
    	if (
    		(activeElTagName == "textarea") || (activeElTagName == "input" &&
    			/^(?:text|search|password|tel|url)$/i.test(activeEl.type)) &&
    		(typeof activeEl.selectionStart == "number")
    		) {
    		text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);
    } else if (window.getSelection) {
    	text = window.getSelection().toString();
    }

    console.log('getSelectionText: ');
    console.log(text);
        return text;
    }

    function addMarginNote(){
    	var marginNote = document.querySelector('#margin-note-input').value;
    	console.log('note: '+ marginNote);
    	var selectedPhrase = getSelectionText();
    	var newString = 
    	"<span desc='" + marginNote + "' style='border-bottom: 1px dashed rgb(51, 122, 183); cursor: help;'>" + 
    	selectedPhrase +
    	"</span>";


		var id = findId(selectedPhrase);

		console.log('id: ' + id);

		var idName = "#" + id;

		var content = document.querySelector(idName).innerHTML;
		document.querySelector(idName).innerHTML = content.replace(selectedPhrase, newString);

		$("a,span").marginotes();

	}

function findId(selectedPhrase){
	for(var i = 0; i < headlines.length; i++){
		if(headlines[i].includes(selectedPhrase)){
			var id = currentTabOption + '-title-' + i;
			id.toString();
			return id;
		}
	}
	for(var i = 0; i < abstracts.length; i++){
		if(abstracts[i].includes(selectedPhrase)){
			var id = currentTabOption + '-abstract-' + i;
			id.toString();
			return id;
		}
	}
}

$("a,span").marginotes({
      width: 100,
      field: 'desc'
  });