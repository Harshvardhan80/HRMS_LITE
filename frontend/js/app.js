// ========== Global State ==========
let employees = [];
let attendances = [];
let dashboardData = {};

// ========== Initialization ==========
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    setupNavigation();
    setupModals();
    setupForms();
    loadDashboard();
    
    // Set today's date as default for attendance date input
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('attendance-date').value = today;
}

// ========== Navigation ==========
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageName = link.dataset.page;
            
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Show corresponding page
            showPage(pageName);
        });
    });
}

function showPage(pageName) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    const selectedPage = document.getElementById(`${pageName}-page`);
    if (selectedPage) {
        selectedPage.classList.add('active');
    }
    
    // Load data for the page
    switch(pageName) {
        case 'dashboard':
            loadDashboard();
            break;
        case 'employees':
            loadEmployees();
            break;
        case 'attendance':
            loadAttendance();
            loadEmployeesForDropdown();
            break;
    }
}

// ========== Dashboard Functions ==========
async function loadDashboard() {
    try {
        const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.DASHBOARD));
        const result = await response.json();
        
        if (result.success) {
            dashboardData = result.data;
            updateDashboardUI();
        } else {
            showToast('Failed to load dashboard data', 'error');
        }
    } catch (error) {
        console.error('Error loading dashboard:', error);
        showToast('Error loading dashboard data', 'error');
    }
}

function updateDashboardUI() {
    document.getElementById('total-employees').textContent = dashboardData.total_employees || 0;
    document.getElementById('today-present').textContent = dashboardData.today_present || 0;
    document.getElementById('today-absent').textContent = dashboardData.today_absent || 0;
    document.getElementById('total-records').textContent = dashboardData.total_attendance_records || 0;
    
    // Update departments list
    const departmentsList = document.getElementById('departments-list');
    
    if (dashboardData.departments && dashboardData.departments.length > 0) {
        departmentsList.innerHTML = dashboardData.departments.map(dept => `
            <div class="department-card">
                <h4>${dept.department}</h4>
                <p>${dept.count} ${dept.count === 1 ? 'Employee' : 'Employees'}</p>
            </div>
        `).join('');
    } else {
        departmentsList.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 20px;">No departments available</p>';
    }
}

// ========== Employee Functions ==========
async function loadEmployees() {
    const loadingEl = document.getElementById('employees-loading');
    const emptyEl = document.getElementById('employees-empty');
    const errorEl = document.getElementById('employees-error');
    const tableContainer = document.getElementById('employees-table-container');
    
    // Show loading state
    loadingEl.style.display = 'flex';
    emptyEl.style.display = 'none';
    errorEl.style.display = 'none';
    tableContainer.style.display = 'none';
    
    try {
        const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.EMPLOYEES));
        const result = await response.json();
        
        loadingEl.style.display = 'none';
        
        if (result.success) {
            employees = result.data;
            
            if (employees.length === 0) {
                emptyEl.style.display = 'flex';
            } else {
                tableContainer.style.display = 'block';
                renderEmployeesTable();
            }
        } else {
            errorEl.style.display = 'flex';
            document.getElementById('employees-error-message').textContent = result.message || 'Failed to load employees';
        }
    } catch (error) {
        console.error('Error loading employees:', error);
        loadingEl.style.display = 'none';
        errorEl.style.display = 'flex';
        document.getElementById('employees-error-message').textContent = 'Network error. Please check your connection.';
    }
}

