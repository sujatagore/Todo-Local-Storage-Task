var cl = console.log;

const formtodo = document.getElementById("formtodo");

const inputctrl = document.getElementById("inputctrl");

const container = document.getElementById("container");

const subbtn = document.getElementById("subbtn");

const updbtn = document.getElementById("updbtn");


let todoarr = [];

const ondelete = (e2) =>{
	let deleid = e2.closest("li").id;
	let deleobj = todoarr.find(obj => obj.todoid === deleid);
	let deletodoitem = deleobj.todoitem;
	let confirmmsg = confirm(`Are you sure, You want to remove ${deletodoitem} todo item ?`);
	if(confirmmsg === true){
		let deleteid = e2.closest("li").id;
		let getIndex = todoarr.findIndex(todo => todo.todoid === deleteid);
		todoarr.splice(getIndex, 1);
		localStorage.setItem("todos", JSON.stringify(todoarr));
		//templatingarr(todoarr);
		e2.closest("li").remove()
		swal.fire({
			title : `Todo Item ${deletodoitem} is removed successfully !!!!`,
			icon : `success`,
			timer : 2000
		})
	}else{
		return
	}
}

const onedit = (e1) =>{
	let editId = e1.closest("li").getAttribute("id");
	let editobj = todoarr.find(todo => todo.todoid === editId);
	localStorage.setItem("editId" , editId);
	inputctrl.value = editobj.todoitem;
	updbtn.classList.remove("d-none");
	subbtn.classList.add("d-none");
}

const templatingarr = (arr) =>{
	let result = `<ul class="list-group" id="stdlist">`
	arr.forEach(obj =>{
		result += `<li class="list-group-item font-weight-bold" id="${obj.todoid}">
					${obj.todoitem}
					<span class="float-right">
						<i class="far fa-edit text-primary" onclick = "onedit(this)"></i>
						<i class="far fa-trash-alt text-danger ml-2" onclick = "ondelete(this)"></i>
					</span>
					</li>`
	});
	result += `</ul>`;
	container.innerHTML = result;
}

if(localStorage.getItem("todos")){
	todoarr = JSON.parse(localStorage.getItem("todos"));
	templatingarr(todoarr);
}

const generateUuid = () => {
    return (
        String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx')
    ).replace(/[xy]/g, (character) => {
        const random = (Math.random() * 16) | 0;
        const value = character === "x" ? random : (random & 0x3) | 0x8;

        return value.toString(16);
    });
};

const onTodoForm = (e) =>{
	e.preventDefault();
	let newtodo = {
		todoitem : inputctrl.value,
		todoid : generateUuid()
	};
	todoarr.unshift(newtodo);
	localStorage.setItem("todos", JSON.stringify(todoarr));
	//templatingarr(todoarr);
	let li = document.createElement("li");
	li.className = "list-group-item font-weight-bold";
	li.id = newtodo.todoid;
	li.innerHTML = `${newtodo.todoitem} <span class="float-right">
						<i class="far fa-edit text-primary" onclick = "onedit(this)"></i>
						<i class="far fa-trash-alt text-danger ml-2" onclick = "ondelete(this)"></i>
					</span>`;
	stdlist.prepend(li);
	swal.fire({
			title : `New Todo Item ${newtodo.todoitem} is added successfully !!!!`,
			icon : `success`,
			timer : 2000
		});
	e.target.reset();
}

const onUpdate = () =>{
	let updId = localStorage.getItem("editId");
	let updobj = todoarr.find(obj => obj.todoid === updId);
	let updtodoitem = updobj.todoitem;
	let UpdValue = inputctrl.value;
	for(let i = 0; i < todoarr.length; i++){
		if(todoarr[i].todoid === updId){
			todoarr[i].todoitem = UpdValue;
			break;
		}
	}
	localStorage.setItem("todos", JSON.stringify(todoarr));
	//templatingarr(todoarr);
	let li = document.createElement("li");
	li.innerHTML = `${UpdValue}<span class="float-right">
						<i class="far fa-edit text-primary" onclick = "onedit(this)"></i>
						<i class="far fa-trash-alt text-danger ml-2" onclick = "ondelete(this)"></i>
					</span>`
	swal.fire({
			title : `Todo Item ${updtodoitem} is updated as ${UpdValue} successfully !!!!`,
			icon : `success`,
			timer : 2000
		});
	formtodo.reset();
	updbtn.classList.add("d-none");
	subbtn.classList.remove("d-none");
}


formtodo.addEventListener("submit", onTodoForm);

updbtn.addEventListener("click" , onUpdate);