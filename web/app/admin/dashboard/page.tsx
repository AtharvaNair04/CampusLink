"use client";

import { 
  TrendingUp, Users, AlertCircle, FileText, School, Activity, 
  ArrowUpRight, ArrowDownRight, Bell, CheckCircle, Clock
} from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    { 
      title: "Total Users", 
      value: "1,245", 
      change: "+12.5%",
      trend: "up",
      icon: Users,
      bgColor: "bg-[#F5E6D3]/50",
      textColor: "text-[#8B1538]"
    },
    { 
      title: "Active Alerts", 
      value: "12", 
      change: "-3.2%",
      trend: "down",
      icon: AlertCircle,
      bgColor: "bg-red-50",
      textColor: "text-red-600"
    },
    { 
      title: "Pending Documents", 
      value: "34", 
      change: "+8.1%",
      trend: "up",
      icon: FileText,
      bgColor: "bg-[#F5E6D3]/30",
      textColor: "text-[#B8941F]"
    },
    { 
      title: "Classrooms", 
      value: "18", 
      change: "+2.0%",
      trend: "up",
      icon: School,
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-600"
    },
  ];

  const recentActivity = [
    { 
      id: 1,
      icon: Bell,
      title: "3 new alerts posted today",
      time: "2 hours ago",
      color: "text-[#8B1538]",
      bgColor: "bg-[#F5E6D3]/50"
    },
    { 
      id: 2,
      icon: Users,
      title: "New teacher account created",
      time: "4 hours ago",
      color: "text-[#8B1538]",
      bgColor: "bg-[#F5E6D3]/50"
    },
    { 
      id: 3,
      icon: FileText,
      title: "4 documents pending approval",
      time: "5 hours ago",
      color: "text-[#D4AF37]",
      bgColor: "bg-[#F5E6D3]/30"
    },
    { 
      id: 4,
      icon: School,
      title: "Classroom A-102 scheduled for maintenance",
      time: "1 day ago",
      color: "text-emerald-600",
      bgColor: "bg-emerald-100"
    },
  ];

  const quickActions = [
    { title: "Create Alert", icon: Bell, color: "bg-gradient-to-br from-[#8B1538] to-[#A01842]" },
    { title: "Add User", icon: Users, color: "bg-gradient-to-br from-[#D4AF37] to-[#B8941F]" },
    { title: "Upload Document", icon: FileText, color: "bg-gradient-to-br from-amber-500 to-amber-600" },
    { title: "Manage Rooms", icon: School, color: "bg-gradient-to-br from-emerald-500 to-emerald-600" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#8B1538] to-[#A01842] bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-[#8B1538]/70 mt-2 flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Overview of campus activities
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all text-[#8B1538] font-medium border border-[#8B1538]/20">
            Export Report
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-[#8B1538] to-[#A01842] text-white rounded-lg shadow-md hover:shadow-lg transition-all font-medium">
            New Action
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const isPositive = stat.trend === "up";
          const TrendIcon = isPositive ? ArrowUpRight : ArrowDownRight;
          
          return (
            <div
              key={stat.title}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-[#8B1538]/10 group hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <Icon className={`w-6 h-6 ${stat.textColor}`} />
                </div>
                <div className={`flex items-center gap-1 text-sm font-semibold ${isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
                  <TrendIcon className="w-4 h-4" />
                  {stat.change}
                </div>
              </div>
              <p className="text-sm text-[#8B1538]/60 font-medium">{stat.title}</p>
              <h3 className="text-3xl font-bold text-[#8B1538] mt-1">{stat.value}</h3>
            </div>
          );
        })}
      </div>

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-[#8B1538]/10 overflow-hidden">
          <div className="p-6 border-b border-[#8B1538]/10 bg-gradient-to-r from-[#F5E6D3]/30 to-white">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#8B1538] flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#8B1538]" />
                Recent Activity
              </h2>
              <button className="text-sm text-[#8B1538] hover:text-[#A01842] font-medium">
                View All
              </button>
            </div>
          </div>
          <div className="p-6">
            <ul className="space-y-4">
              {recentActivity.map((activity) => {
                const Icon = activity.icon;
                return (
                  <li
                    key={activity.id}
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-[#F5E6D3]/20 transition-colors group cursor-pointer"
                  >
                    <div className={`p-2 rounded-lg ${activity.bgColor} group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-5 h-5 ${activity.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[#8B1538] font-medium group-hover:text-[#A01842] transition-colors">
                        {activity.title}
                      </p>
                      <p className="text-sm text-[#8B1538]/50 mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {activity.time}
                      </p>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-[#8B1538]/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-lg border border-[#8B1538]/10 overflow-hidden">
          <div className="p-6 border-b border-[#8B1538]/10 bg-gradient-to-r from-[#F5E6D3]/30 to-white">
            <h2 className="text-xl font-bold text-[#8B1538] flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#8B1538]" />
              Quick Actions
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.title}
                    className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-[#F5E6D3]/20 transition-all group text-left border border-[#8B1538]/10 hover:border-[#8B1538]/20 hover:shadow-md"
                  >
                    <div className={`p-3 rounded-lg ${action.color} text-white group-hover:scale-110 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-semibold text-[#8B1538]/80 group-hover:text-[#8B1538]">
                      {action.title}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-[#8B1538]/40 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg">All Systems Operational</h3>
              <p className="text-emerald-50 text-sm">Last checked: 2 minutes ago</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-medium transition-colors backdrop-blur-sm">
            View Status
          </button>
        </div>
      </div>
    </div>
  );
}