function renderEmployeesTable() {
    const tbody = document.getElementById('employees-tbody');
    
    tbody.innerHTML = employees.map(employee => `
        <tr>
            <td><strong>${employee.employee_id}</strong></td>
            <td>${employee.full_name}</td>
            <td>${employee.email}</td>
            <td>${employee.department}</td>
            <td>
                <div class="action-buttons">
                    <button class="icon-btn view" onclick="viewEmployeeAttendance(${employee.id})" title="View Attendance">
                        <i class="fas fa-calendar-alt"></i>
                    </button>
                    <button class="icon-btn delete" onclick="confirmDeleteEmployee(${employee.id}, '${employee.employee_id}')" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

async function viewEmployeeAttendance(employeeId) {
    try {
        const response = await fetch(getApiUrl(`${API_CONFIG.ENDPOINTS.EMPLOYEES}${employeeId}/attendances/`));
        const result = await response.json();
        
        if (result.success) {
            const employee = result.employee;
            const stats = result.statistics;
            const records = result.data;
            
            let message = `Attendance Records for ${employee.full_name} (${employee.employee_id})\n\n`;
            message += `Total Records: ${stats.total_records}\n`;
            message += `Present Days: ${stats.present_days}\n`;
            message += `Absent Days: ${stats.absent_days}\n\n`;
            
            if (records.length > 0) {
                message += 'Recent Records:\n';
                records.slice(0, 5).forEach(record => {
                    message += `${record.date}: ${record.status}\n`;
                });
            } else {
                message += 'No attendance records found.';
            }
            
            alert(message);
        } else {
            showToast('Failed to load attendance records', 'error');
        }
    } catch (error) {
        console.error('Error loading employee attendance:', error);
        showToast('Error loading attendance records', 'error');
    }
}

function confirmDeleteEmployee(employeeId, employeeIdString) {
    if (confirm(`Are you sure you want to delete employee ${employeeIdString}? This action cannot be undone.`)) {
        deleteEmployee(employeeId);
    }
}

async function deleteEmployee(employeeId) {
    try {
        const response = await fetch(getApiUrl(`${API_CONFIG.ENDPOINTS.EMPLOYEES}${employeeId}/`), {
            method: 'DELETE'
        });
        
        const result = await response.json();
        
        if (result.success) {
            showToast(result.message || 'Employee deleted successfully', 'success');
            loadEmployees();
            loadDashboard(); // Refresh dashboard stats
        } else {
            showToast(result.message || 'Failed to delete employee', 'error');
        }
    } catch (error) {
        console.error('Error deleting employee:', error);
        showToast('Error deleting employee', 'error');
    }
}

// ========== Attendance Functions ==========
async function loadAttendance() {
    const loadingEl = document.getElementById('attendance-loading');
    const emptyEl = document.getElementById('attendance-empty');
    const errorEl = document.getElementById('attendance-error');
    const tableContainer = document.getElementById('attendance-table-container');
    
    // Show loading state
    loadingEl.style.display = 'flex';
    emptyEl.style.display = 'none';
    errorEl.style.display = 'none';
    tableContainer.style.display = 'none';
    
    try {
        const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.ATTENDANCES));
        const result = await response.json();
        
        loadingEl.style.display = 'none';
        
        if (result.success) {
            attendances = result.data;
            
            if (attendances.length === 0) {
                emptyEl.style.display = 'flex';
            } else {
                tableContainer.style.display = 'block';
                renderAttendanceTable();
            }
        } else {
            errorEl.style.display = 'flex';
            document.getElementById('attendance-error-message').textContent = result.message || 'Failed to load attendance records';
        }
    } catch (error) {
        console.error('Error loading attendance:', error);
        loadingEl.style.display = 'none';
        errorEl.style.display = 'flex';
        document.getElementById('attendance-error-message').textContent = 'Network error. Please check your connection.';
    }
}

function renderAttendanceTable() {
    const tbody = document.getElementById('attendance-tbody');
    
    tbody.innerHTML = attendances.map(attendance => `
        <tr>
            <td><strong>${attendance.employee_id}</strong></td>
            <td>${attendance.employee_name}</td>
            <td>${attendance.department}</td>
            <td>${formatDate(attendance.date)}</td>
            <td>
                <span class="status-badge ${attendance.status.toLowerCase()}">
                    ${attendance.status}
                </span>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="icon-btn delete" onclick="confirmDeleteAttendance(${attendance.id}, '${attendance.employee_id}', '${attendance.date}')" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function confirmDeleteAttendance(attendanceId, employeeId, date) {
    if (confirm(`Are you sure you want to delete attendance record for ${employeeId} on ${formatDate(date)}?`)) {
        deleteAttendance(attendanceId);
    }
}

async function deleteAttendance(attendanceId) {
    try {
        const response = await fetch(getApiUrl(`${API_CONFIG.ENDPOINTS.ATTENDANCES}${attendanceId}/`), {
            method: 'DELETE'
        });
        
        const result = await response.json();
        
        if (result.success) {
            showToast(result.message || 'Attendance record deleted successfully', 'success');
            loadAttendance();
            loadDashboard(); // Refresh dashboard stats
        } else {
            showToast(result.message || 'Failed to delete attendance record', 'error');
        }
    } catch (error) {
        console.error('Error deleting attendance:', error);
        showToast('Error deleting attendance record', 'error');
    }
}

async function loadEmployeesForDropdown() {
    try {
        const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.EMPLOYEES));
        const result = await response.json();
        
        if (result.success) {
            const attendanceEmployeeSelect = document.getElementById('attendance-employee');
            const filterEmployeeSelect = document.getElementById('filter-employee');
            
            const options = result.data.map(emp => 
                `<option value="${emp.id}">${emp.employee_id} - ${emp.full_name}</option>`
            ).join('');
            
            attendanceEmployeeSelect.innerHTML = '<option value="">Select Employee</option>' + options;
            filterEmployeeSelect.innerHTML = '<option value="">All Employees</option>' + options;
        }
    } catch (error) {
        console.error('Error loading employees for dropdown:', error);
    }
}

