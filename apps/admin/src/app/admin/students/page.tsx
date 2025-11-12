import StudentDataGrid  from './datagrid/StudentDataGrid';

export default function StudentsPage() {



  return (
    <div>
      <h1 className="text-xl font-semibold mb-3">All Students</h1>
      <p className="text-gray-600">List of all registered students appears here.</p>
      {/* You can later render your datagrid or list component here */}
      <StudentDataGrid />
    </div>
  );
}
