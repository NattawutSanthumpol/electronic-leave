import {
  PDFViewer,
  PDFDownloadLink,
  Font,
} from "@react-pdf/renderer";
import { TemplateOutOfPlace, TemplateSickLeave } from "../components/ReportPDF";
import { Box, Button, Container, Grid } from "@mui/material";

const ViewReport = () => {
  Font.register({
    family: "THSarabunNew",
    src: "fonts/THSarabunNew.ttf",
    // src: "../assets/fonts/THSarabunNew.ttf",
  });

  const getLeave = localStorage.getItem("leave");
  const leaveItem = getLeave ? JSON.parse(getLeave) : undefined;

  const fileNamePDF =
    leaveItem.type === "sickLeave"
      ? leaveItem.code +
        "_" +
        "_ใบลาป่วย-กิจ_" +
        formatDate(leaveItem.createDate.seconds) +
        ".pdf"
      : leaveItem.code +
        "_" +
        "_ใบลาขอออกนอกสถานที่_" +
        formatDate(leaveItem.createDate.seconds) +
        ".pdf";

  function formatDate(date: number) {
    const d = new Date(date * 1000);
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    const year: number = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  return (
    <Box
      component="div"
      m={1}
      sx={{ width: "100%", height: "90vh", display: "flex" }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          {leaveItem && (
            <>
              <Grid item xs={12} sx={{ height: "90vh" }}>
                {/* <BlobProvider
                  document={
                    <TemplateSickLeave
                      leave={leaveItem}
                      fileNamePDF={fileNamePDF}
                    />
                  }
                >
                  {({ blob, url, loading }) => {
                    return loading && (
                      <TemplateSickLeave
                        leave={leaveItem}
                        fileNamePDF={fileNamePDF}
                      />
                    )
                  }}
                </BlobProvider> */}

                <PDFViewer
                  showToolbar={false}
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                >
                  {leaveItem.type === "sickLeave" ? (
                    <TemplateSickLeave
                      leave={leaveItem}
                      fileNamePDF={fileNamePDF}
                    />
                  ) : (
                    <TemplateOutOfPlace
                      leave={leaveItem}
                      fileNamePDF={fileNamePDF}
                    />
                  )}
                </PDFViewer>
              </Grid>
              <Grid
                item
                xs={12}
                justifyContent="center"
                alignItems="center"
                display="flex"
              >
                <Button variant="contained" color="primary">
                  <PDFDownloadLink
                    document={
                      leaveItem.type === "sickLeave" ? (
                        <TemplateSickLeave
                          leave={leaveItem}
                          fileNamePDF={fileNamePDF}
                        />
                      ) : (
                        <TemplateOutOfPlace
                          leave={leaveItem}
                          fileNamePDF={fileNamePDF}
                        />
                      )
                    }
                    fileName={fileNamePDF}
                    style={{
                      textDecoration: "none",
                      color: "#FFFFFF",
                      fontSize: "18px",
                    }}
                  >
                    {({ loading }) =>
                      loading ? "Loading document..." : "Download PDF"
                    }
                  </PDFDownloadLink>
                </Button>
              </Grid>
            </>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default ViewReport;
