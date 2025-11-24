// steps/ContactInfo.tsx
import { useFormContext } from "react-hook-form";
import Input from "@/components/ui/form/Input";

export default function Other() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Other Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <Input
                    type="text"
                    name="other.previousSchool"
                    label="Previous School"
                />
            </div>
            <div>
                <Input
                    type="text"
                    name="other.previousClass"
                    label="Previous Class"
                />
            </div>
            <div className="md:col-span-2">
                <Input
                    type="textarea"
                    name="other.medicalConditions"
                    label="Medical Conditions"
                />
            </div>
            <div className="md:col-span-2">
                <Input
                    type="textarea"
                    name="other.allergies"
                    label="Allergies"
                    placeholder="List any allergies..."
                />
            </div>
        </div>
    </div>
  );
}
