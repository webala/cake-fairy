import Service from "./Service";
import birthday from "../public/birthday.jpg";
import brakefast from "../public/brakefast.jpg";
import disert from "../public/disert.jpg";
import graduation from "../public/graduation.jpg";

function Services() {
  return (
    <div className="my-10 grid grid-cols-2 sm:grid-cols-4 md:flex justify-evenly py-10">
      <Service image={birthday} service="Birthday" />
      <Service image={brakefast} service="Brakefast" />
      <Service image={disert} service="Disert" />
      <Service image={graduation} service="Graduation" />
      <Service image={birthday} service="Birthday" />
      <Service image={brakefast} service="Brakefast" />
      <Service image={disert} service="Disert" />
      <Service image={graduation} service="Graduation" />
    </div>
  );
}

export default Services;
