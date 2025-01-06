src/
├── assets/
│   ├── images/
│   │   ├── logo.png
│   │   └── avatars/
│   └── icons/
│
├── components/
│   ├── base/
│   │   ├── Button/
│   │   │   ├── index.js
│   │   │   ├── Button.jsx
│   │   │   └── Button.css
│   │   ├── Input/
│   │   ├── Select/
│   │   └── Typography/
│   │
│   ├── common/
│   │   ├── Alert/
│   │   ├── Breadcrumbs/
│   │   ├── DataTable/
│   │   ├── Dropdown/
│   │   ├── FileUpload/
│   │   ├── Modal/
│   │   └── PasswordStrength/
│   │
│   └── features/
│       ├── Auth/
│       │   ├── LoginForm/
│       │   └── RegisterForm/
│       │
│       ├── Admin/
│       │   ├── Dashboard/
│       │   │   ├── AnalyticsChart/
│       │   │   └── QuickActions/
│       │   ├── UserManagement/
│       │   └── Settings/
│       │
│       ├── Teacher/
│       │   ├── CourseManagement/
│       │   ├── GradeBook/
│       │   └── Attendance/
│       │
│       └── Student/
│           ├── CourseEnrollment/
│           ├── Assignments/
│           └── Grades/
│
├── layouts/
│   ├── AdminLayout/
│   │   ├── index.js
│   │   ├── AdminLayout.jsx
│   │   └── AdminLayout.css
│   ├── TeacherLayout/
│   ├── StudentLayout/
│   └── shared/
│       ├── Header/
│       ├── Sidebar/
│       └── Footer/
│
├── pages/
│   ├── public/
│   │   ├── Home/
│   │   ├── About/
│   │   └── Contact/
│   │
│   ├── auth/
│   │   ├── Login/
│   │   ├── Register/
│   │   └── ForgotPassword/
│   │
│   ├── admin/
│   │   ├── Dashboard/
│   │   ├── Users/
│   │   │   ├── TeacherManagement/
│   │   │   └── StudentManagement/
│   │   ├── Courses/
│   │   └── Settings/
│   │
│   ├── teacher/
│   │   ├── Dashboard/
│   │   ├── Courses/
│   │   │   ├── CourseList/
│   │   │   └── CourseDetails/
│   │   ├── Students/
│   │   └── Grades/
│   │
│   └── student/
│       ├── Dashboard/
│       ├── Courses/
│       ├── Assignments/
│       └── Profile/
│
├── services/
│   ├── api/
│   │   ├── auth.service.js
│   │   ├── admin.service.js
│   │   ├── teacher.service.js
│   │   └── student.service.js
│   └── utils/
│       ├── validation.js
│       └── formatting.js
│
├── hooks/
│   ├── useAuth.js
│   ├── useForm.js
│   ├── useToast.js
│   └── useLocalStorage.js
│
├── context/
│   ├── AuthContext.js
│   ├── ThemeContext.js
│   └── LoadingContext.js
│
├── styles/
│   ├── global/
│   │   ├── reset.css
│   │   └── typography.css
│   ├── themes/
│   │   ├── light.css
│   │   └── dark.css
│   ├── variables.css
│   └── utils.css
│
├── utils/
│   ├── constants.js
│   ├── helpers.js
│   └── validators.js
│
├── routes/
│   ├── AdminRoutes.js
│   ├── TeacherRoutes.js
│   ├── StudentRoutes.js
│   └── PublicRoutes.js
│
├── App.jsx
└── index.js