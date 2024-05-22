import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Carousel from '../components/carousel';
import Filter from '../components/filter';
import ProfileList from '../components/ProfileList';

const Homepage = () => {
    const [profiles, setProfiles] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const token = localStorage.getItem('token');
                console.log('Token retrieved:', token); // Add this line to check token retrieval
                if (!token) {
                    throw new Error('Token not found');
                }

                console.log('Headers sent:', { // Moved the console.log statement inside axios.get
                    Authorization: `${token}`
                });

                const response = await axios.get('http://localhost:5000/profiles', {
                    headers: { // Added headers object for Authorization
                        Authorization: `${token}`
                    }
                });

                setProfiles(response.data);
            } catch (error) {
                setError(error.message || 'Error fetching profiles');
            }
        };

        fetchProfiles();
    }, []);


    return (
        <>
            <div className="flex ">
                <Filter />
                <Carousel />
                <Sidebar />
            </div>
            <div>
                <ProfileList />
            </div>
        </>
    );
};

export default Homepage;
