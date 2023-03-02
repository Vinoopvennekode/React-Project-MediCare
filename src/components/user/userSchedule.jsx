import React, { useState } from "react";
import { range } from "lodash";

const timeSlots = [
  "9:00am - 10:00am",
  "10:00am - 11:00am",
  "11:00am - 12:00pm",
  "1:00pm - 2:00pm",
  "2:00pm - 3:00pm",
  "3:00pm - 4:00pm",
];

function DailySchedule() {
  const [schedule, setSchedule] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");

  const handleSlotClick = (timeSlot) => {
    const updatedSchedule = { ...schedule, [timeSlot]: !schedule[timeSlot] };
    setSchedule(updatedSchedule);
    setSelectedSlot(timeSlot);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Send form data to server here
    console.log(`Form submitted: ${name}, ${email}, ${selectedSlot}`);
    // Clear form data
    setName("");
    setEmail("");
    setSelectedSlot("");
  };

  return (
    <div className="bg-gray-100 py-4">
      <div className="container mx-auto">
        <h2 className="text-xl font-bold mb-4">Daily Schedule</h2>
        <div className="flex flex-wrap -mx-4">
          {timeSlots.map((timeSlot) => (
            <div
              key={timeSlot}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4"
            >
              <div
                className="bg-white rounded-md shadow-md p-4 mb-4"
                onClick={() => handleSlotClick(timeSlot)}
              >
                <h3 className="text-lg font-bold mb-2">{timeSlot}</h3>
                {schedule[timeSlot] ? (
                  <span className="text-red-600">Not Available</span>
                ) : (
                  <span className="text-green-600">Available</span>
                )}
              </div>
            </div>
          ))}
        </div>
        <form
          className="bg-white rounded-md shadow-md p-4 mt-4"
          onSubmit={handleSubmit}
        >
          <h2 className="text-lg font-bold mb-2">Book Appointment</h2>
          <div className="mb-4">
            <label htmlFor="name" className="block font-bold mb-2">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="border border-gray-400 p-2 rounded-md w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block font-bold mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="border border-gray-400 p-2 rounded-md w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="slot" className="block font-bold mb-2">
              Select Appointment Slot:
            </label>
            <select
              id="slot"
              name="slot"
              value={selectedSlot}
              onChange={(event) => setSelectedSlot(event.target.value)}
              className="border border-gray-400 p-2 rounded-md w-full"
              required
            >
              <option value="">-- Select an appointment slot --</option>
              {timeSlots.map((timeSlot) => (
                <option
                  key={timeSlot}
                  value={timeSlot}
                  disabled={schedule[timeSlot]}
                >
                  {timeSlot} -{" "}
                  {schedule[timeSlot] ? "Not Available" : "Available"}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
          >
            Book Appointment
          </button>
        </form>
      </div>
    </div>
  );
}

export default DailySchedule;
