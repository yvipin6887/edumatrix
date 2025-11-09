'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const studentTabs = [
  { label: 'Students', route: '/admin/students' },
  { label: 'New Student', route: '/admin/students/new-student' },
  { label: 'Promotions', route: '/admin/students/promotions' },
];

export default function StudentsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex gap-6 p-2">
      <aside className="w-48 bg-white bg-white border-r border-gray-200 shadow-sm rounded-md">
        <p className="px-4 py-3 font-semibold text-gray-800 border-b border-gray-200">Student Navigation</p>
        <nav className="flex flex-col overflow-y-auto py-4 px-3 space-y-1">
          {studentTabs.map((tab) => {
            const isActive = pathname === tab.route;
            return (
              <Link
                key={tab.route}
                href={tab.route}
                className={`px-4 py-2 text-sm rounded-md ${
                  isActive ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <section className="flex-1">{children}</section>
    </div>
  );
}
