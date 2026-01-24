'use client';

import React from 'react';
import { Phone, Mail, Building, Landmark } from 'lucide-react';
import Header from '@/components/sections/Header';

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-white text-slate-900 selection:bg-rose-100 selection:text-rose-600 pt-16 overflow-x-hidden">
            <Header />
            {/* Subtle Background Glows */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-50/50 rounded-full blur-[120px] -mr-64 -mt-64" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-rose-50/30 rounded-full blur-[120px] -ml-64 -mb-64" />
            </div>

            <div className="relative max-w-7xl mx-auto px-8 py-16 lg:py-24">
                {/* Main Header */}
                <header className="text-center mb-12 md:mb-24 animate-in fade-in slide-in-from-top-8 duration-1000">
                    <h1 className="text-5xl lg:text-8xl dongle-regular tracking-tight text-slate-900 px-4">
                        Contact Us
                    </h1>
                    <div className="h-0.5 -mt-2 md:h-1.5 w-24 bg-rose-600 mx-auto rounded-full" />
                </header>

                {/* Content Container: Two columns with vertical divider */}
                <div className="flex flex-col-reverse lg:flex-row items-start justify-between gap-12 lg:gap-0">

                    {/* Left Column: Information */}
                    <section className="flex-1 lg:pr-20 space-y-12 animate-in fade-in slide-in-from-left-8 duration-1000 delay-200 fill-mode-both">
                        <div className="space-y-8">
                            <h2 className="text-5xl dongle-regular text-slate-900 leading-tight">
                                We&apos;re Here for You!
                            </h2>
                            <p className="text-slate-600 leading-tight dongle-regular text-3xl">
                                Thank you for reaching out! We appreciate your interest and are
                                committed to providing exceptional service. Whether you have a
                                question, need assistance, or are exploring a potential partnership,
                                our team is here to help. If you&apos;re interested in a demo or pricing
                                details, we&apos;d be happy to guide you through the process.
                            </p>
                        </div>

                        <div className="flex flex-col gap-8">
                            <ContactItem
                                icon={<Phone className="w-5 h-5 text-rose-600" />}
                                text="+91 9818981438"
                                href="tel:+919818981438"
                            />
                            {/* <ContactItem
                                icon={<Building className="w-5 h-5 text-rose-600" />}
                                text="+0120 6053168"
                                href="tel:+01206053168"
                            /> */}
                            <ContactItem
                                icon={<Mail className="w-5 h-5 text-rose-600" />}
                                text="sileenafoods@gmail.com"
                                href="mailto:sileenafoods@gmail.com"
                            />
                        </div>
                    </section>

                    {/* Vertical Divider */}
                    <div className="hidden lg:block w-px bg-slate-200 self-stretch my-4" />

                    {/* Horizontal Divider for Mobile */}
                    <div className="lg:hidden w-full h-px bg-slate-200" />

                    {/* Right Column: Form */}
                    <section className="flex-1 mx-auto lg:pl-20 space-y-12 animate-in fade-in slide-in-from-right-8 duration-1000 delay-400 fill-mode-both">
                        <h3 className="text-4xl dongle-regular text-slate-900 h-auto lg:h-[40px] flex items-center">
                            You&apos;ve got questions. We&apos;ve got answers.
                        </h3>

                        <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                            <FormInput label="Name" placeholder="Enter name" type="text" id="name" />
                            <FormInput label="Email" placeholder="Enter email" type="email" id="email" />
                            <FormInput label="Subject" placeholder="Enter subject" type="text" id="subject" />
                            <FormInput label="Phone" placeholder="Enter phone" type="tel" id="id-phone" />

                            <div className="md:col-span-2 group">
                                <label htmlFor="id-message" className="block text-4xl dongle-regular text-slate-700 mb-2 transition-colors group-focus-within:text-rose-600">
                                    Message
                                </label>
                                <textarea
                                    id="id-message"
                                    placeholder="Your message"
                                    className="w-full min-h-[160px] p-4 rounded-xl border-2 border-slate-100 bg-slate-50/30 focus:bg-white focus:border-rose-500 transition-all outline-none resize-none placeholder:text-slate-400 dongle-regular text-3xl"
                                />
                            </div>

                            <div className="md:col-span-2 flex justify-center md:pt-4">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-rose-600 text-white text-2xl dongle-regular rounded-full hover:bg-rose-700 hover:-translate-y-1 active:scale-95 transition-all duration-300 shadow-xl shadow-rose-600/20 active:shadow-inner"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </section>

                </div>
            </div>
        </main>
    );
}

function ContactItem({ icon, text, href }) {
    return (
        <a href={href} className="group flex items-center gap-5 text-slate-700 hover:text-rose-600  transition-all w-fit">
            <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-rose-50 group-hover:bg-rose-600 group-hover:text-white transition-all duration-300">
                {icon}
            </div>
            <span className="dongle-regular text-3xl">{text}</span>
        </a>
    );
}

function FormInput({ label, placeholder, type, id }) {
    return (
        <div className="group space-y-2">
            <label htmlFor={id} className="block text-3xl dongle-regular text-slate-700 mb-1 transition-colors group-focus-within:text-rose-600">
                {label}
            </label>
            <input
                type={type}
                id={id}
                placeholder={placeholder}
                className="w-full px-4 py-3 text-2xl rounded-xl border-2 border-slate-100 bg-slate-50/30 focus:bg-white focus:border-rose-500 transition-all outline-none placeholder:text-slate-400 dongle-regular"
            />
        </div>
    );
}