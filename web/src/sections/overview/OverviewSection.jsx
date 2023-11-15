import React, { useEffect } from "react";
import { Container, Grid, Paper } from "@mui/material";
import PageTitle from "../../components/dashboard-title/DashboardTitle";
import { UseDoughnutChart, UseLineChart } from "../../utils/reactChart";
import { useSelector } from "react-redux";
import { dispatch } from "../../redux/store";
import {
  getAllTransactionsStatus,
  getAllTransactionsTotal,
  setTransactionsChartData,
} from "../../redux/slices/transaction";

export default function OverviewSection() {
  const {
    dataTransactionsTotal,
    dataTransactionsUserFullName,
    dataTransactionsPrice,
    dataTransactionsStatus,
  } = useSelector((state) => state.transactions);

  console.info(dataTransactionsStatus)

  useEffect(() => {
    dispatch(getAllTransactionsTotal());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setTransactionsChartData(dataTransactionsTotal));
  }, [dataTransactionsTotal]);

  useEffect(() => {
    dispatch(getAllTransactionsStatus())
  }, [dispatch])

  const optionsLineChart = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Fund",
      },
    },
  };

  const labelsLineChart = dataTransactionsUserFullName;

  const dataLineChart = {
    labels: labelsLineChart,
    datasets: [
      {
        label: "Top Transaction",
        data: dataTransactionsPrice,
        borderColor: "green",
        backgroundColor: "green",
      },
    ],
  };

  const dataDoughnutChart = {
    labels: ["Canceled","Pending", "Success"],
    datasets: [
      {
        data: dataTransactionsStatus,
        backgroundColor: [
          "red",
          "blue",
          "green"
        ],
        borderColor: [
          "red",
          "blue",
          "green"
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Container fluid>
      <Grid sx={{ mt: 4 }}>
        <PageTitle title="Clothes Overview" />
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <UseLineChart data={dataLineChart} options={optionsLineChart} />
        </Grid>
        <Grid item xs={12}>
          <UseDoughnutChart data={dataDoughnutChart} />
        </Grid>
      </Grid>
    </Container>
  );
}
