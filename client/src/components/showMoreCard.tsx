import { CircleChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const ShowMoreCard = ({ show }: any) => {
  return (
    <div className="border rounded-lg">
      <Link
        href={"/product"}
        className="p-5 w-full h-full flex flex-col justify-center items-center gap-2"
      >
        <h2 className="text-lg font-bold text-center capitalize text-cyan-600">
          Explore more {"product"}
          {show}
        </h2>
        <button className="h-fit w-fit rounded-full text-cyan-600 select-none">
          <CircleChevronRight strokeWidth={3} />
        </button>
      </Link>
    </div>
  );
};

export default ShowMoreCard;
