interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "Active" | "Inactive" | "Pending";
  course: string;
  department: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  enrollmentDate: string;
  grade: string;
  city: string;
  country: string;
  guardianName: string;
  attendancePercentage: number;
}