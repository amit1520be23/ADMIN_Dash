// script.js
const employees = [
    { id: 1, name: "Alice", tasks: [], attendance: [] },
    { id: 2, name: "Bob", tasks: [], attendance: [] },
    { id: 3, name: "Charlie", tasks: [], attendance: [] },
    { id: 4, name: "David", tasks: [], attendance: [] },
    { id: 5, name: "Eva", tasks: [], attendance: [] },
];

// Load employee data from localStorage if it exists
function loadEmployeeData() {
    const storedData = localStorage.getItem('employees');
    if (storedData) {
        const parsedData = JSON.parse(storedData);
        parsedData.forEach(storedEmployee => {
            const employee = employees.find(emp => emp.id === storedEmployee.id);
            if (employee) {
                employee.tasks = storedEmployee.tasks;
                employee.attendance = storedEmployee.attendance;
            }
        });
    }
}

loadEmployeeData();  // Load employee data on page load

const loginBtn = document.getElementById("login-btn");
const roleSelect = document.getElementById("role");
const passwordInput = document.getElementById("password");
const dashboard = document.getElementById("dashboard");
const menu = document.getElementById("menu");
const employeeContainer = document.getElementById("employee-container");
const employeeDetails = document.getElementById("employee-details");
const detailsContent = document.getElementById("details-content");
const backBtn = document.getElementById("back-btn");

loginBtn.addEventListener("click", () => {
    const role = roleSelect.value;
    const password = passwordInput.value;

    if (password === "admin123" && role === "admin") {
        loadAdminDashboard();
    } else if (password === "employee123" && role === "employee") {
        loadEmployeeDashboard();
    } else {
        alert("Invalid credentials");
    }
});

function loadAdminDashboard() {
    document.getElementById("auth-container").classList.add("hidden");
    dashboard.classList.remove("hidden");
    menu.innerHTML = `
        <li><button onclick="assignTasks()">Assign Tasks</button></li>
        <li><button onclick="markAttendance()">Mark Attendance</button></li>
    `;
    displayEmployees();
}

function loadEmployeeDashboard() {
    document.getElementById("auth-container").classList.add("hidden");
    dashboard.classList.remove("hidden");
    menu.innerHTML = `<li><button onclick="viewTasks()">View Tasks</button></li>`;
    displayEmployees();
}

function displayEmployees() {
    employeeContainer.innerHTML = "";
    employees.forEach(employee => {
        employeeContainer.innerHTML += `
            <div class="employee-card" onclick="viewEmployeeDetails(${employee.id})">
                <h3>${employee.name}</h3>
            </div>
        `;
    });
}

function viewEmployeeDetails(id) {
    const employee = employees.find(emp => emp.id === id);
    detailsContent.innerHTML = `
        <h3>${employee.name}</h3>
        <p><strong>Assigned Tasks:</strong> ${employee.tasks.length ? employee.tasks.join(', ') : 'No tasks assigned.'}</p>
        <p><strong>Attendance:</strong> ${employee.attendance.length ? employee.attendance.join(', ') : 'No attendance marked.'}</p>
    `;
    employeeDetails.classList.remove("hidden");
    dashboard.classList.add("hidden");
}

backBtn.addEventListener("click", () => {
    employeeDetails.classList.add("hidden");
    dashboard.classList.remove("hidden");
});

function assignTasks() {
    const task = prompt("Enter the task:");
    const employeeId = prompt("Enter Employee ID to assign:");
    const employee = employees.find(emp => emp.id == employeeId);
    if (employee) {
        employee.tasks.push(task);
        saveEmployeeData();  // Save the updated employee data to localStorage
        alert("Task assigned!");
    } else {
        alert("Employee not found!");
    }
}

function markAttendance() {
    const employeeId = prompt("Enter Employee ID to mark attendance:");
    const employee = employees.find(emp => emp.id == employeeId);
    if (employee) {
        const attendanceDate = new Date().toLocaleDateString();
        employee.attendance.push(attendanceDate);
        saveEmployeeData();  // Save the updated employee data to localStorage
        alert("Attendance marked!");
    } else {
        alert("Employee not found!");
    }
}

function viewTasks() {
    const employeeId = prompt("Enter Employee ID to view tasks:");
    const employee = employees.find(emp => emp.id == employeeId);
    if (employee) {
        alert(`Tasks: ${employee.tasks.join(', ')}`);
    } else {
        alert("Employee not found!");
    }
}

// Function to save employee data to localStorage
function saveEmployeeData() {
    localStorage.setItem('employees', JSON.stringify(employees));
}
