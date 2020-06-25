import { name } from "./index";
import { department } from "./index";
import { salary } from "./index";
import {btnUpdate} from "./index";
export class UI {

    
    showEmployeesInUI(response) {
        employees.innerHTML = "";
        response.forEach(employee => {
            employees.innerHTML += `<tr>
                                            
        <td>${employee.name}</td>
        <td>${employee.department}</td>
        <td>${employee.salary}</td>
        <td>${employee.id}</td>
        <td><a href="#" id = "update-employee" class= "btn btn-danger">Güncelle</a></td> 
        <td> <a href="#" id = "delete-employee" class= "btn btn-danger">Sil</a></td>
    </tr>`;

        });

    }
    clearInputs() {
        name.value = "";
        department.value = "";
        salary.value = "";
    }
    deleteEmployee(element) {
        element.remove();
        
    }
    showOrHideUpdateBtn(e){
        if(btnUpdate.style.display === 'none'){
            btnUpdate.style.display = 'block';
            this.getDataToInputs(e);
        }
        else{
            btnUpdate.style.display = 'none';
            this.clearInputs();
        }
    }
    getDataToInputs(e){
        name.value = e.target.parentElement.parentElement.children[0].textContent;
        department.value = e.target.parentElement.parentElement.children[1].textContent;
        salary.value = e.target.parentElement.parentElement.children[2].textContent;
    }
    showAlert(alrt) {
        alert(alrt);
    }

}