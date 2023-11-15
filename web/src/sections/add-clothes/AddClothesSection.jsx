import React, { useEffect } from "react";
import * as Yup from "yup";
import PageTitle from "../../components/dashboard-title/DashboardTitle";
import RHFEditor from "../../components/hook-form/RHFEditor";
import RHFSelect from "../../components/hook-form/RHFSelect";
import { useForm } from "react-hook-form";
import FormProvider from "../../components/hook-form/FormProvider";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "../../redux/store";
import { dispatch } from "../../redux/store";
import { getAllTypes } from "../../redux/slices/types";
import useIsMountedRef from "../../hooks/useIsMountedRef";
import RHFTextField from "../../components/hook-form/RHFTextField";
import { getAllVariants } from "../../redux/slices/variants";
import { LoadingButton } from "@mui/lab";
import { createClothes } from "../../redux/slices/clothes";
import { Container, Grid, Card, Stack, TextField } from "@mui/material";

export default function AddClothesSection() {
  const { dataTypes, loadingTypes } = useSelector((state) => state.types);
  const { dataVariants, loadingVariants } = useSelector(
    (state) => state.variants
  );

  const isMountedRef = useIsMountedRef();

  useEffect(() => {
    dispatch(getAllTypes());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllVariants());
  }, [dispatch]);

  const defaultValues = {
    clothes_picture: {},
    clothes_name: "",
    clothes_price: 0,
    clothes_description: "",
    clothes_stock: 0,
    types_id: 0,
    variants_id: 0,
  };

  const ClothesSchema = Yup.object().shape({
    clothes_name: Yup.string().required("Clothes Name Required"),
    clothes_price: Yup.number()
      .required("Clothes Price Required")
      .min(1, "Clothes Price Must Greater than 0"),
    clothes_description: Yup.string().required("Clothes Description Required"),
    clothes_stock: Yup.number()
      .required("Clothes Stock Required")
      .min(1, "Clothes Stock Must Greater than 0"),
    types_id: Yup.number()
      .required("Clothes Types Required")
      .notOneOf([0], "Clothes Types Required"),
    variants_id: Yup.number()
      .required("Clothes Variants Required")
      .notOneOf([0], "Clothes Types Required"),
  });

  const methods = useForm({
    resolver: yupResolver(ClothesSchema),
    defaultValues,
  });

  const {
    reset,
    setValue,
    setError,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = methods;

  const value = watch();

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue(
        "clothes_picture",
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
    }
  };

  const onSubmit = async (data) => {
    try {
      await dispatch(createClothes(data));
      reset();
    } catch (error) {
      if (isMountedRef.current) {
        setError("afterSubmit", { ...error, message: error.message });
      }
      reset();
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Container fluid>
        {/* Page Header */}
        <Grid sx={{ mt: 4 }}>
          <PageTitle title="Add Clothes" />
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <TextField
                  type="file"
                  name="clothes_picture"
                  onChange={handleFile}
                  placeholder="Clothes Picture"
                  label="Clothes Picture"
                />
                <RHFTextField
                  name="clothes_name"
                  placeholder="New Clothes Name"
                  label="Clothes Name"
                />
                <RHFTextField
                  name="clothes_price"
                  type="number"
                  placeholder="Clothes Price"
                  label="Clothes Price"
                />
                <RHFTextField
                  name="clothes_stock"
                  type="number"
                  placeholder="Add Stock"
                  label="Clothes Stock"
                />
                <RHFSelect name="types_id" label="Clothes Type">
                  {value.types_id === 0 && <option>Choose Types</option>}
                  {!loadingTypes ? (
                    dataTypes?.map((item, index) => {
                      return (
                        <option key={index} value={item.types_id} selected>
                          {item.types_name}
                        </option>
                      );
                    })
                  ) : (
                    <option>Loading...</option>
                  )}
                  {!dataTypes.length && <option>No Data</option>}
                </RHFSelect>
                <RHFSelect name="variants_id" label="Clothes Variant">
                  {value.variants_id === 0 && <option>Choose Variants</option>}
                  {!loadingVariants ? (
                    dataVariants?.map((item, index) => {
                      return (
                        <option key={index} value={item.variants_id} selected>
                          {item.variants_name}
                        </option>
                      );
                    })
                  ) : (
                    <option>Loading...</option>
                  )}
                  {!dataVariants.length && <option>No Data</option>}
                </RHFSelect>
                <RHFEditor name="clothes_description" />
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
            </Card>
          </Grid>
        </Grid>
      </Container>
    </FormProvider>
  );
}
