import Service from "./Service";
import birthday from "../public/birthday.jpg";
import brakefast from "../public/brakefast.jpg";
import disert from "../public/disert.jpg";
import graduation from "../public/graduation.jpg";

function Services() {
  return (
    <div className="my-16 md:my-32 pb-32 border-b border-backgroundSecondary services px-4 md:px-20 xl:px-44 flex flex-col items-center" id="services">   
      <h1 className="sm:p-7 md:w-5/6 text">
              "Whether you love the simplicity of a banana or the taste of icing
              we’ve got sweet treats for every craving!"
            </h1>
      <div className=" sm:grid-cols-4 flex flex-wrap justify-evenly py-10">
        <Service image={birthday} service="Birthdays" />
        <Service image={brakefast} service="Brakefast" />
        <Service image={disert} service="Diserts" />
        <Service image={graduation} service="Graduations" />
      </div>
    </div>
  );
}

export default Services;
