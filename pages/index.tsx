import { Grid, Card, CardHeader, Typography } from "@mui/material";

export default function Home() {
  const cardHeight = 300;
  const lgCardHeight = 350;
  return (
    <>
      <Typography variant="h4" component="h1" pb={2}>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid container item xs={12} lg={8} spacing={3}>
          <Grid item xs={12} sm={4} lg>
            <Card sx={{ height: cardHeight }}>
              <CardHeader title="Customers" subheader="This week" />
            </Card>
          </Grid>
          <Grid item xs={12} sm={4} lg>
            <Card sx={{ height: cardHeight }}>
              <CardHeader title="Products Sold" subheader="This week" />
            </Card>
          </Grid>
          <Grid item xs={12} sm={4} lg>
            <Card sx={{ height: cardHeight }}>
              <CardHeader title="Orders" subheader="This week" />
            </Card>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Card sx={{ height: lgCardHeight }}>
              <CardHeader title="Sales Revenue" subheader="This week" />
            </Card>
          </Grid>
        </Grid>
        <Grid container item xs>
          <Grid item xs>
            <Card sx={{ height: 674 }}>
              <CardHeader title="Top Categories" subheader="This week" />
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
