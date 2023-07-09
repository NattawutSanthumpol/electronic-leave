import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  Snackbar,
  TextField,
  Typography,
  createFilterOptions,
} from "@mui/material";
import { useEffect, useState } from "react";
// import * as teacherService from "../service/teacherService";
import { Teacher } from "../service/teacherService";
import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MockData } from "../data";
import { TimePicker } from "@mui/x-date-pickers";

import thLocale from "date-fns/locale/th";
import { Leave } from "../service/leaveService";
import { Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const AddLeaveForm = () => {
  // const [teacher, setTeacher] = useState<Array<Teacher>>(MockData);
  // const [teacher, setTeacher] = useState<Array<Teacher>>([]); //await teacherService.getAll()
  const teacher = MockData
  const [codeTeacher, setCodeTeacher] = useState<number>(0);
  const [codeTeacherExchange, setCodeTeacherExchange] = useState<number>(0);
  const [position, setPosition] = useState<string>("");
  const [typeLeave, setTypeLeave] = useState<string>("");
  const [subTypeLeave, setSubTypeLeave] = useState<string>("");
  const [causeOfLeave, setCauseOfLeave] = useState<string>("");
  const [dateStart, setDateStart] = useState<Date>(new Date());
  const [dateEnd, setDateEnd] = useState<Date>(new Date());
  const [timeStart, setTimeStart] = useState<Date>(new Date());
  const [timeEnd, setTimeEnd] = useState<Date>(new Date());
  const [msg, setMsg] = useState("");
  const [leave, setLeave] = useState<Leave>();
  const navigate = useNavigate();

  // setTeacher(MockData);
  // const getTeacherAll = async () => {
  //   const teacherList = await teacherService.getAll();
  //   if (teacherList) {
  //     setTeacher(teacherList);
  //   }
  // };
  const [open, setOpen] = useState(false);

  const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton size="small" aria-label="close"></IconButton>
    </React.Fragment>
  );

  const filterOptions = createFilterOptions({
    stringify: (option: Teacher) =>
      option.firstName + option.lastName + option.code,
  });

  const handlePositionChange = (event: SelectChangeEvent) => {
    setPosition(event.target.value);
  };

  const handleTypeChange = (event: SelectChangeEvent) => {
    setTypeLeave(event.target.value);
  };

  const handleSubTypeChange = (event: SelectChangeEvent) => {
    setSubTypeLeave(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // ตรวจสอบความถูกต้องของข้อมูล
    if (!codeTeacher) {
      setOpen(true);
      setMsg("โปรดเลือกครูผู้ลา");
      return;
    }

    if (!position) {
      setOpen(true);
      setMsg("โปรดเลือกตำแหน่ง");
      return;
    }

    if (!typeLeave) {
      setOpen(true);
      setMsg("โปรดเลือกประเภทการลา");
      return;
    }

    if (!subTypeLeave) {
      setOpen(true);
      setMsg("โปรดเลือกประเภทย่อยของการลา");
      return;
    }

    if (!dateStart || !dateEnd) {
      setOpen(true);
      setMsg("โปรดเลือกวันที่ลา");
      return;
    }

    if (typeLeave === "outOfPlace" && (!timeStart || !timeEnd)) {
      setOpen(true);
      setMsg("โปรดเลือกเวลาที่ลา");
      return;
    }

    if (!causeOfLeave) {
      setOpen(true);
      setMsg("โปรดกรอกสาเหตุการลา");
      return;
    }

    if (!codeTeacherExchange) {
      setOpen(true);
      setMsg("โปรดเลือกครูผู้แทน");
      return;
    }

    const leaveValue = {
      code: codeTeacher,
      type: typeLeave,
      subType: subTypeLeave,
      position: position,
      dateFrom: dateStart,
      dateTo: dateEnd,
      timeFrom: timeStart,
      timeTo: timeEnd,
      causeOfLeave: causeOfLeave,
      exchange: codeTeacherExchange,
      createDate: Timestamp.fromDate(new Date()),
    };

    setLeave(leaveValue);
  };
  localStorage.setItem("leave", JSON.stringify(leave));

  useEffect(() => {
    leave && navigate("/report");
  }, [leave, navigate]);
  return (
    <Container>
      {/* <div>
        {`Code Teacher: ${codeTeacher !== null ? `'${codeTeacher}'` : 0}`}{" "}
        <br />
        {`Position: ${position !== null ? `'${position}'` : ""}`} <br />
        {`Type: ${typeLeave !== null ? `'${typeLeave}'` : ""}`} <br />
        {`Sub Type: ${subTypeLeave !== null ? `'${subTypeLeave}'` : ""}`} <br />
        {`Start Date: ${dateStart !== null ? `'${dateStart}'` : ""}`} <br />
        {`End Date: ${dateEnd !== null ? `'${dateEnd}'` : ""}`} <br />
        {`Start Time: ${timeStart !== null ? `'${timeStart}'` : ""}`} <br />
        {`End Time: ${timeEnd !== null ? `'${timeEnd}'` : ""}`} <br />
        {`Cause Of Leave: ${
          causeOfLeave !== null ? `'${causeOfLeave}'` : ""
        }`}{" "}
        <br />
        {`Code Teacher Exchange: ${
          codeTeacherExchange !== null ? `'${codeTeacherExchange}'` : 0
        }`}
      </div>
      <br /> */}
      <Grid container spacing={0} sx={{ mt: 3 }}>
        <Grid item lg={12} md={12} xs={12}>
          <Card
            variant="outlined"
            sx={{
              p: 0,
            }}
          >
            <Snackbar
              open={open}
              autoHideDuration={2000}
              onClose={handleClose}
              message="Note archived"
              action={action}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              sx={{ width: "600px" }}
            >
              <Alert
                onClose={handleClose}
                severity="error"
                sx={{ width: "100%", fontSize: "16px" }}
              >
                {msg}
              </Alert>
            </Snackbar>
            <Box
              sx={{
                padding: "15px 30px",
              }}
              display="flex"
              alignItems="center"
            >
              <Box flexGrow={1}>
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontWeight: "500",
                    textAlign: "center",
                  }}
                >
                  แบบฟอร์มใบลา
                </Typography>
              </Box>
            </Box>
            <Divider />
            <CardContent
              sx={{
                padding: "30px",
              }}
            >
              <Box component="form" noValidate autoComplete="off">
                {/* ========================== */}
                {/* ครูผู้ลา */}
                {/* ========================== */}
                <FormControl
                  fullWidth
                  sx={{
                    mb: 2,
                  }}
                >
                  <Autocomplete
                    clearOnEscape
                    autoHighlight
                    id="codeTeacher"
                    fullWidth
                    options={teacher}
                    getOptionLabel={(option: Teacher) =>
                      option.firstName + " " + option.lastName || ""
                    }
                    filterOptions={filterOptions}
                    // value={value}
                    onChange={(_event, newValue) => {
                      setCodeTeacher(newValue?.code || 0);
                      console.log(newValue?.code || 0);
                    }}
                    getOptionDisabled={(option: Teacher) =>
                      option.code === codeTeacherExchange
                    }
                    renderInput={(params) => (
                      <TextField {...params} label="ชื่อ - นามสกุล" />
                    )}
                  />
                </FormControl>

                {/* ========================== */}
                {/* ตำแหน่ง */}
                {/* ========================== */}
                <FormControl
                  fullWidth
                  sx={{
                    mb: 2,
                  }}
                >
                  <InputLabel id="positionLabel">ตำแหน่ง</InputLabel>
                  <Select
                    labelId="positionLabel"
                    id="position"
                    value={position}
                    label="Age"
                    onChange={handlePositionChange}
                  >
                    <MenuItem value={"ผู้บริหาร"}>ผู้บริหาร</MenuItem>
                    <MenuItem value={"หัวหน้างาน"}>หัวหน้างาน</MenuItem>
                    <MenuItem value={"ครูผู้สอน"}>ครูผู้สอน</MenuItem>
                    <MenuItem value={"เจ้าหน้าที่"}>เจ้าหน้าที่</MenuItem>
                  </Select>
                </FormControl>

                {/* ========================== */}
                {/* ประเภทการลา */}
                {/* ========================== */}
                <FormControl fullWidth>
                  <FormLabel id="type">ประเภทการลา</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="type"
                    name="type"
                    onChange={handleTypeChange}
                  >
                    <FormControlLabel
                      value="sickLeave"
                      control={<Radio />}
                      label="ลากิจ/ลาป่วย"
                    />
                    <FormControlLabel
                      value="outOfPlace"
                      control={<Radio />}
                      label="ออกนอกสถานที่"
                    />
                  </RadioGroup>
                </FormControl>

                {/* ========================== */}
                {/* ลากิจ/ป่วย */}
                {/* ========================== */}
                {typeLeave === "sickLeave" && (
                  <FormControl
                    fullWidth
                    sx={{
                      mb: 2,
                    }}
                  >
                    <RadioGroup
                      row
                      aria-labelledby="subTypeLeave"
                      name="subTypeLeave"
                      onChange={handleSubTypeChange}
                    >
                      <FormControlLabel
                        value="sick"
                        control={<Radio />}
                        label="ลาป่วย"
                      />
                      <FormControlLabel
                        value="halfDay"
                        control={<Radio />}
                        label="ลากิจ (ครึ่งวัน)"
                      />
                      <FormControlLabel
                        value="fullDay"
                        control={<Radio />}
                        label="ลากิจ (เต็มวัน)"
                      />
                      <FormControlLabel
                        value="schoolWork"
                        control={<Radio />}
                        label="งานโรงเรียน"
                      />
                    </RadioGroup>
                  </FormControl>
                )}

                {/* ========================== */}
                {/* ออกนอกสถานที่ */}
                {/* ========================== */}
                {typeLeave === "outOfPlace" && (
                  <FormControl
                    fullWidth
                    sx={{
                      mb: 2,
                    }}
                  >
                    <RadioGroup
                      row
                      aria-labelledby="subTypeLeave"
                      name="subTypeLeave"
                      onChange={handleSubTypeChange}
                    >
                      <FormControlLabel
                        value="order"
                        control={<Radio />}
                        label="นอกสถานที่ (ตามคำสั่ง)"
                      />
                      <FormControlLabel
                        value="duty"
                        control={<Radio />}
                        label="นอกสถานที่ (ตามหน้าที่)"
                      />
                      <FormControlLabel
                        value="personal"
                        control={<Radio />}
                        label="นอกสถานที่ (ธุระส่วนตัว)"
                      />
                    </RadioGroup>
                  </FormControl>
                )}

                {/* ========================== */}
                {/* วันที่ลา */}
                {/* ========================== */}
                <Grid container spacing={2}>
                  <Grid item lg={6} md={6} xs={12}>
                    <FormControl
                      fullWidth
                      sx={{
                        mb: 2,
                        mt: 2,
                      }}
                    >
                      <LocalizationProvider
                        dateAdapter={AdapterDateFns}
                        adapterLocale={thLocale}
                      >
                        <DatePicker
                          timezone="UTC"
                          label="ตั้งแต่วันที่"
                          value={dateStart}
                          onChange={(newValue: any) => setDateStart(newValue)}
                        />
                      </LocalizationProvider>
                    </FormControl>
                  </Grid>
                  <Grid item lg={6} md={6} xs={12}>
                    <FormControl
                      fullWidth
                      sx={{
                        mb: 2,
                        mt: 2,
                      }}
                    >
                      <LocalizationProvider
                        dateAdapter={AdapterDateFns}
                        adapterLocale={thLocale}
                      >
                        <DatePicker
                          timezone="UTC"
                          label="ถึงวันที่"
                          minDate={dateStart}
                          value={dateEnd}
                          onChange={(newValue: any) => setDateEnd(newValue)}
                        />
                      </LocalizationProvider>
                    </FormControl>
                  </Grid>
                </Grid>

                {/* ========================== */}
                {/* เวลาที่ลา */}
                {/* ========================== */}
                {typeLeave === "outOfPlace" && (
                  <Grid container spacing={2}>
                    <Grid item lg={6} md={6} xs={12}>
                      <FormControl
                        fullWidth
                        sx={{
                          mb: 2,
                          mt: 2,
                        }}
                      >
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <TimePicker
                            label="เวลาเข้า"
                            ampm={false}
                            value={timeStart}
                            onChange={(e: any) => setTimeStart(e)}
                          />
                        </LocalizationProvider>
                      </FormControl>
                    </Grid>
                    <Grid item lg={6} md={6} xs={12}>
                      <FormControl
                        fullWidth
                        sx={{
                          mb: 2,
                          mt: 2,
                        }}
                      >
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <TimePicker
                            label="เวลาออก"
                            ampm={false}
                            value={timeEnd}
                            minTime={timeStart}
                            onChange={(e: any) => setTimeEnd(e)}
                          />
                        </LocalizationProvider>
                      </FormControl>
                    </Grid>
                  </Grid>
                )}

                {/* ========================== */}
                {/* สาเหตุการลา */}
                {/* ========================== */}
                <FormControl
                  fullWidth
                  sx={{
                    mb: 2,
                  }}
                >
                  <TextField
                    required
                    id="causeOfLeave"
                    label="สาเหตุการลา"
                    variant="standard"
                    onChange={(e: any) => setCauseOfLeave(e.target.value)}
                  />
                </FormControl>

                {/* ========================== */}
                {/* ครูผู้แทน */}
                {/* ========================== */}
                <FormControl
                  fullWidth
                  sx={{
                    mb: 2,
                  }}
                >
                  <Autocomplete
                    clearOnEscape
                    autoHighlight
                    id="codeTeacherExchange"
                    fullWidth
                    options={teacher}
                    getOptionLabel={(option: Teacher) =>
                      option.firstName + " " + option.lastName || ""
                    }
                    filterOptions={filterOptions}
                    // value={value}
                    onChange={(_event, newValue) => {
                      setCodeTeacherExchange(newValue?.code || 0);
                      console.log(newValue?.code || 0);
                    }}
                    getOptionDisabled={(option: Teacher) =>
                      option.code === codeTeacher
                    }
                    renderInput={(params) => (
                      <TextField {...params} label="แลกการสอนกับ" />
                    )}
                  />
                </FormControl>
                <Box sx={{ textAlign: "center", alignItems: "center" }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleSubmit}
                    sx={{
                      width: "400px",
                      height: "50px",
                      fontSize: "1.7rem",
                      borderRadius: "0.7rem",
                    }}
                  >
                    บันทึก
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AddLeaveForm;
