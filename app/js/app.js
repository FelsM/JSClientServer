window.addEventListener('load', function(){
	const baseUrl = 'http://localhost:2403';
	const voabulary = document.getElementById('vocabulary');
	const wordsListTemplate = vocabulary.tBodies[0];
	const addWord = document.getElementById('addWord')

	function renderWords(wordList){
		wordsListTemplate.innerHTML = '';
		wordList.forEach((wordObj)=>{
			const tr = document.createElement('tr');
			const wordTd = document.createElement('td');
			const transTd = document.createElement('td');
			wordTd.innerHTML = wordObj.word;
			tr.append(wordTd)
			transTd.innerHTML = wordObj.translation;
			tr.append(...[wordTd, transTd]);
			wordsListTemplate.append(tr);
		})
	}

	function collectData(){
		const word = document.getElementById('word').value;
		const translation = document.getElementById('translation').value;
		const dataObj = {word, translation};
		document.getElementById('word').value = ''
		document.getElementById('translation').value = ''
		return dataObj;
	}

	function getWordsList(){
		const xhr = new XMLHttpRequest();
		xhr.open('GET', `${baseUrl}/words`);
		xhr.send();
		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4 && xhr.status === 200){
				const wordList = JSON.parse(xhr.response);
				renderWords(wordList)
			}
		}
	}

	getWordsList();

	function createWord(){
		const xhr = new XMLHttpRequest();
		xhr.open('POST', `${baseUrl}/words`);
		const dataToSend = collectData();
		const jsonData = JSON.stringify(dataToSend);
		xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4 && xhr.status === 200){
				getWordsList();
			}
		}
		xhr.send(jsonData);
	}

	addWord.addEventListener('click', function(){
		createWord();
	})





})

