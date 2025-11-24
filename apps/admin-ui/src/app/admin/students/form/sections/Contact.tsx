// steps/ContactInfo.tsx
import Input from "@/components/ui/form/Input";

export default function Contact() {
  return (
    <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <Input
                    type="email"
                    name="contact.email"
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
                    name="contact.phone"
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

            <div className="md:col-span-2">
                <Input
                    type="text"
                    name="contact.address"
                    label="Address"
                    validation={{ 
                        required: 'Address is required',
                        minLength: { value: 10, message: 'Address too short' }
                    }}
                />
            </div>

            <div>
                <Input
                    type="text"
                    name="contact.city"
                    label="City"
                    validation={{ 
                        required: 'City is required'
                    }}
                />
            </div>

            <div>
                <Input
                    type="text"
                    name="contact.state"
                    label="State"
                    validation={{ 
                        required: 'state is required'
                    }}
                />
            </div>

            <div>
                <Input
                    type="text"
                    name="contact.zipCode"
                    label="Zip Code"
                    validation={{ 
                        required: 'ZIP code is required',
                        pattern: {
                            value: /^[0-9]{5,6}$/,
                            message: 'Enter valid ZIP code'
                        }
                    }}
                />
            </div>
        </div>
        </div>
  );
}
