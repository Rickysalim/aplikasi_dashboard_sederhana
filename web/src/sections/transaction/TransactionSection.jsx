import React, { useEffect, useState } from "react";
import RHFTextField from "../../components/hook-form/RHFTextField";
import PageTitle from "../../components/dashboard-title/DashboardTitle";
import { useForm } from "react-hook-form";
import {
  Grid,
  Container,
  CardMedia,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import { dispatch, useSelector } from "../../redux/store";
import {
  createTransactions,
  getAllTransactions,
  setStateTransaction,
} from "../../redux/slices/transaction";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import FormProvider from "../../components/hook-form/FormProvider";
import { LoadingButton } from "@mui/lab";
import RHFFormSelect from "../../components/hook-form/RHFSelect";
import { getAllUsers } from "../../redux/slices/users";
import { getAllClothes } from "../../redux/slices/clothes";
import { fDate } from "../../utils/dateFns";
import useIsMountedRef from "../../hooks/useIsMountedRef";

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

export default function TransactionSection() {
  const [openEdit, setOpenEdit] = useState(false);

  const isMountedRef = useIsMountedRef();

  const handleOpenEdit = (item) => {
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const [openDelete, setOpenDelete] = useState(false);

  const handleOpenDelete = (id) => {
    console.info(id);
    setOpenDelete(true);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getAllTransactions());
  }, [dispatch]);

  const { dataTransactions, stateTransactions } = useSelector(
    (state) => state.transactions
  );


  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const { dataUsers, loadingUsers } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getAllClothes());
  }, [dispatch]);

  const { dataClothes, loadingClothes } = useSelector((state) => state.clothes);

  const defaultValues = {
    transactions_id: stateTransactions.transactions_id || 0,
    users_id: stateTransactions.users_id || 0,
    clothes_id: stateTransactions.clothes_id || 0,
    transactions_status: stateTransactions.transactions_status || 1,
    clothes_quantity: stateTransactions.clothes_quantity || 0,
  };

  const TransactionsSchema = Yup.object().shape({
    users_id: Yup.number()
      .required("User Required")
      .notOneOf([0], "User Required"),
    clothes_id: Yup.number()
      .required("Clothes Required")
      .notOneOf([0], "Clothes Required"),
    clothes_quantity: Yup.number()
      .required("Clothes Quantity Required")
      .min(1, "Clothes Quantity Must Greater than 0"),
  });

  const methods = useForm({
    resolver: yupResolver(TransactionsSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = methods;

  const value = watch();

  useEffect(() => {
    dispatch(setStateTransaction(value));
  }, [value]);

  const onSubmit = async (data) => {
    try {
      await dispatch(createTransactions(data));
      reset();
    } catch (error) {
      if (isMountedRef.current) {
        setError("afterSubmit", { ...error, message: error.message });
      }
      reset();
    }
  };


  return (
    <Container fluid>
      <Grid sx={{ mt: 4 }}>
        <PageTitle title="Clothes Transaction" />
      </Grid>
      <Grid>
        <Button
          color="success"
          variant="contained"
          sx={{ marginBottom: "30px" }}
          onClick={handleOpen}
        >
          CREATE TRANSACTIONS
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...style }}>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={3}>
                <RHFFormSelect name="users_id" label="User">
                  {value.users_id === 0 && <option>Choose User</option>}
                  {!loadingUsers ? (
                    dataUsers?.map((item, index) => {
                      return (
                        <option key={index} value={item.users_id}>
                          {item.users_fullname}
                        </option>
                      );
                    })
                  ) : (
                    <option>Loading...</option>
                  )}
                  {!dataUsers.length && <option>No Data</option>}
                </RHFFormSelect>
                <RHFFormSelect
                  name="transactions_status"
                  label="Transaction Status"
                >
                  <option value="1">Pending</option>
                  <option value="2">Success</option>
                  <option value="3">Canceled</option>
                </RHFFormSelect>
                <RHFFormSelect name="clothes_id" label="Clothes">
                  {value.clothes_id === 0 && <option>Choose Clothes</option>}
                  {!loadingClothes ? (
                    dataClothes?.map((item, index) => {
                      return (
                        <option key={index} value={item.clothes_id}>
                          {item.clothes_name}
                        </option>
                      );
                    })
                  ) : (
                    <option>Loading...</option>
                  )}
                  {!dataClothes.length && <option>No Data</option>}
                </RHFFormSelect>
                <RHFTextField
                  name="clothes_quantity"
                  type="number"
                  label="Quantity"
                />
                <LoadingButton
                  type="submit"
                  variant="contained"
                  color="secondary"
                  loading={isSubmitting}
                  sx={{
                    mt: 2,
                  }}
                >
                  Submit
                </LoadingButton>
              </Stack>
            </FormProvider>
            <Stack spacing={3} sx={{ mt: 2 }}>
              <Button onClick={handleClose} color="error" variant="contained">
                Cancel
              </Button>
            </Stack>
          </Box>
        </Modal>
        <TableContainer component={Paper} sx={{ mb: 5 }}>
          <Table sx={{ minWidth: 750 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell align="center">User</TableCell>
                <TableCell align="center">User Fullname</TableCell>
                <TableCell align="center">Transaction Status</TableCell>
                <TableCell align="center">Clothes</TableCell>
                <TableCell align="center">Clothes Quantity</TableCell>
                <TableCell align="center">Clothes Total Price</TableCell>
                <TableCell align="center">Created At</TableCell>
                <TableCell align="center">Updated At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataTransactions.length ? (
                dataTransactions?.map((item, index) => {
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
                            image={item.Users.users_picture}
                            alt={item.Users.users_fullname}
                          ></CardMedia>
                        </Card>
                      </TableCell>
                      <TableCell component="th" scope="row" align="center">
                        {item.Users.users_fullname}
                      </TableCell>
                      <TableCell component="th" scope="row" align="center">
                        {item.transactions_status === 1 && ("Pending")}
                        {item.transactions_status === 2 && ("Success")}
                        {item.transactions_status === 3 && ("Canceled")}
                      </TableCell>
                      <TableCell component="th" scope="row" align="center">
                        {item.Clothes.clothes_name}
                      </TableCell>
                      <TableCell component="th" scope="row" align="center">
                        {item.clothes_quantity}
                      </TableCell>
                      <TableCell component="th" scope="row" align="center">
                        {item.clothes_total_price}
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
