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
        <div>
            <Banner />

            {/* Feature Section */}
            <section className="py-12 bg-gradient-to-r from-primary to-accent text-white">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-semibold mb-8">Our Features</h2>

                    <div className="grid gap-6 md:grid-cols-3">
                        <Card
                            title="Create Assignments"
                            description="Design and distribute assignments to your study group effortlessly."
                            colorClass="border-blue-500 hover:bg-blue-100"
                        />
                        <Card
                            title="Submit Assignments"
                            description="Submit your assignments quickly and stay organized in one place."
                            colorClass="border-purple-500 hover:bg-purple-100"
                        />
                        <Card
                            title="View Submitted Assignments"
                            description="Access and review all your submitted assignments anytime, anywhere."
                            colorClass="border-pink-500 hover:bg-pink-100"
                        />
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-12 bg-base-200">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-semibold text-center mb-8">FAQs</h2>

                    <Accordion>
                        <AccordionItem
                            question="How do I create an assignment?"
                            answer="Simply log in to your account, navigate to the 'Create Assignment' section, and fill out the required details."
                        />
                        <AccordionItem
                            question="Can I edit an assignment after submission?"
                            answer="Currently, assignments cannot be edited after submission. However, you can resubmit with updated details if necessary."
                        />
                        <AccordionItem
                            question="Where can I view my submitted assignments?"
                            answer="Go to the 'My Submissions' section in your dashboard to see all your submitted assignments."
                        />
                    </Accordion>
                </div>
            </section>
        </div>
    );
};

export default Home;
