function MainSlidebar(slidebar){
    return(
        <><div class="slidebar" id="dashboard-tab" onclick="changeContent('dashboard-tab')">
            <h6>{slidebar.name}</h6>
        </div><div class="slidebar" id="time-table-tab" onclick="changeContent('time-table-tab')">
                <h6>Time Table</h6>
            </div><div class="slidebar" id="student-info" onclick="changeContent('student-info')">
                <h6>Student information</h6>
            </div><div class="slidebar" id="attendance" onclick="changeContent('attendance')">
                <h6>Attendance</h6>
            </div><div class="slidebar" id="exam" onclick="changeContent('exam')">
                <h6>Exam</h6>
            </div><div class="slidebar" id="syllabus" onclick="changeContent('syllabus')">
                <h6>Syllabus</h6>
            </div><div class="slidebar" id="salary" onclick="changeContent('salary')">
                <h6>Salary</h6>
            </div><div class="slidebar" id="roster" onclick="changeContent('roster')">
                <h6>Roster</h6>
            </div><div class="slidebar" id="notice" onclick="changeContent('notice')">
                <h6>Notice</h6>
            </div></>
    );
}
export default MainSlidebar;