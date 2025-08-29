import React from "react";
export default function FestivalList({ festivals }) {
    if (!festivals.length) {
        return <p className="text-center">No upcoming festivals found 🎊</p>;
    }

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {festivals.map((f, idx) => (
                <div key={idx} className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
                    <h2 className="font-bold text-lg">{f.name}</h2>
                    <p className="text-gray-600">📅 {new Date(f.date.iso).toDateString()}</p>
                    <p className="text-sm text-gray-500 mt-2">{f.description || "No description available."}</p>
                    <span className="inline-block mt-3 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                        {f.type[0]}
                    </span>
                </div>
            ))}
        </div>
    );
}
