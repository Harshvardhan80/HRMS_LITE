# HRMS Lite - Human Resource Management System

A lightweight, full-stack Human Resource Management System for managing employee records and tracking daily attendance.

##  Live Demo

- **Frontend**: https://hrms-lite-frontend-five.vercel.app/
- **Backend API**: https://hrms-lite-backend-6kgv.onrender.com
- **GitHub Repository**: https://github.com/Harshvardhan80/HRMS_LITE

## Features

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

## Tech Stack

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Custom styling with CSS variables
- **JavaScript (Vanilla)**: No frameworks, pure JavaScript
- **Font Awesome**: Icons

### Backend
- **Python 3.10+**
- **Django 4.2**: Web framework
- **Django REST Framework**: RESTful API
- **SQLite**: Database

### Deployment
- **Frontend**: Vercel 
- **Backend**: Render 
- **Database**:  SQLite

## Project Structure

```
HRMS-LITE/
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
