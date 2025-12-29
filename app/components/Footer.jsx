import { Mail, MapPin, Phone, PhoneCall } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="flex flex-col gap-3 w-full bg-blue-100 border-t p-5 md:p-10">
      <div className="w-full flex flex-col md:flex-row md:justify-between gap-3">
        <img className="h-8" src="/logo.png" alt="Logo" />
        <div className="flex-1 flex flex-col md:flex-row gap-4 md:justify-between">
          <div className="flex gap-2 items-center">
            <PhoneCall size={12} className="text-blue-500" />
            <h2 className="text-sm text-gray-600">+91 910 1234567</h2>
          </div>
          <div className="flex gap-2 items-center">
            <Mail size={12} className="text-blue-500" />
            <h2 className="text-sm text-gray-600">discountd@gmail.com</h2>
          </div>
          <div className="flex gap-2 items-center">
            <MapPin size={12} className="text-blue-500" />
            <h2 className="text-sm text-gray-600">Okhla, New delhi -110089</h2>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
