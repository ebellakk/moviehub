import React, { JSX } from "react";

import { ImageList, useMediaQuery } from "@mui/material";

import { ProductionCompany } from "../types/movie";
import { Image } from "../../common/components/image/Image";

interface ProductionCompaniesProps {
  productionCompanies: ProductionCompany[];
}

export const ProductionCompanies = ({
  productionCompanies,
}: ProductionCompaniesProps): JSX.Element => {
  const isLargeViewport = useMediaQuery("(min-width:1024px)");

  return (
    <ImageList cols={isLargeViewport ? 3 : 2}>
      {productionCompanies?.map((company) => (
        <Image
          key={company.id}
          path={company.logo_path}
          alt={company.name}
          title={company.name}
          subtitle={company.origin_country}
        />
      ))}
    </ImageList>
  );
};
