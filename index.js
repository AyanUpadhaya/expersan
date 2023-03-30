//utilities

const addBtn = document.getElementById("add-btn");

//get value by id
const getInputValueById = (id)=>{
	const element = document.getElementById(id);
	return element.value
}
const makeInputBoxEmpty = (id)=>{
	const element = document.getElementById(id);
	element.value = '';
}

//date function 

function getDate(){
	const date = new Date();

	let day = date.getDate();
	let month = date.getMonth() + 1;
	let year = date.getFullYear();

	// This arrangement can be altered based on how we want the date's format to appear.
	let currentDate = `${day}-${month}-${year}`;
	console.log(currentDate); // "17-6-2022"
	return currentDate
}

//delete from local storage and update UI
const deleteData = (expenseName)=>{
	let ExpenseStorage;
	//check storage
	const storage = localStorage.getItem('expense-storage')
	if(storage){
		ExpenseStorage = JSON.parse(storage)
		//deduction part
		ExpenseStorage.forEach(expense =>{
			if(expenseName === expense.expenseName){
				deductTotalExpense(parseInt(expense.expneseAmount))
			}
		})

		ExpenseStorage = ExpenseStorage.filter(expense=>expense.expenseName!== expenseName)

		localStorage.setItem("expense-storage", JSON.stringify(ExpenseStorage))


	}
	document.querySelector('.list-group').innerHTML = '';
	
	loadStorage()
	
}

//display data when you add expense data
const displayData = (expenseName='', expneseAmount=0, date='2023')=>{


	document.querySelector('.list-group').innerHTML += `
	<li class="list-group-item d-flex justify-content-between align-items-center">
      <div style="width:250px">${expenseName}</div><div style="width:250px">${expneseAmount}</div> 
      <div style="width:250px">${date}</div> 
      <button class="btn btn-danger" onclick="deleteData('${expenseName}')"><i class="fa-solid fa-trash-can"></i></button>
   </li>
	`
}


//add expense amount to local storage
const addToStorage = (expenseName, expneseAmount,date='2023')=>{
	let ExpenseStorage =[] ;
	//check storage
	const storage = localStorage.getItem('expense-storage')

	if(storage){
		ExpenseStorage = JSON.parse(storage)
		ExpenseStorage.push({expenseName:expenseName,expneseAmount:expneseAmount,date:date})
		localStorage.setItem("expense-storage", JSON.stringify(ExpenseStorage))
	}else{
		ExpenseStorage.push({expenseName:expenseName,expneseAmount:expneseAmount,date:date})
		localStorage.setItem("expense-storage", JSON.stringify(ExpenseStorage))
	}

	console.log(expenseName,expneseAmount)
}

//load storage and display data
const loadStorage =()=>{
	let ExpenseStorage;
	//check storage
	const storage = localStorage.getItem('expense-storage')

	if(storage){
		const ExpenseStorage = JSON.parse(storage)
		ExpenseStorage.forEach(expense=>displayData(expense.expenseName,expense.expneseAmount,expense.date))
	}
}

//update expense when add new data
const addTotalExpense =(amount)=>{
	const oldExpense = parseInt(document.getElementById('total-expense').innerText)
	const newExpense = amount+oldExpense
	document.getElementById('total-expense').innerText = newExpense 
}
//deduct from expense when click delete button
const deductTotalExpense = (amount)=>{
	const oldExpense = parseInt(document.getElementById('total-expense').innerText)
	const newExpense = oldExpense - amount
	document.getElementById('total-expense').innerText = newExpense 
}

addBtn.addEventListener('click', ()=>{
	//get values by id
	const expenseName = getInputValueById('expense-name');
	const expneseAmount = getInputValueById('expense');

	if(isNaN(expneseAmount) || expneseAmount==''){
		alert("please enter a valid number")
		makeInputBoxEmpty('expense-name')
		makeInputBoxEmpty('expense')
	}else{
		//get current date
		const date = getDate()
		//update expense list
		displayData(expenseName, expneseAmount,date)
		
		//add to storage and update expenses
		addToStorage(expenseName, expneseAmount,date)
		addTotalExpense(parseInt(expneseAmount))

		//make input box empty
		makeInputBoxEmpty('expense-name')
		makeInputBoxEmpty('expense')
	}
	
})

//calculate total expense from local storage
const calculateTotal =()=>{
	let ExpenseStorage;
	let total =0;
	//check storage
	const storage = localStorage.getItem('expense-storage')

	if(storage && !storage.length<1){
		ExpenseStorage = JSON.parse(storage)
		ExpenseStorage.forEach(expense=>total+=parseInt(expense.expneseAmount))
		addTotalExpense(total)
	}
}


//call function when page loads
loadStorage()
calculateTotal()