import Link from 'next/link';
import StudentDataGrid  from './datagrid/StudentDataGrid';
import {Button} from '@/components/ui/Button'

export default function StudentsPage() {



  return (
    <div>
      <div className='flex justify-between px-2 py-1'>
        <h1 className="text-xl font-semibold mb-3">All Students</h1>
        <div>
          <Button>
            <Link
              href='/admin/students/create'
              className={``}
            >
              Add Student
            </Link>
          </Button>
      </div>
      </div>
      
      {/* You can later render your datagrid or list component here */}
      <StudentDataGrid />
    </div>
  );
}
