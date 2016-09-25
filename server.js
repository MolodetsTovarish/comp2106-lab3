// reference connect and url packages
var connect = require('connect');
var url = require('url');

// instantiate a new connect object
var app = connect();

// returns error message if an unrelated command is typed
var error = function(req, res, next) {
	res.end('Error. Request not recognized');
};

// setting up calculate function
var calculate = function(req, res, next) {
	//making querystring
	var qs = url.parse(req.url, true).query;
	//get the method, x, and y from the querystring
	var method = qs.method;
	var x = qs.x;
	var y = qs.y;
	// initializing result variable to store x (operation) y
	var result = null;
	// initializing method symbol variable to use in return statement
	var methodSymbol = null;
	
	// change result based on method
	if (method == 'add') {
		result = parseInt(x) + parseInt(y);
		methodSymbol = '+';
	}
	else if (method == 'subtract') {
		result = parseInt(x) - parseInt(y);
		methodSymbol = '-';
	}
	else if (method == 'multiply') {
		result = parseInt(x) * parseInt(y);
		methodSymbol = '*';
	}
	else if (method == 'divide') {
		result = parseInt(x) / parseInt(y);
		methodSymbol = '/';
	}
	
	// display the result
	res.end(x + ' ' + methodSymbol + ' ' + y + ' = ' + result);
};

// execute the appropriate function based on the http request
app.use('/lab3', calculate);
app.use(error);

// start the server on port 3000
app.listen(3000);

// display a message to show that the server is running
console.log('Connect running on port 3000');