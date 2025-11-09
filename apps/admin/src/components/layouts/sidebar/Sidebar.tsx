"use client";

import React from 'react';
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { LucideIcon, Home, GraduationCap, Users, BookOpen, UserCheck, ClipboardList, DollarSign, Calendar, BarChart3, Settings, Menu, X } from 'lucide-react';
import { useSidebarContext } from "./sidebar-context";

interface MenuItem {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: string;
  route: string;
}

const Sidebar: React.FC = () => {
    const pathname = usePathname();
    const { isOpen, toggleSidebar } = useSidebarContext();
    const menuItems: MenuItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, route: '/admin/dashboard' },
    { id: 'students', label: 'Students', icon: GraduationCap, badge: '2,543', route: '/admin/students' },
    { id: 'teachers', label: 'Teachers', icon: Users, badge: '142', route: '/admin/teachers' },
    { id: 'classes', label: 'Classes & Subjects', icon: BookOpen, route: '/admin/classes' },
    { id: 'attendance', label: 'Attendance', icon: UserCheck, route: '/admin/attendance' },
    { id: 'exams', label: 'Exams & Grades', icon: ClipboardList, route: '/admin/exams' },
    { id: 'fees', label: 'Fee Management', icon: DollarSign, badge: 'New', route: '/admin/fees' },
    { id: 'timetable', label: 'Time Table', icon: Calendar, route: '/admin/timetable' },
    { id: 'reports', label: 'Reports & Analytics', icon: BarChart3, route: '/admin/reports' },
    { id: 'settings', label: 'Settings', icon: Settings, route: '/admin/settings' },
    ];

    return (
        <aside
            className={`w-74 bg-white border-r border-gray-200 flex flex-col transition-all duration-300 shadow-sm`}
        >
            {/* Logo Section */}
            <div className="h-16 flex items-center justify-between px-5 border-b border-gray-200">
                {isOpen && (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-lg flex items-center justify-center">
                    <GraduationCap className="text-white" size={24} />
                    </div>
                    <div>
                    <h1 className="text-lg font-bold text-gray-800">SchoolERP</h1>
                    <p className="text-xs text-gray-500">Admin Portal</p>
                    </div>
                </div>
                )}
                <button 
                onClick={toggleSidebar} 
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                {isOpen ? <X size={20} className="text-gray-600" /> : <Menu size={20} className="text-gray-600" />}
                </button>
            </div>
            
            {/* Navigation Menu */}
            <nav className="flex-1 overflow-y-auto py-4 px-3">
                <div className="space-y-1">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.route;

                    return (
                    <Link
                        key={item.id}
                        href={item.route}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        isActive
                            ? 'bg-indigo-50 text-indigo-700 font-medium shadow-sm'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                    >
                        <Icon size={20} className={isActive ? 'text-indigo-600' : ''} />
                        {isOpen && (
                        <>
                            <span className="flex-1 text-left text-sm">{item.label}</span>
                            {item.badge && (
                            <span
                                className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                                item.badge === 'New'
                                    ? 'bg-red-100 text-red-600'
                                    : 'bg-gray-100 text-gray-600'
                                }`}
                            >
                                {item.badge}
                            </span>
                            )}
                        </>
                        )}
                    </Link>
                    );
                })}
                </div>
            </nav>
        </aside>
    );
}

export default Sidebar;