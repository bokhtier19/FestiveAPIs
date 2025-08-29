import React from "react";
import { countries, states } from "../constants/countries";

export default function Filters({ country, setCountry, state, setState }) {
    const stateOptions = states[country] || [];

    return (
        <div className="flex flex-col md:flex-row justify-center gap-4 mb-6">
            {/* Country Dropdown */}
            <select
                value={country}
                onChange={(e) => {
                    setCountry(e.target.value);
                    setState(""); // reset state when country changes
                }}
                className="p-2 border rounded-lg shadow"
            >
                {countries.map((c) => (
                    <option key={c.code} value={c.code}>
                        {c.name}
                    </option>
                ))}
            </select>

            {/* State Dropdown (only if available) */}
            {stateOptions.length > 0 && (
                <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="p-2 border rounded-lg shadow"
                >
                    <option value="">All States</option>
                    {stateOptions.map((s) => (
                        <option key={s.code} value={s.code}>
                            {s.name}
                        </option>
                    ))}
                </select>
            )}
        </div>
    );
}
