import {
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import textSlice, {
  changeQuantity,
  changeHtmlstatus,
  getTextsAsync,
} from "../store/textSlice";

const Content = () => {
  const dispatch = useDispatch();
  const { quantity, htmlstatus, text } = useSelector(
    (state) => state.textSlice
  );

  useEffect(() => {
    dispatch(getTextsAsync({quantity,htmlstatus}));
  }, []);

  const handleChangeNumber = (event) => {
    dispatch(changeQuantity(event.target.value));
    dispatch(getTextsAsync({quantity: event.target.value, htmlstatus}))
  };

  const handleChangeShow = (event) => {
    dispatch(changeHtmlstatus(event.target.value));
    dispatch(getTextsAsync({quantity, htmlstatus: event.target.value}))
  };
  return (
    <Stack>
      <Container sx={{ textAlign: "center" }}>
        <hr />
        <Stack sx={{ display: "flex", flexDirection: "row" }}>
          <FormControl sx={{ margin: "1rem" }}>
            <TextField
              onChange={handleChangeNumber}
              color="success"
              id="quantity"
              label="Paragraphs"
              type="number"
              sx={{ width: 100 }}
              variant="standard"
              value={quantity}
            />
          </FormControl>
          <FormControl sx={{ margin: "1rem" }}>
            <InputLabel id="demo-simple-select-filled-label" color="success">
              Include HTML
            </InputLabel>
            <Select
              onChange={handleChangeShow}
              color="success"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Include HTML"
              sx={{ width: 100 }}
              variant="standard"
              value={htmlstatus}
            >
              <MenuItem value={"text"}>No</MenuItem>
              <MenuItem value={"html"}>Yes</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <Container sx={{ background: "#303030", color: "white" }}>
          <Typography
            sx={{ margin: "1rem", padding: "1rem" }}
            variant="body1"
            gutterBottom
          >
            {text}
          </Typography>
        </Container>
      </Container>
    </Stack>
  );
};

export default Content;
