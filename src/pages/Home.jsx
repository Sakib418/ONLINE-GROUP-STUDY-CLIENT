import React, { useState } from 'react';
import Banner from './Banner';

const Home = () => {
    // Accordion and AccordionItem component definitions moved inside the Home component
    const Accordion = ({ children }) => (
        <div className="space-y-4">{children}</div>
    );

    const AccordionItem = ({ question, answer }) => {
        const [isOpen, setIsOpen] = useState(false);
        return (
            <div className="border border-gray-300 rounded-md p-4 shadow-sm">
                <button
                    className="w-full text-left font-medium focus:outline-none text-primary hover:text-primary-focus"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {question}
                </button>
                {isOpen && <p className="mt-2 text-gray-600">{answer}</p>}
            </div>
        );
    };

    // Card component definition
    const Card = ({ title, description, colorClass }) => (
        <div className={`shadow-lg p-4 rounded-lg border ${colorClass} bg-white hover:bg-opacity-70`}>
            <h3 className="text-xl font-medium mb-2 text-primary">{title}</h3>
            <p className="text-gray-700">{description}</p>
        </div>
    );

    return (
        <div className='bg-white dark:bg-gray-900 text-black dark:text-white'>
            <Banner />

        {/* Feature Section */}
<section className="py-12 bg-gradient-to-r from-primary to-accent rounded-lg text-white">
    <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-semibold mb-8 text-white dark:text-gray-200">
            Our Features
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
            <Card
                title="Create Assignments"
                description="Design and distribute assignments to your study group effortlessly."
                colorClass="border-blue-500 hover:bg-blue-100 dark:border-blue-400 dark:hover:bg-blue-800"
            />
            <Card
                title="Submit Assignments"
                description="Submit your assignments quickly and stay organized in one place."
                colorClass="border-purple-500 hover:bg-purple-100 dark:border-purple-400 dark:hover:bg-purple-800"
            />
            <Card
                title="View Submitted Assignments"
                description="Access and review all your submitted assignments anytime, anywhere."
                colorClass="border-pink-500 hover:bg-pink-100 dark:border-pink-400 dark:hover:bg-pink-800"
            />
        </div>
    </div>
</section>

{/* FAQ Section */}
<section className="py-12 bg-base-200 dark:bg-gray-800">
    <div className="container mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center mb-10 text-primary dark:text-gray-100">
            Frequently Asked Questions
        </h2>

        <Accordion className="space-y-4">
    <AccordionItem
        question="How do I create an assignment?"
        answer="Simply log in to your account, navigate to the 'Create Assignment' section, and fill out the required details."
        className="bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-md p-4 hover:bg-gray-100 dark:hover:bg-gray-700"
    />
    <AccordionItem
        question="Can I edit an assignment after submission?"
        answer="Currently, assignments can be edited after submission. However, you can resubmit with updated details if necessary."
        className="bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-md p-4 hover:bg-gray-100 dark:hover:bg-gray-700"
    />
    <AccordionItem
        question="Where can I view my submitted assignments?"
        answer="Go to the 'My Submissions' section in your dashboard to see all your submitted assignments."
        className="bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-md p-4 hover:bg-gray-100 dark:hover:bg-gray-700"
    />
</Accordion>

    </div>
</section>

        </div>
    );
};

export default Home;
