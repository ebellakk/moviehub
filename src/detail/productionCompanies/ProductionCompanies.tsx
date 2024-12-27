import React, { JSX } from "react";

import { ImageList } from "@mui/material";

import { ProductionCompany } from "../types/movie";
import { Image } from "../../common/components/image/Image";

interface ProductionCompaniesProps {
  productionCompanies: ProductionCompany[];
  isLargeViewport: boolean;
}

export const ProductionCompanies = ({
  productionCompanies,
  isLargeViewport,
}: ProductionCompaniesProps): JSX.Element => {
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
