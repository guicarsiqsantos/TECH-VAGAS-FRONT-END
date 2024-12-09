import { Card } from "./ui/card";
import imageJales from "../assets/images/jales 1.png";
import imagePrecisap from "../assets/images/precisão sistema 1.png";
import imageLoop from "../assets/images/loopsistema 1.png";
import imageSistemaBr from "../assets/images/sistemabr 1.png";

import { Grid } from "@mui/material";

const Companies = () => {
  return (
    <div className="flex flex-col h-[300px] items-center justify-center">
      <h1 className="text-2xl my-4">Empresas Parceiras</h1>
      <div>
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Card className="flex h-[200px] w-[200px]">
              <img
                src={imageJales}
                alt="logo"
                className="object-contain w-full h-full"
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card className="flex h-[200px] w-[200px]">
              <img
                src={imagePrecisap}
                alt="logo"
                className="object-contain w-full h-full"
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card className="flex h-[200px] w-[200px]">
              <img
                src={imageLoop}
                alt="logo"
                className="object-contain w-full h-full"
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card className="flex h-[200px] w-[200px]">
              <img
                src={imageSistemaBr}
                alt="logo"
                className="object-contain w-full h-full"
              />
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Companies;
