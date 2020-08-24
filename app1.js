// CREATE CONTACT LIST
let tasklist = document.querySelector(".list-group");
let fname = document.getElementById("fname");
let lname = document.getElementById("lname");
let phone = document.getElementById("phone");
let filter = document.getElementById("search");

// ADD EVENT LISTENERS
document.addEventListener("DOMContentLoaded", getTasks);
filter.addEventListener("keyup", filtertasks);
document.getElementById("plus").addEventListener("click", function(){
    document.getElementById("numberslist").style.display = "none";
    document.getElementById("popupform").style.display = "block";
});

document.getElementById("cross").addEventListener("click", function(e){
    document.getElementById("numberslist").style.display = "block";
    document.getElementById("popupform").style.display = "none";
});

document.getElementById("create").addEventListener("click", createcontact)
function createcontact(e){
    
    if (fname.value === ""|| lname.value === ""|| phone.value === ""){
        showalert("please enter correct details", "bg-danger");
        clear();
        
    }else{
        let values = {}
        let fname = document.getElementById("fname");
        let lname = document.getElementById("lname");
        let phone = document.getElementById("phone");
        values["fname"] = `${fname.value}`;
        values["lname"] = `${lname.value}`;
        values["phone"] = `${phone.value}`;
        addlocalstorage(values)
        const li = document.createElement("li");
        li.className = `list-group-item`;
        // li.id = `${fname.value}`
        const heading = document.createElement("h5");
        heading.className ="editcls"
        const link = document.createElement("a");
        link.className = `firstele`;
        link.innerHTML = "<i class='fa fa-user-circle-o mr-3 identity'></i>";
        heading.appendChild(link);
        heading.appendChild(document.createTextNode(`${fname.value} ${lname.value}`));
        li.appendChild(heading);
        const div = document.createElement("div")
        div.className = "form-group nums ${fname.value} ";
        div.style = "display:none"
        const subhead = document.createElement("h5");
        subhead.appendChild(document.createTextNode("Phone"));
        div.appendChild(subhead);
        const phonenum = document.createElement("p");
        phonenum.className = "editphone"
        phonenum.appendChild(document.createTextNode(`${phone.value}`));
        div.appendChild(phonenum);
        li.appendChild(div);
        const div1 = document.createElement("div1")
        div1.className = `buttons ${fname.value}`
        div1.style = "display:none"
        const button = document.createElement("button");
        button.className = "btn btn-dark mr-3 edit";
        button.type = "submit"
        button.appendChild(document.createTextNode("Edit"))
        div1.appendChild(button);
        const button1 = document.createElement("button");
        button1.type = "submit"
        button1.className = "btn btn-danger mr-3 delete";
        button1.appendChild(document.createTextNode("Delete"))
        div1.appendChild(button1);
        const button2 = document.createElement("button");
        button2.className = "btn btn-info minimize";
        button2.type = "submit"
        button2.appendChild(document.createTextNode("close"))
        div1.appendChild(button2);
        li.appendChild(div1);
        tasklist.appendChild(li);
        clear();
        document.getElementById("numberslist").style.display = "block";
        document.getElementById("popupform").style.display = "none";
        
    }
    
    e.preventDefault();
};

document.querySelector(".list-group").addEventListener("click", function(e){
    if(e.target.className === "btn btn-danger delete"){
        e.target.parentElement.parentElement.remove();
    }
    
});

//DELETE CONTACT
document.querySelector(".list-group").addEventListener("click", function(e){
    if(e.target.className === "btn btn-danger mr-3 delete"){
        e.target.parentElement.parentElement.remove();
        //REMOVE FROM LS
        removefromls(e.target.parentElement.parentElement.firstChild);
    }
    
}); 

//EDIT CONTACT
document.querySelector(".list-group").addEventListener("click", function(e){
    
    if(e.target.className === "btn btn-dark mr-3 edit"){
       var x = e.target.parentElement.parentElement;
       var y = Array.from(x.childNodes);
       var z = y.pop()
       var name = [];
       for (var i in y){
          name.push(y[i].textContent);
       }
        var firstname = name[0].split(" ")
        var num = (name[1].split("")).slice(5,).join("");
        document.getElementById("numberslist").style.display = "none";
        document.getElementById("fname").value = firstname[0];
        document.getElementById("lname").value = firstname[1];
        document.getElementById("phone").value = num;
        document.getElementById("create").style.display = "none";
        document.getElementById("update").style.display = "block";
        document.getElementById("popupform").style.display = "block";
        var condata = [];
        editls(e.target.parentElement.parentElement.firstChild, condata, e.target.parentElement.parentElement);
        var x = e.target.parentElement.parentElement;
        var y = Array.from(x.childNodes);
        var z = y.slice(1,);
        for (var i in z){
            z[i].style.display = "none";
        }
        document.getElementById("plus").addEventListener("click", function(){
            document.getElementById("fname").value = "";
            document.getElementById("lname").value = "";
            document.getElementById("phone").value = "";
            document.getElementById("create").style.display = "block";
            document.getElementById("update").style.display = "none";
        })
        
    }
   
});  
// edit ls
function editls(names, newnames, s){
    
    document.getElementById("update").addEventListener("click", function(){
        let data;
        if(localStorage.getItem("data") === null){
            data = [];
        }else{
            data = JSON.parse(localStorage.getItem("data"))
        }
        var i;
        data.forEach(function(nums, index){
            var fnums  = nums["fname"];
            var lnums  =  nums["lname"];
            var pnums = nums["phone"];
            var fullname = fnums + " " + lnums;
            if(fullname === names.textContent){
                i = index
                data[i]["fname"] =  document.getElementById("fname").value;
                data[i]["lname"] =  document.getElementById("lname").value;
                data[i]["phone"] =  document.getElementById("phone").value;
                newnames.push(data[i]["fname"] + " " + data[i]["lname"] )
                newnames.push("phone" + data[i]["phone"]);
            };
            
        });
        localStorage.setItem("data", JSON.stringify(data));
        var location = window.location
        location.reload();
        document.getElementById("numberslist").style.display = "block";
        document.getElementById("popupform").style.display = "none";
    })
}

