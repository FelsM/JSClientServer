function readDatafromCookies(){
	const wordList = document.cookie.split(';').map((pair)=>{
		const wordTemp = pair.split('=')[0];
		const transTemp = pair.split('=')[1];
		return {word: wordTemp, trans: transTemp}
	})
	return wordList
}
function readDatafromLocalStorage(){
	const wordList = [];
	for(let i = 0; i < localStorage.length; i++){
		wordList.push({word: localStorage.key(i), trans: localStorage.getItem(localStorage.key(i))})
	}
	return wordList;
}


document.addEventListener('DOMContentLoaded', function(){



console.log(document.cookie);
const word = document.getElementById('word');
const trans = document.getElementById('translation');
const voc = document.getElementById('vocabulary');
const addBtn = document.getElementById('addWord');

const wordList = voc.tBodies[0];

// const savedWordList = readDatafromCookies();
const savedWordList = readDatafromLocalStorage();
savedWordList.forEach((record)=>{
	addNewWordListRecord(record.word, record.trans)
})




function addWord(){
	const wordValue = word.value;
	const translationValue = trans.value;
	addNewWordListRecord(wordValue, translationValue)
	word.value = '';
	trans.value = '';
}

function addNewWordListRecord(wordValue, transValue){
	const newRow = document.createElement('tr');
	const newWordCell = document.createElement('td');
	const newTransCell = document.createElement('td');
	newWordCell.textContent = wordValue;
	newTransCell.textContent = transValue;
	newRow.append(newWordCell);
	newRow.append(newTransCell);
	wordList.append(newRow);
	//cookies
	// document.cookie = `${wordValue}=${translationValue}`;
	//localStorage
	localStorage.setItem(wordValue, transValue);

}

addBtn.addEventListener('click', addWord);
})


//_____________________sessionStorage/localStorage

// console.log(sessionStorage)
// //item
// //add
// sessionStorage.setItem('key2',`${[1,2,3,4,5]}`);
// //read
// console.log(sessionStorage.getItem('key'));
// //delete
// // sessionStorage.removeItem('key2');


// // deleteAll
// // sessionStorage.clear()

// console.log(sessionStorage.key(0));