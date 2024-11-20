import Registration from './student/StudentAdmin';
import StudentAdmissionForm from './student/StudentAddmission';
import TeacherRegistrationForm from './teacher/TeacherRegistrationFrom';
import TeacherManagement from './teacher/Hire';
import SalarySection from './teacher/TeacherSalary';
import TeacherAttendance from './teacher/TeacherAttendance';
import DashboardHome from './DashboardHome';
import AdminProfile from './AdminProfile';
import AdminAccount from './AdminAccount';

export const componentMap = {
    AdmissionRegistration: Registration,
    AddmissionForm: StudentAdmissionForm,
    TeacherRegistration: TeacherManagement,
    HireTeacher: TeacherRegistrationForm,
    TeacherSalary: SalarySection,
    AttendanceRoster: TeacherAttendance,
    AdminProfile: AdminProfile,
    AdminAccount: AdminAccount,
};
