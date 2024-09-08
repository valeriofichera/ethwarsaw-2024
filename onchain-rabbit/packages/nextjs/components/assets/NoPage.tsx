import Image from "next/image";
import NoPageImage from "./NoPage.png";

export const NoPage = () => {
  return (
    <div>
      <Image src={NoPageImage} alt="No Page" />
    </div>
  );
};