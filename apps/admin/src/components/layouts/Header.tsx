"use client";

import React, { useState } from 'react';
import { Settings, Bell, Search, ChevronDown,
  LogOut, User 
} from 'lucide-react';

const Header: React.FC = () => {
    const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [showUserMenu, setShowUserMenu] = useState<boolean>(false);

  const notifications: Notification[] = [
    { id: 1, title: 'New admission request from Sarah Johnson', time: '5 mins ago', unread: true },
    { id: 2, title: 'Fee payment received - Grade 10-A', time: '15 mins ago', unread: true },
    { id: 3, title: 'Mid-term exam results published', time: '1 hour ago', unread: false },
    { id: 4, title: 'Teacher leave request pending approval', time: '2 hours ago', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

    return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-6 py-4 gap-2">
        {/* Search Bar */}
        <div className="flex items-center gap-4 flex-1 max-w-2xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search students, teachers, classes..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50"
            />
          </div>
        </div>
        
        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          {/* Quick Stats */}
          <div className="hidden lg:flex items-center gap-4 mr-4 pr-4 border-r border-gray-200">
            <div className="text-right">
              <div className="text-xs text-gray-500">Today's Attendance</div>
              <div className="text-sm font-semibold text-gray-800">94.5%</div>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-500">Active Classes</div>
              <div className="text-sm font-semibold text-gray-800">12/48</div>
            </div>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2.5 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Bell size={20} className="text-gray-600" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-semibold">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-800">Notifications</h3>
                    <span className="text-xs text-indigo-600 font-medium cursor-pointer">Mark all as read</span>
                  </div>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div 
                      key={notif.id} 
                      className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                        notif.unread ? 'bg-indigo-50/30' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {notif.unread && <div className="w-2 h-2 bg-indigo-600 rounded-full mt-1.5"></div>}
                        <div className="flex-1">
                          <p className="text-sm text-gray-800">{notif.title}</p>
                          <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 text-center border-t border-gray-200">
                  <button className="text-sm text-indigo-600 font-medium hover:text-indigo-700">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="relative">
            <button 
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-3 pl-3 pr-2 py-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="w-9 h-9 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                AD
              </div>
              <div className="text-left hidden md:block">
                <div className="text-sm font-semibold text-gray-800">Admin User</div>
                <div className="text-xs text-gray-500">admin@school.com</div>
              </div>
              <ChevronDown size={16} className="text-gray-500" />
            </button>

            {/* User Menu Dropdown */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-2">
                  <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg text-left">
                    <User size={16} className="text-gray-600" />
                    <span className="text-sm text-gray-700">My Profile</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg text-left">
                    <Settings size={16} className="text-gray-600" />
                    <span className="text-sm text-gray-700">Settings</span>
                  </button>
                  <div className="my-1 border-t border-gray-200"></div>
                  <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-red-50 rounded-lg text-left">
                    <LogOut size={16} className="text-red-600" />
                    <span className="text-sm text-red-600">Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
    );
}

export default Header;