// FILTER CONTACT
function filtertasks(e){
    const val = e.target.value.toUpperCase();
    document.querySelectorAll(".list-group-item").forEach
     (function(task){
        const item  = task.firstChild.textContent;
        if(item.toUpperCase().indexOf(val) != -1){
            task.style.display = "block";
        }else{
            task.style.display = "none";
        }
     });
    e.preventDefault();
}

// CLEAR CONTACT DETAILS
 function clear(){
     fname.value = "";
     lname.value = "";
     phone.value = "";
 }

// ALERT FUNCTION
function showalert(msg, color){
    const data = document.createElement("div");
    data.className = `alert ${color}`;
    data.appendChild(document.createTextNode(msg));
    const card = document.querySelector(".card-body");
    const form = document.querySelector("#form_values");
    card.insertBefore(data, form);
    setTimeout(clearError, 1000);
 };

 // SETTIME FUNCTION
function clearError(){
    document.querySelector(".alert").remove();
};

// SHOW FULL DETAILS
document.querySelector(".list-group").addEventListener("click", function(e){
    if(e.target.className === `fa fa-user-circle-o mr-3 identity`){
        var x = e.target.parentElement.parentElement.parentElement;
        var y = Array.from(x.childNodes);
        var z = y.slice(1, );
        for (var i in z){
            z[i].style.display = "block";
        }
        
    };
});

// MINIMIZE DETAILS
document.querySelector(".list-group").addEventListener("click", function(e){
    if(e.target.className === "btn btn-info minimize"){
        var x = e.target.parentElement.parentElement;
        var y = Array.from(x.childNodes);
        var z = y.slice(1,);
        for (var i in z){
            z[i].style.display = "none";
        }
        
    }
});
// ADD TO LOCAL STORAGE
function  addlocalstorage(names){
    let data;
    if(localStorage.getItem("data") === null){
        data = [];
    }else{
        data = JSON.parse(localStorage.getItem("data"))
        console.log(data.length)
    }
    data.push(names);
    localStorage.setItem("data", JSON.stringify(data))
};
// GET DATA
function values(){
    let data;
    if(localStorage.getItem("data") === null){
        data = [];
    }else{
        data = JSON.parse(localStorage.getItem("data"))
    }
    return data;
}
// GET TASKS FROM LS
function getTasks(){
    var val = values();
    
    val.forEach(function(val){
        var contact = val
        const li = document.createElement("li");
        li.className = `list-group-item`;
        li.id = `${fname.value}`
        const heading = document.createElement("h5");
        heading.className ="editcls"
        const link = document.createElement("a");
        link.className = `firstele`;
        link.innerHTML = "<i class='fa fa-user-circle-o mr-3 identity'></i>";
        heading.appendChild(link);
        heading.appendChild(document.createTextNode(`${contact["fname"]} ${contact["lname"]}`));
        li.appendChild(heading);
        const div = document.createElement("div")
        div.className = "form-group nums ${fname.value} ";
        div.style = "display:none"
        const subhead = document.createElement("h5");
        subhead.appendChild(document.createTextNode("Phone"));
        div.appendChild(subhead);
        const phonenum = document.createElement("p");
        phonenum.className = "editphone"
        phonenum.appendChild(document.createTextNode(`${contact["phone"]}`));
        div.appendChild(phonenum);
        li.appendChild(div);
        const div1 = document.createElement("div1")
        div1.className = `buttons ${contact[0]}`
        div1.style = "display:none"
        const button = document.createElement("button");
        button.className = "btn btn-dark mr-3 edit";
        button.type = "submit"
        button.appendChild(document.createTextNode("Edit"))
        div1.appendChild(button);
        const button1 = document.createElement("button");
        button1.type = "submit"
        button1.className = "btn btn-danger mr-3 delete";
        button1.appendChild(document.createTextNode("Delete"))
        div1.appendChild(button1);
        const button2 = document.createElement("button");
        button2.className = "btn btn-info minimize";
        button2.type = "submit"
        button2.appendChild(document.createTextNode("close"))
        div1.appendChild(button2);
        li.appendChild(div1);
        tasklist.appendChild(li);
        document.getElementById("numberslist").style.display = "block";
        document.getElementById("popupform").style.display = "none";

    });
};
// REMOVE FROM LS
function removefromls(val){
    let data;
    if(localStorage.getItem("data") === null){
        data = [];
    }else{
        data = JSON.parse(localStorage.getItem("data"))
    }
    data.forEach(function(nums, index){
        var fullname  = nums["fname"] + " " + nums["lname"];
        if(fullname === val.textContent){
           data.splice(index, 1);
        }
    });
    localStorage.setItem("data", JSON.stringify(data));
} 

