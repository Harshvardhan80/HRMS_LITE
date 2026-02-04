# HRMS Lite - Human Resource Management System

A lightweight, full-stack Human Resource Management System for managing employee records and tracking daily attendance.

## 🌟 Live Demo

- **Frontend**: [Your deployed frontend URL]
- **Backend API**: [Your deployed backend URL]
- **GitHub Repository**: [Your repository URL]

## 📋 Features

### Employee Management
- Add new employees with unique Employee ID
- View all employees in a clean, organized table
- Delete employee records
- View individual employee attendance records

### Attendance Management
- Mark daily attendance (Present/Absent)
- View all attendance records
- Filter attendance by date
- Filter attendance by employee
- Prevent duplicate attendance entries for same employee on same date

### Dashboard
- Total employee count
- Today's present/absent statistics
- Total attendance records
- Department-wise employee distribution

## 🛠️ Tech Stack

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Custom styling with CSS variables
- **JavaScript (Vanilla)**: No frameworks, pure JavaScript
- **Font Awesome**: Icons

### Backend
- **Python 3.10+**
- **Django 4.2**: Web framework
- **Django REST Framework**: RESTful API
- **PostgreSQL/SQLite**: Database

### Deployment
- **Frontend**: Vercel / Netlify
- **Backend**: Render / Railway
- **Database**: PostgreSQL (Production) / SQLite (Development)

## 📁 Project Structure

```
hrms-lite/
├── backend/
│   ├── hrms_lite/
│   │   ├── __init__.py
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── wsgi.py
│   │   └── asgi.py
│   ├── employees/
│   │   ├── __init__.py
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   ├── admin.py
│   │   └── apps.py
│   ├── manage.py
│   ├── requirements.txt
│   └── .env.example
└── frontend/
    ├── index.html
    ├── css/
    │   └── styles.css
    └── js/
        ├── config.js
        └── app.js
```

## 🚀 Getting Started

### Prerequisites
- Python 3.10 or higher
- pip (Python package manager)
- A modern web browser

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   
   # On Windows
   venv\Scripts\activate
   
   # On macOS/Linux
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   ```bash
   # Copy the example env file
   cp .env.example .env
   
   # Edit .env and add your configuration
   # For development, default values should work
   ```

5. **Run migrations**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

6. **Create superuser (optional, for admin panel)**
   ```bash
   python manage.py createsuperuser
   ```

7. **Run development server**
   ```bash
   python manage.py runserver
   ```

   Backend will be available at `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Configure API endpoint**
   - Open `js/config.js`
   - Update `BASE_URL` if your backend is running on a different port/host
   ```javascript
   const API_CONFIG = {
       BASE_URL: 'http://localhost:8000/api',  // Change as needed
       // ...
   };
   ```

3. **Serve frontend**
   
   **Option 1: Using Python's built-in server**
   ```bash
   python -m http.server 3000
   ```
   
   **Option 2: Using VS Code Live Server**
   - Install "Live Server" extension
   - Right-click on `index.html`
   - Select "Open with Live Server"
   
   **Option 3: Direct file access**
   - Simply open `index.html` in your browser
   
   Frontend will be available at `http://localhost:3000` or similar

## 📡 API Endpoints

### Employees
- `GET /api/employees/` - Get all employees
- `POST /api/employees/` - Create new employee
- `GET /api/employees/{id}/` - Get single employee
- `DELETE /api/employees/{id}/` - Delete employee
- `GET /api/employees/{id}/attendances/` - Get employee's attendance records

### Attendance
- `GET /api/attendances/` - Get all attendance records
- `POST /api/attendances/` - Mark attendance
- `GET /api/attendances/{id}/` - Get single attendance record
- `DELETE /api/attendances/{id}/` - Delete attendance record
- `GET /api/attendances/dashboard/` - Get dashboard statistics

### Query Parameters
- `?date=YYYY-MM-DD` - Filter by date
- `?employee_id=EMP001` - Filter by employee ID

## 🎨 Features Implemented

