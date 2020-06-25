export const employees = document.getElementById('employees');
export const name = document.getElementById('name');
export const department = document.getElementById('department');
export const salary = document.getElementById('salary');
const form = document.getElementById('employee-form');
export const btnUpdate = document.getElementById('update');


import { Request } from './request';
import { UI } from './ui';
const request = new Request;
const ui = new UI

var updateBtnTarget;

eventlisteners();

function eventlisteners() {

    document.addEventListener('DOMContentLoaded', function (e) {
        getEmployeesData();
        e.preventDefault();
    });
    form.addEventListener('submit', addEmployee);
    employees.addEventListener('click', checkBtn);
    btnUpdate.addEventListener('click', updateEmployee);

}

function getEmployeesData() {
    request.get('employees').then(response => {
        ui.showEmployeesInUI(response);
    }).catch(err => {
        ui.showAlert(err);
    })
}
function addEmployee(e) {
    const employeeName = name.value.trim();
    const employeeDepartment = department.value.trim();
    const employeeSalary = salary.value.trim();
    if (employeeName !== "" & employeeDepartment !== "" & employeeSalary !== "") {
        request.get('employees').then(response => {
            const arr = response;
            var number = 0;
            arr.forEach(employee => {
                if (employee.name === employeeName) {
                    number = 1;
                }
            });
            return number;

        }).then(number => {
            if (number === 0) {
                request.post('employees', {
                    name: `${employeeName}`,
                    department: `${employeeDepartment}`,
                    salary: Number(employeeSalary)
                }).then(resp => {
                    getEmployeesData();
                }).catch(err => {
                    showAlert(err);
                })
            }
            else {
                ui.showAlert('This employee already has')
            }
            ui.clearInputs();
        }).catch(err => {
            showAlert(err);
        })
    }
    else {
        ui.showAlert("Lütfen Tüm Alanları Doldurun.");
    }

    e.preventDefault();
}
function checkBtn(e) {
    if (e.target.id === 'update-employee') {
        ui.showOrHideUpdateBtn(e);
        updateBtnTarget = e.target;

    }
    if (e.target.id === 'delete-employee') {
        deleteEmployee(e.target);
    }
    e.preventDefault();
}
function deleteEmployee(target) {
    request.delete(`employees/${target.parentElement.parentElement.children[3].textContent}`).then(response => {
        ui.deleteEmployee(target.parentElement.parentElement);
        ui.showAlert('Employee Deleted !')

    }).catch(err => {
        ui.showAlert(err);
    })
}
function updateEmployee(e) {
    const employeeName = name.value.trim();
    const employeeDepartment = department.value.trim();
    const employeeSalary = salary.value.trim();
    if (employeeName !== "" & employeeDepartment !== "" & employeeSalary !== "") {

        request.put(`employees/${updateBtnTarget.parentElement.parentElement.children[3].textContent}`, {
            name: `${employeeName}`,
            department: `${employeeDepartment}`,
            salary: Number(employeeSalary),
        }).then(() => {
            getEmployeesData();
        }).catch(err => {
            ui.showAlert(err);
        })

        ui.clearInputs();


    }
    else {
        ui.showAlert('Lütfen Tüm Alanları Doldurun.');
    }


    e.preventDefault();
}