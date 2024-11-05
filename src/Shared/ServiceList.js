import React from 'react';
import { FaCloudSun, FaMapSigns, FaCogs } from 'react-icons/fa';

const ServiceList = () => {
    return (
        <section className="service-list py-7 bg-gray-50">
            <div className="container mx-auto text-center md:text-left px-4">
                <h3 className="text-blue-500 italic text-lg">What we serve</h3>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">
                    We offer our best services
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                    {/* Service 1 */}
                    <div className="service-item bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-400">
                        <FaCloudSun className="text-blue-500 text-4xl mb-4" />
                        <h4 className="text-xl font-semibold text-gray-800">Calculate Weather</h4>
                        <p className="text-gray-600 mt-2">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </p>
                    </div>

                    {/* Service 2 */}
                    <div className="service-item bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-400">
                        <FaMapSigns className="text-blue-500 text-4xl mb-4" />
                        <h4 className="text-xl font-semibold text-gray-800">Best Tour Guide</h4>
                        <p className="text-gray-600 mt-2">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </p>
                    </div>

                    {/* Service 3 */}
                    <div className="service-item bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-400">
                        <FaCogs className="text-blue-500 text-4xl mb-4" />
                        <h4 className="text-xl font-semibold text-gray-800">Customization</h4>
                        <p className="text-gray-600 mt-2">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServiceList;
