import Input from "@/components/ui/form/Input";
import SelectField from "@/components/ui/form/Select";

export default function General() {
  return (
    <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">General Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <Input
                    type="text"
                    name="general.firstName"
                    label="First Name"
                    validation={{ 
                        required: 'First name is required',
                        minLength: { value: 2, message: 'Minimum 2 characters' }
                    }}
                />
            </div>

            <div>
                <Input
                    type="text"
                    name="general.lastName"
                    label="Last Name"
                    validation={{ 
                        required: 'Last name is required',
                        minLength: { value: 2, message: 'Minimum 2 characters' }
                    }}
                />
            </div>

            <div>
                <SelectField
                    name="general.grade"
                    label="Grade"
                    options={[
                        { value: "GRADE_1", label: "Grade 1" },
                        { value: "GRADE_2", label: "Grade 2" },
                        { value: "GRADE_3", label: "Grade 3" },
                    ]}
                />
            </div>

            <div>
                <Input
                    type="date"
                    name="general.dateOfBirth"
                    label="Date of Birth"
                    validation={{ 
                        required: 'Date of birth is required',
                        minLength: { value: 2, message: 'Minimum 2 characters' }
                    }}
                />
            </div>

            <div>
                <SelectField
                    name="general.gender"
                    label="Gender"
                    options={[
                        {value: "male", label: "Male"},
                        {value: "female", label: "Female"},
                        {value: "other", label: "Other"}
                    ]}  
                />
            </div>
            <div>
                <SelectField
                    name="general.bloodGroup"
                    label="Blood Group"
                    options={[
                        {value: "A+", label: "A+"},
                        {value: "A-", label: "A-"},
                        {value: "B+", label: "B+"},
                        {value: "B-", label: "B-"},
                        {value: "AB+", label: "AB+"},
                        {value: "AB-", label: "AB-"},
                        {value: "O+", label: "O+"},
                        {value: "O-", label: "O-"}
                    ]}  
                />
            </div>
            <div>
                <Input
                    type="text"
                    name="general.studentId"
                    label="Student Id"
                    validation={{ 
                        required: 'Student ID is required',
                        pattern: {
                            value: /^[A-Z0-9]+$/,
                            message: 'Only uppercase letters and numbers allowed'
                        }
                    }}
                />
            </div>
        </div>
    </div>
  );
}
