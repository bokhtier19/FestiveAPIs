import { useEffect, useState } from "react";
import axios from "axios";
import Filters from "./components/Filters";
import FestivalList from "./components/FestivalList";
import React from "react";

const API_KEY = "CyFNRWPEdbS2eqZMfHfz7UFxlRsti7UH"; // replace with your Calendarific API key
const YEAR = new Date().getFullYear();

function App() {
    const [country, setCountry] = useState("IN"); // default India
    const [state, setState] = useState(""); // selected state/region
    const [festivals, setFestivals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchFestivals = async () => {
        try {
            setLoading(true);
            setError("");

            let url = `https://calendarific.com/api/v2/holidays?api_key=${API_KEY}&country=${country}&year=${YEAR}`;
            if (state) {
                url += `&location=${state}`;
            }

            const res = await axios.get(url);
            const holidays = res.data.response.holidays || [];

            // only upcoming
            const upcoming = holidays.filter((h) => new Date(h.date.iso) >= new Date());

            setFestivals(upcoming);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch festivals. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFestivals();
    }, [country, state]);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Festival Finder 🎉</h1>

            <Filters country={country} setCountry={setCountry} state={state} setState={setState} />

            {loading && <p className="text-center mt-4">Loading festivals...</p>}
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}

            {!loading && !error && <FestivalList festivals={festivals} />}
        </div>
    );
}

export default App;