// Filters
async function applyFilters() {
    const date = document.getElementById('filter-date').value;
    const employeeId = document.getElementById('filter-employee').value;
    
    let url = getApiUrl(API_CONFIG.ENDPOINTS.ATTENDANCES);
    const params = new URLSearchParams();
    
    if (date) {
        params.append('date', date);
    }
    
    if (employeeId) {
        // Get employee's employee_id from the employees array
        const employee = employees.find(emp => emp.id == employeeId);
        if (employee) {
            params.append('employee_id', employee.employee_id);
        }
    }
    
    if (params.toString()) {
        url += '?' + params.toString();
    }
    
    try {
        const response = await fetch(url);
        const result = await response.json();
        
        if (result.success) {
            attendances = result.data;
            
            if (attendances.length === 0) {
                document.getElementById('attendance-table-container').style.display = 'none';
                document.getElementById('attendance-empty').style.display = 'flex';
            } else {
                document.getElementById('attendance-empty').style.display = 'none';
                document.getElementById('attendance-table-container').style.display = 'block';
                renderAttendanceTable();
            }
        }
    } catch (error) {
        console.error('Error applying filters:', error);
        showToast('Error applying filters', 'error');
    }
}

function clearFilters() {
    document.getElementById('filter-date').value = '';
    document.getElementById('filter-employee').value = '';
    loadAttendance();
}

// ========== Modal Functions ==========
function setupModals() {
    // Add Employee Button
    document.getElementById('add-employee-btn').addEventListener('click', openEmployeeModal);
    
    // Mark Attendance Button
    document.getElementById('mark-attendance-btn').addEventListener('click', openAttendanceModal);
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeEmployeeModal();
            closeAttendanceModal();
        }
    });
}

function openEmployeeModal() {
    document.getElementById('employee-modal').classList.add('active');
    document.getElementById('employee-form').reset();
    clearFormErrors('employee-form');
}

function closeEmployeeModal() {
    document.getElementById('employee-modal').classList.remove('active');
    document.getElementById('employee-form').reset();
    clearFormErrors('employee-form');
}

function openAttendanceModal() {
    document.getElementById('attendance-modal').classList.add('active');
    document.getElementById('attendance-form').reset();
    clearFormErrors('attendance-form');
    
    // Set today's date
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('attendance-date').value = today;
}

function closeAttendanceModal() {
    document.getElementById('attendance-modal').classList.remove('active');
    document.getElementById('attendance-form').reset();
    clearFormErrors('attendance-form');
}

