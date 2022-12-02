import Image from "next/image";
import React from "react";
import Title from "../Title/Title";

const Team = ({ teams }) => {
  return (
    <div className="md:w-3/4 mx-auto text-center my-[100px]">
      <Title>Our Team</Title>

      {/* team */}
      <div className="w-full my-3 p-3 flex flex-col md:flex-row justify-center items-center flex-wrap">
        {teams &&
          teams.map((item) => (
            <div
              key={item.id}
              className="max-w-[450px] max-h-fit flex flex-col items-center my-6 mr-0 md:mr-3"
            >
              <div className="w-[350px] h-[350px] rounded-full overflow-hidden">
                <Image
                  src={`/${item.image}`}
                  alt="team"
                  width={350}
                  height={350}
                />
              </div>
              <h3 className="my-3 text-dark font-Jakarta font-bold text-[24px]">
                {item.name}
              </h3>
              <p className="text-dark200 text-[16px]">{item.designation}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Team;
