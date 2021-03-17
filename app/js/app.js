window.addEventListener('load', function(){
	const baseUrl = 'http://localhost:2403';
	
	let wordList = [];

	const voabulary = document.getElementById('vocabulary');
	const wordsListTemplate = vocabulary.tBodies[0];
	const addWord = document.getElementById('addWord')


	getWordsList();

	addWord.addEventListener('click', function(){
		createWord();
	})





	function renderWords(wordList){
		wordsListTemplate.innerHTML = '';
		wordList.forEach((wordObj)=>{
			const tr = document.createElement('tr');
			const wordTd = document.createElement('td');
			const transTd = document.createElement('td');
			const controlsTd = document.createElement('td');
			const deleteBtn = document.createElement('button');
			const editBtn = document.createElement('button');
			const saveBtn = document.createElement('button');
			
			wordTd.innerHTML = wordObj.word;
			transTd.innerHTML = wordObj.translation;
			deleteBtn.innerHTML = 'Delete';
			editBtn.innerHTML = 'Edit';
			saveBtn.innerHTML = 'Save';


			deleteBtn.onclick = function(){
				deleteWord(wordObj.id)
			}
			editBtn.onclick = function(){
				editRow(tr);
			}
			saveBtn.onclick = function(){
				updateWord(wordObj.id, tr);
			}


			controlsTd.append(...[editBtn, saveBtn, deleteBtn]);
			tr.append(...[wordTd, transTd, controlsTd]);
			
			


			
			
	
			
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
				wordList = [...JSON.parse(xhr.response)];
				renderWords(wordList);
			}
		}
	}

	

	function createWord(){
		const xhr = new XMLHttpRequest();
		xhr.open('POST', `${baseUrl}/words`);
		const dataToSend = collectData();
		const jsonData = JSON.stringify(dataToSend);
		xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4 && xhr.status === 200){
				const createdObj = JSON.parse(xhr.response);
				wordList = [...wordList, createdObj];
				renderWords(wordList);
				console.log(wordList);	
			}
		}
		xhr.send(jsonData);
	}

	function updateWord(id, tr){
		const xhr = new XMLHttpRequest();
		xhr.open('PUT', `${baseUrl}/words/${id}`);
		const dataToSend = saveEditing(tr);
		const jsonData = JSON.stringify(dataToSend);
		xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4 && xhr.status === 200){
				const updatedWordIndex = wordList.findIndex((wordObj)=>wordObj.id === id);
				const updatedObj = JSON.parse(xhr.response);
				wordList[updatedWordIndex] = Object.assign(wordList[updatedWordIndex], updatedObj);
				renderWords(wordList);
			}
		}
		xhr.send(jsonData);
	}

	function deleteWord(id){
		const xhr = new XMLHttpRequest();
		xhr.open('DELETE', `${baseUrl}/words/${id}`);
		xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4 && xhr.status === 200){
				wordList = wordList.filter(wordObj=>wordObj.id !== id);
				renderWords(wordList);
			}
		}
		xhr.send();
	}

	function editRow(tr){
		tr.children[0].setAttribute('contenteditable', 'true');
		tr.children[1].setAttribute('contenteditable', 'true');
	}

	function saveEditing(tr){
		tr.children[0].removeAttribute('contenteditable');
		tr.children[1].removeAttribute('contenteditable');
		const word = tr.children[0].innerHTML;
		const translation = tr.children[1].innerHTML;
		return {word, translation}
	}





})

