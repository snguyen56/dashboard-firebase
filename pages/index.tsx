import {
  Grid,
  Card,
  CardHeader,
  Typography,
  Box,
  Container,
} from "@mui/material";

export default function Home() {
  const smallCardSize = 2;
  const medCardSize = 4;
  const largeCardSize = 8;
  const cardHeight = 300;
  const lgCardHeight = 350;
  return (
    // <Container style={{ height: 550, width: "80vw" }} maxWidth={false}>
    <Box px={5}>
      <Typography variant="h4" component="h1" pb={2}>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} lg>
          <Card sx={{ height: cardHeight }}>
            <CardHeader title="Customers" subheader="This week" />
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} lg>
          <Card sx={{ height: cardHeight }}>
            <CardHeader title="Products Sold" subheader="This week" />
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} lg>
          <Card sx={{ height: cardHeight }}>
            <CardHeader title="Orders" subheader="This week" />
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} lg={medCardSize}>
          <Card sx={{ height: cardHeight }}>
            <CardHeader title="Top Products" subheader="This week" />
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} lg={largeCardSize}>
          <Card sx={{ height: lgCardHeight }}>
            <CardHeader title="Sales Revenue" subheader="This week" />
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} lg={medCardSize}>
          <Card sx={{ height: lgCardHeight }}>
            <CardHeader title="Top Categories" subheader="This week" />
          </Card>
        </Grid>
      </Grid>
    </Box>
    // </Container>
  );
}
