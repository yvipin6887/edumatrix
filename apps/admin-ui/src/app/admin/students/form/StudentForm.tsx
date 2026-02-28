"use client";

import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import General from './sections/General';
import Contact from './sections/Contact';
import Parent from './sections/Parent';
import Other from './sections/Other';

export const StudentForm = () => {
    const [activeSection, setActiveSection] = useState('general');
    const methods = useForm({
        mode: 'onBlur',
        reValidateMode: "onChange",
        defaultValues: {
        // General Information
            general: {
                firstName: '',
                lastName: '',
                dateOfBirth: '',
                gender: '',
                bloodGroup: '',
                studentId: '',
            },

            // Contact Information
            contact: {
                email: '',
                phone: '',
                address: '',
                city: '',
                state: '',
                zipCode: '',
            },
            
            
            // Parent Information
            parent: {
                father: {
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    occupation: '',
                },

                mother: {
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    occupation: '',
                },
            },

            // Other Information
            other: {
                previousSchool: '',
                gradeLevel: '',
                medicalConditions: '',
                allergies: '',
                emergencyContact: '',
                emergencyPhone: ''
            }
        }
    });

    const onSubmit = (data: any) => {
        console.log('Form submitted:', data);
        alert('Student registration submitted successfully!');
    };

    const onError = (errors: any) => {
    console.log("Validation Errors:", errors);
    };

    const sections = [
        { id: 'general', label: 'General' },
        { id: 'contact', label: 'Contact' },
        { id: 'parent', label: 'Parent' },
        { id: 'other', label: 'Other' }
    ];
    
    return (
        <div>
            <nav className="flex overflow-x-auto border-b border-gray-200 px-8 gap-6 text-center">
                {sections.map((section) => (
                    <button
                        type='button'
                        onClick={() => setActiveSection(section.id)}
                        key={section.id}
                        className={`px-1 py-4 text-sm font-medium whitespace-nowrap transition-colors  ${
                    activeSection === section.id
                      ? 'border-b-2 border-blue-600 text-blue-600 bg-white'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                  }`}
                    >{section.label}</button>
                ))}
            </nav>

        {/* Form */}
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit, onError)} className="px-8 py-1">
                {/* General Information */}
                {activeSection === 'general' && <General />}

                {/* Contact Information */}
                {activeSection === 'contact' && (
                    <Contact />
                )}

                {/* Parent Information */}
                {activeSection === 'parent' && (
                    <Parent/>
                )}

                {/* Other Information */}
                {activeSection === 'other' && (
                    <Other/>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                <button
                    type="button"
                    onClick={() => {
                    const currentIndex = sections.findIndex(s => s.id === activeSection);
                    if (currentIndex > 0) {
                        setActiveSection(sections[currentIndex - 1].id);
                    }
                    }}
                    disabled={activeSection === 'general'}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    Previous
                </button>

                <div className="flex gap-4">
                    {activeSection !== 'other' ? (
                    <button
                        type="button"
                        onClick={() => {
                        const currentIndex = sections.findIndex(s => s.id === activeSection);
                        if (currentIndex < sections.length - 1) {
                            setActiveSection(sections[currentIndex + 1].id);
                        }
                        }}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Next
                    </button>
                    ) : (
                    <button
                        type="submit"
                        className="px-8 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-colors font-medium"
                    >
                        Submit
                    </button>
                    )}
                </div>
                </div>
            </form>
          </FormProvider>
        </div>
    )
};