import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import AddMemberForm from './AddMemberForm';

/**
 * AddMemberModal Component - Displays a modal dialog for adding new members to a project
 * @returns {JSX.Element} A modal containing a form to search and add team members by email
 */
export default function AddMemberModal() {
    // Get current location and navigation function
    const location = useLocation()
    const navigate = useNavigate()

    // Check if modal should be shown based on URL query parameter
    const queryParams = new URLSearchParams(location.search);
    const addMember = queryParams.get('addMember');
    const show = addMember ? true : false

    return (
        <>
            {/* Modal transition wrapper */}
            <Transition appear show={show} as={Fragment}>
                {/* Dialog component with close handler that resets URL */}
                <Dialog 
                    as="div" 
                    className="relative z-10" 
                    onClose={() => navigate(location.pathname, { replace: true })}
                >
                    {/* Backdrop transition */}
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"  // Fade-in animation
                        enterFrom="opacity-0"         // Start state
                        enterTo="opacity-100"         // End state
                        leave="ease-in duration-200"  // Fade-out animation
                        leaveFrom="opacity-100"       // Start state
                        leaveTo="opacity-0"           // End state
                    >
                        {/* Semi-transparent black backdrop */}
                        <div className="fixed inset-0 bg-black/60" />
                    </Transition.Child>

                    {/* Modal content container */}
                    <div className="fixed inset-0 overflow-y-auto">
                        {/* Centered container */}
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            {/* Panel transition animation */}
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"      // Scale-in animation
                                enterFrom="opacity-0 scale-95"    // Start state
                                enterTo="opacity-100 scale-100"   // End state
                                leave="ease-in duration-200"      // Scale-out animation
                                leaveFrom="opacity-100 scale-100" // Start state
                                leaveTo="opacity-0 scale-95"      // End state
                            >
                                {/* Modal panel with content */}
                                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                                    {/* Modal title */}
                                    <Dialog.Title
                                        as="h3"
                                        className="font-black text-4xl my-5"
                                    >
                                        Agregar Integrante al equipo
                                    </Dialog.Title>
                                    
                                    {/* Modal subtitle with instructions */}
                                    <p className="text-xl font-bold">
                                        Busca el nuevo integrante por email {''}
                                        <span className="text-fuchsia-600">
                                            para agregarlo al proyecto
                                        </span>
                                    </p>
                                    
                                    {/* Form component for adding members */}
                                    <AddMemberForm />
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}