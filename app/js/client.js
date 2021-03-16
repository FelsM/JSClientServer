// HTTP
// hyper text transfet protocol


//XML

//JSON





document.addEventListener('DOMContentLoaded', function(){

	//CRUD - CREATE, READ, UPDATE, DELETE


	// HTTP VERBS/METHOD/ REQUEST TYPES

	
	
	function request1(){
		// XMLHttpRequest
	let xhr = new XMLHttpRequest();



	//GET - READ
	//open('GET', url, async);
	// console.log(xhr.readyState);
	xhr.open('GET', '/data/users.json', true);

	xhr.send();

	//xhr.readyState
	/*
	 0 - UNSENT;
	 1 - OPENED;
	 2 - HEADERS_RECEIVED
	 3 - LOADING
	 4 - DONE
	*/
	// console.log(xhr.readyState);

	//xhr.status
	/*
		1. 100-199 - Information responses
		2. 200-299 - Successful responses
		3. 300-399 - Redirection responses
		4. 400-499 - Client error respones
		5. 500-599 - Server error responses
		
	*/



	/*
	200 - request complete - response received
	201 - After 200 . If create/update
	
	401 - Unauthorized
	403 - Forbidden
	404 - Not Found



	500 - Internal Server Error
	502 - Bad Gateway
	503 - Service Unavailable

	*/

	//POST - CREATE

	/*
		HEADERS
		a=2&b=4
		'Content-type': 'text/plain',
		'Content-type': 'text/html',
		'Content-type': 'application/json',
		'Content-type': 'multipart/form-data'
		'Content-type': 'blob'


		

	*/

	xhr.onreadystatechange = function(event){

		switch(xhr.readyState){
			case 0:
			break;
			case 1:
			break;
			case 2:
			console.log('request started');
			break;
			case 3:
			console.log('loading...');
			break;
			case 4:
			console.log('done');
			break;

		}

		if(xhr.status === 200 && xhr.readyState === 4){
			console.log(xhr.response)

			const jsObj = JSON.parse(xhr.response);

			console.log(jsObj);

			jsObj.users[0].age = 18;

			const jsonObj = JSON.stringify(jsObj)

			console.log(jsonObj)
		}

	}

	}

	function requesToSWAPI(){
	let xhr = new XMLHttpRequest();



	
	xhr.open('GET', 'https://swapi.dev/api/people/1');

	xhr.send();		
	
	xhr.onreadystatechange = function(event){


		if(xhr.status === 200 && xhr.readyState === 4){
			console.log(JSON.parse(xhr.response));

		}

	}
}
	
	requesToSWAPI();




})