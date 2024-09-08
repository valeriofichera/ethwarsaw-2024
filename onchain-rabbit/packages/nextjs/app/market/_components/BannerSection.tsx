import React, { useContext } from "react";
import { FunnyContext } from "~~/services/funny/funnyContext";
import Image from "next/image";

import bera_banner from "~~/components/assets/banner/bera_banner.png";
import all_banner from "~~/components/assets/banner/all_banner.png";

const imageMap: { [key: string]: string } = {
  bera: bera_banner.src,
  all: all_banner.src,
};

const BannerSection = () => {
  const context = useContext(FunnyContext);

  if (!context) {
    throw new Error("DataContext not found");
  }

  const selectedNetwork = context.selectedNetwork;
  const bannerImage = selectedNetwork ? imageMap[selectedNetwork] : imageMap["all"];

  return (
    <div className="mb-3 h-1/3 rounded-xl w-full overflow-hidden">
      <Image
        src={bannerImage}
        alt={selectedNetwork || "all"}
        layout="responsive"
        width={16}
        height={4}
        objectFit="cover"
      />
    </div>
  );
};

export default BannerSection;
