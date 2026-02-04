# 🚀 Quick Start Guide - HRMS Lite

Get your HRMS Lite application running in under 10 minutes!

## Prerequisites Check

Before starting, ensure you have:
- [ ] Python 3.10 or higher installed
- [ ] pip installed
- [ ] A modern web browser (Chrome, Firefox, Safari, or Edge)

## 🔧 Quick Setup

### Option 1: Automated Setup (Recommended)

#### For Windows:
```bash
# 1. Clone/download the project
cd hrms-lite

# 2. Run setup script
.\setup.bat
```

#### For macOS/Linux:
```bash
# 1. Clone/download the project
cd hrms-lite

# 2. Make setup script executable and run
chmod +x setup.sh
./setup.sh
```

### Option 2: Manual Setup

#### Step 1: Backend Setup (5 minutes)

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Setup database
python manage.py migrate

# Run server
python manage.py runserver
```

✅ Backend is now running at `http://localhost:8000`

#### Step 2: Frontend Setup (2 minutes)

```bash
# Open a new terminal
cd frontend

# Option A: Python server
python -m http.server 3000

# Option B: VS Code Live Server
# 1. Install "Live Server" extension
# 2. Right-click index.html
# 3. Select "Open with Live Server"

# Option C: Direct file
# Double-click index.html
```

✅ Frontend is now running at `http://localhost:3000`

## 🎯 First Steps

### 1. Open the Application
Visit `http://localhost:3000` in your browser

### 2. Add Your First Employee
1. Click **"Employees"** in navigation
2. Click **"Add Employee"** button
3. Fill in details:
   ```
   Employee ID: EMP001
   Full Name: John Doe
   Email: john.doe@company.com
   Department: Engineering
   ```
4. Click **"Save Employee"**

### 3. Mark Attendance
1. Click **"Attendance"** in navigation
2. Click **"Mark Attendance"** button
3. Select employee, date, and status
4. Click **"Save Attendance"**

### 4. View Dashboard
1. Click **"Dashboard"** in navigation
2. See real-time statistics

## 🔍 Verify Installation

Check these URLs work:
- [ ] Frontend: http://localhost:3000
- [ ] Backend API: http://localhost:8000/api/employees/
- [ ] Admin Panel: http://localhost:8000/admin/

## 🐛 Common Issues & Solutions

### Issue: "python: command not found"

**Solution:**
```bash
# Try python3 instead
python3 -m venv venv
python3 manage.py runserver
```

### Issue: "pip: command not found"

**Solution:**
```bash
# Install pip
python -m ensurepip --upgrade
# Or use python3
python3 -m pip install -r requirements.txt
```

### Issue: Port already in use

**Solution:**
```bash
# Use different port
python manage.py runserver 8001
# Or
python -m http.server 3001
```

### Issue: CORS errors in browser

**Solution:**
1. Make sure backend is running
2. Check `frontend/js/config.js` has correct backend URL
3. Restart both servers

### Issue: "ModuleNotFoundError"

**Solution:**
```bash
# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Reinstall dependencies
pip install -r requirements.txt
```

## 📝 Project Structure Quick Reference

```
hrms-lite/
├── backend/              # Django backend
│   ├── manage.py        # Django management
│   ├── requirements.txt # Python dependencies
│   └── employees/       # Main app
└── frontend/            # HTML/CSS/JS frontend
    ├── index.html       # Main page
    ├── css/            
    └── js/             
```

## 🎓 Quick Tips

1. **Keep terminals open**: You need 2 terminals - one for backend, one for frontend
2. **Check logs**: If something breaks, check the terminal output
3. **Browser console**: Press F12 to see JavaScript errors
4. **Refresh**: If changes don't appear, hard refresh (Ctrl+Shift+R)

## 🔄 Stopping the Application

### Stop Backend:
Press `Ctrl + C` in backend terminal

### Stop Frontend:
Press `Ctrl + C` in frontend terminal

### Deactivate Virtual Environment:
```bash
deactivate
```

## 🚀 Next Steps

Once running locally:
1. Read the full [README.md](README.md)
2. Follow [DEPLOYMENT.md](DEPLOYMENT.md) to deploy online
3. Test all features thoroughly
4. Customize as needed

## 📚 Helpful Resources

- **Django Docs**: https://docs.djangoproject.com/
- **Django REST Framework**: https://www.django-rest-framework.org/
- **JavaScript MDN**: https://developer.mozilla.org/en-US/docs/Web/JavaScript

## 🆘 Need Help?

1. Check the error message carefully
2. Look in browser console (F12)
3. Check terminal output
4. Verify all prerequisites installed
5. Try restarting servers

## ✅ Success Checklist

After following this guide, you should have:
- [x] Backend running on port 8000
- [x] Frontend running on port 3000
- [x] Can add employees
- [x] Can mark attendance
- [x] Dashboard shows data
- [x] No console errors

**Congratulations! Your HRMS Lite is running! 🎉**

---

**Time to complete**: ~10 minutes  
**Difficulty**: Beginner-friendly  
**Support**: Check README.md for detailed documentation
