import { Dialog, Transition } from '@headlessui/react'

import { FaRegWindowClose } from 'react-icons/fa';
import { Fragment } from 'react';

interface DrawerProps {
    open: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

function Drawer({ open, onClose, title, children }: DrawerProps): JSX.Element {
    return (
        <Transition.Root as={Fragment} show={open}>
            <Dialog as="div" className="relative z-10" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>
                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500"
                                enterFrom="translate-y-full sm:translate-y-0 sm:translate-x-full"
                                enterTo="translate-y-0 sm:translate-x-0"
                                leave="transform transition ease-in-out duration-500"
                                leaveFrom="translate-y-0 sm:translate-x-0"
                                leaveTo="translate-y-full sm:translate-y-0 sm:translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                                    <div className="flex h-full flex-col bg-white shadow-xl">
                                        <div className="w-full flex justify-between px-4 py-6 sm:px-6">
                                            <Dialog.Title className="text-lg font-medium text-gray-900">
                                                {title}
                                            </Dialog.Title>
                                            <button
                                                className="rounded-md text-gray-300 hover:text-cyan-700 focus:outline-none focus:ring-2 focus:ring-white"
                                                onClick={onClose}
                                                type="button"
                                            >
                                                <span className="sr-only">Close panel</span>
                                                <FaRegWindowClose aria-hidden="true" className="h-8 w-8" />
                                            </button>
                                        </div>
                                        <div className="relative mt-4 flex-1 px-4 sm:px-6">
                                            <div className="absolute inset-0">
                                                <div aria-hidden="true" className="h-full border-gray-200">
                                                    {children}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default Drawer;