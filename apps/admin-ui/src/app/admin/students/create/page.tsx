import { StudentForm } from "../form/StudentForm"

export default function CreateStudent() {
    return (
        <div className="min-h-screen border border-gray-300 rounded-md p-4 bg-white shadow-sm px-4">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white overflow-hidden">
                    {/* Header */}
                    {/* <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
                        <h1 className="text-3xl font-bold text-white">Student</h1>
                    </div> */}
                    <StudentForm />
                </div>
            </div>
        </div>
    )
}