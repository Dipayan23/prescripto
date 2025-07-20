import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets_frontend/assets";

const MyAppointment = () => {
  const { Doctors } = useContext(AppContext);

  return (
    <div>
      <p className="pb-3 mt-12 text-lg font-medium text-gray-600 border-b">
        My Appointments
      </p>
      <div className="">
        {Doctors.slice(0, 2).map((item, index) => (
          <div
            className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b"
            key={index}
          >
            <div className="w-36 bg-[#EAEFFF]">
              <img src={item.image} alt="doctor image" />
            </div>
            <div className="">
              <p className="text-[#262626] text-base font-semibold">
                {item.name}
              </p>
              <p>{item.speciality}</p>
              <p className="text-[#464646] font-medium mt-1">Address:</p>
              <p className="">{item.address.line1}</p>
              <p className="">{item.address.line2}</p>
              <p className=" mt-1">
                <span className="text-sm text-[#3C3C3C] font-medium">
                  Date & Time:
                </span>{" "}
                {item.appointmentDate} at {item.appointmentTime}
              </p>
            </div>
            <div className="flex flex-col gap-2 justify-end text-sm text-center ">
              <div className=" w-48 text-sm text-stone-500 text-center sm-min-w-48 py-2 border hover:bg-primary hover:text-white transition-all duration-300">
                Pay Online
              </div>
              <div className=" w-48 text-sm text-stone-500 text-center sm-min-w-48 py-2 border hover:bg-red-400 hover:text-white transition-all duration-300">
                Cancel Apponitment
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointment;
