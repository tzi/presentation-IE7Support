/**
* LiveCoding 0.1 for Reveal.js
* Vincent De Oliveira
*/
var LiveCoding = (function() {
	
	// All <code> with ".liveCoding" class
	var allCode = document.querySelectorAll('code.liveCoding');

	for(var i = 0; i < allCode.length; i++){

		// Cleanup
		var val = allCode[i].innerHTML;
		val = val.replace(/</g, '&lt;');
		val = val.replace(/^\s+/g,'').replace(/\s+$/g,'');
		allCode[i].innerHTML = val;

		// Initialize
		update(allCode[i]);

		// Update demonstration when keyup
		allCode[i].addEventListener('keyup', function(e){
			update(this);
		});

	}

	/**
	 * Update
	 */
	function update(code){
		var id = code.attributes.getNamedItem('data-livecoding-id').nodeValue;
		var val = code.textContent;
		var demo = document.getElementById(id);

		// highlight.js and prism.js
		var isCSS = (code.classList.contains('css') || code.classList.contains('language-css'));
		var isMarkup = (code.classList.contains('xml') || code.classList.contains('language-markup') || code.classList.contains('language-xml') || code.classList.contains('language-html') || code.classList.contains('language-svg'));
	
		// if it's CSS
		if(isCSS){

			// if PrefixFree is here
			if(typeof PrefixFree !== "undefined"){
				// prefix code
				val = PrefixFree.prefixCSS(val);	
			}
			
			// cleanup
			val = val.replace(/^\s+/g,'').replace(/\s+$/g,'');
			val = val.split(/(\{|\})/g);
			for(var i = 0; i < val.length - 1; i+=4){
				val[i] = '#' + id + ' ' + val[i];
			}
			val = val.join('');


			// if <style id="liveCoding_9999"> exists, replace content
			if( document.getElementById('liveCoding_' + id) != null ){
				document.getElementById('liveCoding_' + id).innerHTML = val;
			} else {
			// else, create it	
				var style = document.createElement('style');
				style.setAttribute('id','liveCoding_' + id);
				style.innerHTML = val;
				document.body.appendChild(style);
			}

		// else, if it's markup (HTML, SVG, XML...)
		}else if(isMarkup){

			// replace content 
			demo.innerHTML = "<div style='position:relative'>"+val+"</div>";
		}

		var innerCSS = demo.querySelectorAll('[data-at]');
		for (var i=0; i<innerCSS.length; i++) {
			var attributes = innerCSS[i].getAttribute('data-at').split(',');
			var values = [];
			var innerHTML = [];
			for (var j=0; j<attributes.length; j++) {
				values[attributes[j]] = getComputedStyle(innerCSS[i]).getPropertyValue(attributes[j]);
				innerHTML.push(attributes[j] + ": " + values[attributes[j]]);
			}
			innerHTML = "I'm " + innerHTML.join(' & ');
			var textNode;
			if (textNode = getChildTextNode(innerCSS[i])) {
				textNode.nodeValue = innerHTML;
			}
		}

		function getChildTextNode(element) {
			for (var i=0; i<element.childNodes.length; j++) {
			    if (element.childNodes[i].nodeType = 3) {
			        return element.childNodes[i];
			    }
			}
		}
	}

})();
