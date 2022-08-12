import Service from "./Service";
import birthday from "../public/birthday.jpg";
import brakefast from "../public/brakefast.jpg";
import disert from "../public/disert.jpg";
import graduation from "../public/graduation.jpg";

function Services() {
  return (
    <div className="services px-4 md:px-20 xl:px-44" id="services">   
      <h1 className=' text-2xl heading'>Services</h1>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:flex justify-evenly py-10">
        <Service image={birthday} service="Birthdays" />
        <Service image={brakefast} service="Brakefast" />
        <Service image={disert} service="Diserts" />
        <Service image={graduation} service="Graduations" />
      </div>
    </div>
  );
}

export default Services;
