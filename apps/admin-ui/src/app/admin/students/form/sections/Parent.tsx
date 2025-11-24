import Input from "@/components/ui/form/Input";

export default function Parent() {

  return (
    <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full">
                <h2 className="text-xl font-semibold text-gray-800">Father Information</h2>
                <div className="grid grid-cols-1 gap-2">
                    <div>
                        <Input
                            type="text"
                            name="parent.father.firstName"
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
                            name="parent.father.lastName"
                            label="Last Name"
                            validation={{ 
                                required: 'Last name is required',
                                minLength: { value: 2, message: 'Minimum 2 characters' }
                            }}
                        />
                    </div>
                    <div>
                    <Input
                        type="email"
                        name="parent.father.email"
                        label="Email"
                        validation={{ 
                            required: 'Email is required',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Invalid email address'
                            }
                        }}
                    />
                </div>
                <div>
                    <Input
                        type="tel"
                        name="parent.father.phone"
                        label="Phone"
                        validation={{ 
                            required: 'Phone number is required',
                            pattern: {
                                value: /^[0-9]{10}$/,
                                message: 'Enter valid 10-digit phone number'
                            }
                        }}
                    />
                </div>
                </div>
            </div>
            <div className="w-full">
                <h2 className="text-xl font-semibold text-gray-800">Mother Information</h2>
                <div className="grid grid-cols-1 gap-2">
                <div>
                    <Input
                        type="text"
                        name="parent.mother.firstName"
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
                        name="parent.mother.lastName"
                        label="Last Name"
                        validation={{ 
                            required: 'Last name is required',
                            minLength: { value: 2, message: 'Minimum 2 characters' }
                        }}
                    />
                </div>
                <div>
                    <Input
                        type="email"
                        name="parent.mother.email"
                        label="Email"
                        validation={{ 
                            required: 'Email is required',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Invalid email address'
                            }
                        }}
                    />
                </div>
                <div>
                    <Input
                        type="tel"
                        name="parent.mother.phone"
                        label="Phone"
                        validation={{ 
                            required: 'Phone number is required',
                            pattern: {
                                value: /^[0-9]{10}$/,
                                message: 'Enter valid 10-digit phone number'
                            }
                        }}
                    />
                </div>
            </div>  
            </div>
        </div>
    </div>
  );
}
