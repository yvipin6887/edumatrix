import { BookOpen, Clock, DollarSign, GraduationCap, LucideIcon, TrendingUp, UserCheck, Users } from "lucide-react";

interface StatCard {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: LucideIcon;
  color: string;
  lightColor: string;
  textColor: string;
}

interface Student {
  name: string;
  class: string;
  status: 'Active' | 'Pending' | 'Inactive';
  id: string;
  avatar: string;
}

interface ClassSchedule {
  subject: string;
  teacher: string;
  class: string;
  time: string;
  room: string;
  status: 'ongoing' | 'upcoming' | 'completed';
}

interface Announcement {
  title: string;
  date: string;
  type: string;
  priority: 'high' | 'medium' | 'low';
}

export default function Dashboard() {

  const stats: StatCard[] = [
    { 
      label: 'Total Students', 
      value: '2,543', 
      change: '+12%', 
      trend: 'up',
      icon: GraduationCap, 
      color: 'from-blue-500 to-blue-600',
      lightColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    { 
      label: 'Total Teachers', 
      value: '142', 
      change: '+3%', 
      trend: 'up',
      icon: Users, 
      color: 'from-green-500 to-green-600',
      lightColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    { 
      label: 'Attendance Rate', 
      value: '94.5%', 
      change: '+2.1%', 
      trend: 'up',
      icon: UserCheck, 
      color: 'from-purple-500 to-purple-600',
      lightColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    { 
      label: 'Fee Collection', 
      value: '$124K', 
      change: '+18%', 
      trend: 'up',
      icon: DollarSign, 
      color: 'from-amber-500 to-amber-600',
      lightColor: 'bg-amber-50',
      textColor: 'text-amber-600'
    },
  ];

  const recentStudents: Student[] = [
    { name: 'Emma Wilson', class: 'Grade 10-A', status: 'Active', id: 'ST-2543', avatar: 'EW' },
    { name: 'James Smith', class: 'Grade 9-B', status: 'Active', id: 'ST-2542', avatar: 'JS' },
    { name: 'Sophia Brown', class: 'Grade 11-A', status: 'Pending', id: 'ST-2541', avatar: 'SB' },
    { name: 'Oliver Davis', class: 'Grade 8-C', status: 'Active', id: 'ST-2540', avatar: 'OD' },
    { name: 'Ava Martinez', class: 'Grade 12-A', status: 'Active', id: 'ST-2539', avatar: 'AM' },
  ];

  const upcomingClasses: ClassSchedule[] = [
    { subject: 'Mathematics', teacher: 'Dr. Johnson', class: 'Grade 10-A', time: '09:00 AM', room: 'Room 201', status: 'ongoing' },
    { subject: 'Physics', teacher: 'Prof. Smith', class: 'Grade 11-B', time: '10:30 AM', room: 'Lab 1', status: 'upcoming' },
    { subject: 'English', teacher: 'Ms. Anderson', class: 'Grade 9-A', time: '11:00 AM', room: 'Room 105', status: 'upcoming' },
    { subject: 'Chemistry', teacher: 'Dr. Williams', class: 'Grade 12-A', time: '01:00 PM', room: 'Lab 2', status: 'upcoming' },
  ];

  const announcements: Announcement[] = [
    { title: 'Annual Sports Day', date: 'November 15, 2025', type: 'Event', priority: 'high' },
    { title: 'Parent-Teacher Meeting', date: 'November 12, 2025', type: 'Meeting', priority: 'medium' },
    { title: 'Mid-term Holidays', date: 'Nov 25-30, 2025', type: 'Holiday', priority: 'low' },
  ];

  return (
    <div>
      <div className="p-6">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Dashboard Overview</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className={`${stat.lightColor} p-3 rounded-lg`}>
                    <Icon className={stat.textColor} size={24} />
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp size={16} className="text-green-600" />
                    <span className="text-sm font-semibold text-green-600">{stat.change}</span>
                  </div>
                </div>
                <h3 className="text-gray-600 text-sm mb-1">{stat.label}</h3>
                <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Recent Students */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Recent Students</h2>
                <p className="text-sm text-gray-500 mt-1">Latest student registrations</p>
              </div>
              <button className="text-sm text-indigo-600 font-medium hover:text-indigo-700">View All</button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentStudents.map((student, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {student.avatar}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{student.name}</h3>
                        <p className="text-sm text-gray-500">{student.class} • {student.id}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      student.status === 'Active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {student.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Announcements */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Announcements</h2>
              <p className="text-sm text-gray-500 mt-1">Important updates</p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {announcements.map((item, index) => (
                  <div key={index} className="p-4 border-l-4 border-indigo-500 bg-indigo-50 rounded-r-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-800 text-sm">{item.title}</h3>
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                        item.priority === 'high' ? 'bg-red-100 text-red-700' :
                        item.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {item.type}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">{item.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Today's Classes */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Today's Class Schedule</h2>
              <p className="text-sm text-gray-500 mt-1">Upcoming classes for today</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock size={16} />
              <span>Saturday, November 08, 2025</span>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {upcomingClasses.map((cls, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-sm transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`px-2 py-1 text-xs font-medium rounded ${
                      cls.status === 'ongoing' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {cls.status === 'ongoing' ? 'Ongoing' : cls.time}
                    </div>
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <BookOpen size={16} className="text-gray-600" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1">{cls.subject}</h3>
                  <p className="text-sm text-gray-600 mb-2">{cls.teacher}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{cls.class}</span>
                    <span>{cls.room}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