// ========== Form Functions ==========
function setupForms() {
    // Employee Form
    document.getElementById('employee-form').addEventListener('submit', handleEmployeeSubmit);
    
    // Attendance Form
    document.getElementById('attendance-form').addEventListener('submit', handleAttendanceSubmit);
}

async function handleEmployeeSubmit(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('save-employee-btn');
    const originalText = submitBtn.innerHTML;
    
    // Disable button and show loading
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
    
    clearFormErrors('employee-form');
    
    const formData = {
        employee_id: document.getElementById('employee-id').value.trim(),
        full_name: document.getElementById('full-name').value.trim(),
        email: document.getElementById('email').value.trim(),
        department: document.getElementById('department').value.trim()
    };
    
    try {
        const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.EMPLOYEES), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        const result = await response.json();
        
        if (result.success) {
            showToast(result.message || 'Employee added successfully', 'success');
            closeEmployeeModal();
            loadEmployees();
            loadDashboard();
        } else {
            if (result.errors) {
                displayFormErrors(result.errors);
            } else {
                showToast(result.message || 'Failed to add employee', 'error');
            }
        }
    } catch (error) {
        console.error('Error adding employee:', error);
        showToast('Network error. Please check your connection.', 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    }
}

async function handleAttendanceSubmit(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('save-attendance-btn');
    const originalText = submitBtn.innerHTML;
    
    // Disable button and show loading
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
    
    clearFormErrors('attendance-form');
    
    const formData = {
        employee_pk: document.getElementById('attendance-employee').value,
        date: document.getElementById('attendance-date').value,
        status: document.getElementById('attendance-status').value
    };
    
    try {
        const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.ATTENDANCES), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        const result = await response.json();
        
        if (result.success) {
            showToast(result.message || 'Attendance marked successfully', 'success');
            closeAttendanceModal();
            loadAttendance();
            loadDashboard();
        } else {
            if (result.errors) {
                displayFormErrors(result.errors, 'attendance');
            } else {
                showToast(result.message || 'Failed to mark attendance', 'error');
            }
        }
    } catch (error) {
        console.error('Error marking attendance:', error);
        showToast('Network error. Please check your connection.', 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    }
}

function displayFormErrors(errors, prefix = '') {
    // Handle Django REST Framework error format
    for (const [field, messages] of Object.entries(errors)) {
        let fieldName = field;
        
        // Map field names to form input IDs
        if (prefix === 'attendance') {
            if (field === 'employee_pk') fieldName = 'attendance-employee';
            else if (field === 'date') fieldName = 'attendance-date';
            else if (field === 'status') fieldName = 'attendance-status';
            else if (field === 'non_field_errors') {
                showToast(Array.isArray(messages) ? messages[0] : messages, 'error');
                continue;
            }
        } else {
            if (field === 'employee_id') fieldName = 'employee-id';
            else if (field === 'full_name') fieldName = 'full-name';
            else if (field === 'email') fieldName = 'email';
            else if (field === 'department') fieldName = 'department';
            else if (field === 'non_field_errors') {
                showToast(Array.isArray(messages) ? messages[0] : messages, 'error');
                continue;
            }
        }
        
        const errorElement = document.getElementById(`${fieldName}-error`);
        if (errorElement) {
            const errorMessage = Array.isArray(messages) ? messages[0] : messages;
            errorElement.textContent = errorMessage;
            errorElement.style.display = 'block';
        }
    }
}

function clearFormErrors(formId) {
    const form = document.getElementById(formId);
    const errorElements = form.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
        element.style.display = 'none';
    });
}

// ========== Utility Functions ==========
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    
    toastMessage.textContent = message;
    toast.className = `toast ${type}`;
    
    // Update icon based on type
    const icon = toast.querySelector('i');
    if (type === 'success') {
        icon.className = 'fas fa-check-circle';
    } else if (type === 'error') {
        icon.className = 'fas fa-exclamation-circle';
    }
    
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}
