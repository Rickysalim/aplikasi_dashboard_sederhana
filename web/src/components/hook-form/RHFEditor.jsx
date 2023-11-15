import { FormHelperText } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

import Editor from "../editor/Editor";

const RHFEditor = ({ name, ...other }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <Editor
            id={name}
            value={field.value}
            onChange={field.onChange}
            error={!!error}
            {...other}
          />
          <FormHelperText error sx={{ px: 2, textTransform: "capitalize" }}>
            {error?.message}
          </FormHelperText>
        </>
      )}
    />
  );
};

export default RHFEditor;
