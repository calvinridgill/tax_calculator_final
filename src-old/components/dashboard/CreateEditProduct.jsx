import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, TextField, Input, InputLabel, Button } from "@mui/material";

export function CreateEditProduct({ defaultValues, disabled = false }) {
  const [productImage, setProductImage] = useState(
    defaultValues?.images[0] || "/images/image-loading-error.jpg"
  );
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 600,
        py: 4,
      }}
    >
      <TextField
        label="Title"
        name="name"
        required
        defaultValue={defaultValues?.name}
        disabled={disabled}
      />
      <TextField
        label="Description"
        name="description"
        required
        multiline
        maxRows={5}
        minRows={3}
        defaultValue={defaultValues?.description}
        disabled={disabled}
      />
      <TextField
        label="Price"
        name="price"
        required
        type="number"
        defaultValue={defaultValues?.price}
        disabled={disabled}
      />
      <Box
        sx={{
          display: "flex",
          gap: 5,
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Box
          component={"img"}
          src={productImage}
          sx={{
            height: 250,
            width: "100%",
            objectFit: "contain",
            bgcolor: "background.lightest",
          }}
        />
        <Box>
          <Input
            type="file"
            name="image"
            id="image-change"
            sx={{ display: "none" }}
            inputProps={{ accept: "image/*" }}
            onChange={(event) => {
              const reader = new FileReader();
              reader.onload = (ev) => {
                setProductImage(ev.target.result);
              };
              reader.readAsDataURL(event.target.files[0]);
            }}
          />
          <InputLabel htmlFor="image-change">
            <Button
              component="span"
              color="primary"
              variant="outlined"
              size="small"
              disabled={disabled}
            >
              Select Image <sup>&nbsp;*</sup>
            </Button>
          </InputLabel>
        </Box>
      </Box>
    </Box>
  );
}

CreateEditProduct.propTypes = {
  // defaultValues props listing name, description,price, and image
  defaultValues: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    images: PropTypes.array,
  }),
  disabled: PropTypes.bool,
};
