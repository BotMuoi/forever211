/*
=========================================================
* Material Kit 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-router-dom components
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKBadge from "components/MKBadge";
import MKTypography from "components/MKTypography";

// Presentation page components
import ExampleCard from "pages/Presentation/components/ExampleCard";

// Data
// import data from "pages/Presentation/sections/data/designBlocksData";

function DesignBlocks({ list }) {
  console.log(list);
  const renderData = (
    <Grid container spacing={3} sx={{ mb: 10 }}>
      <Grid item xs={12} lg={3}>
        <MKBox position="sticky" top="100px" pb={{ xs: 2, lg: 6 }}>
          <MKTypography variant="h3" fontWeight="bold" mb={1}>
            Tralvel
          </MKTypography>
          <MKTypography variant="body2" fontWeight="regular" color="secondary" mb={1} pr={2}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat accusantium excepturi
            deleniti ipsam vero ratione soluta, atque eveniet eius rem sed doloremque? Id similique
            at earum doloremque iure ipsam voluptatum?
          </MKTypography>
        </MKBox>
      </Grid>
      <Grid item xs={12} lg={9}>
        <Grid container spacing={3}>
          {list.map((product) => (
            <Grid item xs={12} md={4} sx={{ mb: 2 }} key={name}>
              <Link to={""}>
                <ExampleCard
                  image={
                    "data:image/jpeg;base64,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"
                  }
                  name={product.name}
                  price={product.price}
                />
              </Link>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );

  return (
    <MKBox component="section" my={6} py={6}>
      <Container>
        <Grid
          container
          item
          xs={12}
          lg={6}
          flexDirection="column"
          alignItems="center"
          sx={{ textAlign: "center", my: 6, mx: "auto", px: 0.75 }}
        >
          <MKBadge
            variant="contained"
            color="info"
            badgeContent="Infinite combinations"
            container
            sx={{ mb: 2 }}
          />
          <MKTypography variant="h2" fontWeight="bold">
            Huge collection of sections
          </MKTypography>
          <MKTypography variant="body1" color="text">
            We have created multiple options for you to put together and customise into pixel
            perfect pages.
          </MKTypography>
        </Grid>
      </Container>
      <Container sx={{ mt: 6 }}>
        <Grid item xs={12} lg={9}>
          <Grid container spacing={3}>
            {renderData}
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}
DesignBlocks.propTypes = {
  list: PropTypes.oneOfType(PropTypes.array),
};
export default DesignBlocks;
