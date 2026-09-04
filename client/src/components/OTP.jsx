import * as React from "react";
import PropTypes from "prop-types";
import { Box, TextField } from "@mui/material";

function OTP({ separator, length, value, onChange,required }) {
  const inputRefs = React.useRef(new Array(length).fill(null));

  const focusInput = (index) => {
    inputRefs.current[index]?.focus();
  };

  const handleChange = (event, index) => {
    const inputValue = event.target.value;

    // Take only the last entered character
    const digit = inputValue.slice(-1);

    const otpArray = value.split("");

    otpArray[index] = digit;

    const newOtp = otpArray.join("");

    onChange(newOtp);

    // Move to next input
    if (digit && index < length - 1) {
      focusInput(index + 1);
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace") {
      if (!value[index] && index > 0) {
        focusInput(index - 1);
      }

      const otpArray = value.split("");
      otpArray[index] = "";

      onChange(otpArray.join(""));
    }

    if (event.key === "ArrowLeft" && index > 0) {
      event.preventDefault();
      focusInput(index - 1);
    }

    if (event.key === "ArrowRight" && index < length - 1) {
      event.preventDefault();
      focusInput(index + 1);
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();

    const pastedData = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);

    onChange(pastedData);

    if (pastedData.length === length) {
      focusInput(length - 1);
    }
  };

  return (
    <Box display="flex" alignItems="center" gap={1}>
      {Array.from({ length }).map((_, index) => (
        <React.Fragment key={index}>
          <TextField
            inputRef={(element) => {
              inputRefs.current[index] = element;
            }}
            value={value[index] || ""}
            onChange={(event) => handleChange(event, index)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            onPaste={handlePaste}
            required={required}
            inputProps={{
              maxLength: 1,
              inputMode: "numeric",
              style: {
                textAlign: "center",
                fontSize: "20px",
                padding: "10px",
                color: "white",
                backgroundColor: "transparent",
                border: "1px solid white",
                borderRadius: "4px",
                
              },
            }}
            sx={{
              width: "55px",
            }}
          />

          {index < length - 1 && separator}
        </React.Fragment>
      ))}
    </Box>
  );
}

OTP.propTypes = {
  length: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  separator: PropTypes.node,
  value: PropTypes.string.isRequired,
};

export default OTP;