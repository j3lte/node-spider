var cheerio = require('cheerio'),
	url = require('url');

function Document(url, res) {
	this.url = url;
	this.res = res;
}

Document.prototype = {
	constructor: Document,
	
	// Lazy parse
	get $() {
		if (this.res.body.toString().indexOf('<html>') === -1) {
			return cheerio.load('<html></html>');
		}
		return this._$ || (this._$ = cheerio.load(this.res.body));
	},
	
	resolve: function(uri) {
		return url.resolve(this.url, uri);
	}
};

module.exports = Document;