### Core Requirements ✅
- [x] Employee Management (Add, View, Delete)
- [x] Attendance Management (Mark, View)
- [x] RESTful API with proper HTTP methods
- [x] Data persistence with database
- [x] Server-side validation
- [x] Error handling with meaningful messages
- [x] Professional UI with clean layout
- [x] Loading states
- [x] Empty states
- [x] Error states
- [x] Responsive design

### Bonus Features ✅
- [x] Filter attendance by date
- [x] Filter attendance by employee
- [x] Display total present days per employee
- [x] Dashboard with statistics
- [x] Department-wise employee count

## 🔒 Validation Rules

### Employee
- **Employee ID**: Required, unique, alphanumeric, auto-uppercase
- **Full Name**: Required, minimum 2 characters
- **Email**: Required, unique, valid email format, auto-lowercase
- **Department**: Required

### Attendance
- **Employee**: Required, must exist
- **Date**: Required
- **Status**: Required, must be "Present" or "Absent"
- **Unique Constraint**: One attendance record per employee per date

## 🎯 Usage Guide

### Adding an Employee
1. Navigate to "Employees" page
2. Click "Add Employee" button
3. Fill in the required details
4. Click "Save Employee"

### Marking Attendance
1. Navigate to "Attendance" page
2. Click "Mark Attendance" button
3. Select employee from dropdown
4. Choose date and status
5. Click "Save Attendance"

### Viewing Statistics
1. Navigate to "Dashboard" page
2. View real-time statistics
3. See department distribution

### Filtering Attendance
1. Navigate to "Attendance" page
2. Use date and/or employee filters
3. Click "Apply Filters"
4. Click "Clear" to reset

## 🌐 Deployment

### Backend Deployment (Render)

1. **Create account on Render**
   - Go to [render.com](https://render.com)
   - Sign up/login

2. **Create new Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - Name: `hrms-lite-backend`
     - Environment: `Python 3`
     - Build Command: `pip install -r requirements.txt`
     - Start Command: `gunicorn hrms_lite.wsgi:application`

3. **Set environment variables**
   ```
   SECRET_KEY=your-production-secret-key
   DEBUG=False
   ALLOWED_HOSTS=your-app.onrender.com
   DATABASE_URL=your-postgres-url
   CORS_ALLOWED_ORIGINS=https://your-frontend.vercel.app
   ```

4. **Add PostgreSQL database**
   - In Render dashboard, create new PostgreSQL database
   - Copy database URL and add to environment variables

### Frontend Deployment (Vercel)

1. **Create account on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login

2. **Import project**
   - Click "New Project"
   - Import your GitHub repository
   - Set root directory to `frontend`

3. **Update API configuration**
   - Before deploying, update `frontend/js/config.js`:
   ```javascript
   const API_CONFIG = {
       BASE_URL: 'https://your-backend.onrender.com/api',
       // ...
   };
   ```

4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically deploy your frontend

## 🐛 Troubleshooting

### CORS Issues
- Ensure backend's `CORS_ALLOWED_ORIGINS` includes your frontend URL
- Check that requests include proper headers

### Database Connection
- Verify `DATABASE_URL` in environment variables
- Check database credentials
- Ensure migrations are run

### API Not Responding
- Check backend is running
- Verify API URL in `config.js`
- Check browser console for errors

## 📝 Assumptions & Limitations

### Assumptions
- Single admin user (no authentication required)
- One attendance record per employee per day
- Employee IDs are alphanumeric only
- All fields are required

### Limitations
- No user authentication/authorization
- No leave management
- No payroll features
- No bulk operations
- No export functionality
- No attendance reports/analytics

## 🔮 Future Enhancements

- User authentication and role-based access
- Multiple attendance sessions per day
- Leave management system
- Payroll integration
- Advanced reporting and analytics
- Export to Excel/PDF
- Email notifications
- Mobile app
- Attendance via QR code/biometric

## 👨‍💻 Developer

**Your Name**
- Email: your.email@example.com
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)

## 📄 License

This project is created for educational and assessment purposes.

## 🙏 Acknowledgments

- Font Awesome for icons
- Django and Django REST Framework documentation
- MDN Web Docs for frontend references

---

**Note**: This is a lightweight HRMS system built for demonstration purposes. For production use, consider adding authentication, advanced security measures, and comprehensive testing.
