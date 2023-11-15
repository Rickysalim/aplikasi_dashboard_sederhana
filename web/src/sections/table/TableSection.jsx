import {
  Container,
  CardMedia,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  Paper,
  Button,
  Modal,
  Box,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import PageTitle from "../../components/dashboard-title/DashboardTitle";
import { getAllClothes } from "../../redux/slices/clothes";
import { dispatch, useSelector } from "../../redux/store";
import { fDate } from "../../utils/dateFns";
import { currencyFormatterIndonesia } from "../../utils/currencyFormatter";
import notfoundimage from "../../assets/404.gif";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 5,
  px: 5,
  pb: 5,
};

export default function TableSection() {
  useEffect(() => {
    dispatch(getAllClothes());
  }, [dispatch]);

  const { dataClothes } = useSelector((state) => state.clothes);

  return (
    <Container fluid>
      <Grid sx={{ mt: 4 }}>
        <PageTitle title="Clothes List" />
      </Grid>
      <Grid>
        <TableContainer component={Paper} sx={{ mb: 5 }}>
          <Table sx={{ minWidth: 750 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell align="center">Clothes Picture</TableCell>
                <TableCell align="center">Clothes Name</TableCell>
                <TableCell align="center">Clothes Types</TableCell>
                <TableCell align="center">Clothes Variant</TableCell>
                <TableCell align="center">Clothes Price</TableCell>
                <TableCell align="center">Clothes Stock</TableCell>
                <TableCell align="center">Created At</TableCell>
                <TableCell align="center">Updated At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataClothes.length ? (
                dataClothes?.map((item, index) => {
                  return (
                    <TableRow>
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Card>
                          <CardMedia
                            component="img"
                            height="100"
                            width="100"
                            image={item.clothes_picture || notfoundimage}
                            alt={item.clothes_name}
                          ></CardMedia>
                        </Card>
                      </TableCell>
                      <TableCell component="th" scope="row" align="center">
                        {item.clothes_name}
                      </TableCell>
                      <TableCell component="th" scope="row" align="center">
                        {item.Types.types_name}
                      </TableCell>
                      <TableCell component="th" scope="row" align="center">
                        {item.Variants.variants_name}
                      </TableCell>
                      <TableCell component="th" scope="row" align="center">
                        {currencyFormatterIndonesia(item.clothes_price)}
                      </TableCell>
                      <TableCell component="th" scope="row" align="center">
                        {item.clothes_stock}
                      </TableCell>
                      <TableCell component="th" scope="row" align="center">
                        {fDate(item.createdAt)}
                      </TableCell>
                      <TableCell component="th" scope="row" align="center">
                        {fDate(item.updatedAt)}
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableBody>
                  <p style={{ marginLeft: "20px" }}>NO DATA</p>
                </TableBody>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Container>
  );
}
