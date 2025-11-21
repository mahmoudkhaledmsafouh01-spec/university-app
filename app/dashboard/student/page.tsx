export default function StudentDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Student Dashboard</h1>

      <div className="grid grid-cols-2 gap-6">
        <a href="/dashboard/student/courses" className="card">
          <div className="p-6 bg-white rounded shadow">My Courses</div>
        </a>

        <a href="/dashboard/student/grades" className="card">
          <div className="p-6 bg-white rounded shadow">My Grades</div>
        </a>
      </div>
    </div>
  );
}
