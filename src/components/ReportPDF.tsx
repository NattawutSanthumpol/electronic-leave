import { Document, Page, View, Text, Image } from "@react-pdf/renderer";
import imgOutOfPlace from "../assets/img/ใบลานอกสถานที่.png";
import imgSickLeave from "../assets/img/ใบลาลากิจ ลาป่วย.png";
import pdfStyle from "../style";
import { Leave } from "../service/leaveService";
import { FC } from "react";
import { MockData } from "../data";

interface leaveProps {
  leave: Leave;
  fileNamePDF: string;
}
export const TemplateOutOfPlace: FC<leaveProps> = ({ leave,fileNamePDF }) => {
  const fullName = MockData.find((val) => {
    return val.code === leave.code;
  });
  const fullNameExchange = MockData.find((val) => {
    return val.code === leave.exchange;
  });
  const fromDate = leave.dateFrom
    ? new Date(leave.dateFrom).toLocaleDateString("th-TH", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";
  const toDate = leave.dateTo
    ? new Date(leave.dateTo).toLocaleDateString("th-TH", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  let createDate = new Date();
  if (leave && typeof leave.createDate !== "string") {
    const seconds = leave.createDate.seconds;
    createDate = new Date(seconds * 1000);
  }

  return (
    <Document title={fileNamePDF}>
      <Page size="A4" style={pdfStyle.page}>
        <View>
          <Image src={imgOutOfPlace} style={{ position: "relative" }} />

          {/* วันที่พิมพ์ */}
          <Text
            style={[
              pdfStyle.text,
              {
                marginTop: "110px",
                marginLeft: "350px",
              },
            ]}
          >
            {createDate.toLocaleDateString("th-TH", { day: "numeric" })}
          </Text>
          <Text
            style={[
              pdfStyle.text,
              {
                marginTop: "110px",
                marginLeft: "420px",
              },
            ]}
          >
            {createDate.toLocaleDateString("th-TH", { month: "long" })}
          </Text>
          <Text
            style={[
              pdfStyle.text,
              {
                marginTop: "110px",
                marginLeft: "510px",
              },
            ]}
          >
            {createDate.getFullYear() + 543}
          </Text>

          {/* เรื่อง คำสั่ง */}
          {leave.subType === "order" && (
            <Text
              style={[
                pdfStyle.text,
                {
                  marginTop: "131px",
                  marginLeft: "109px",
                  fontSize: "26px",
                },
              ]}
            >
              /
            </Text>
          )}

          {/* เรื่อง หน้าที่ */}
          {leave.subType === "duty" && (
            <Text
              style={[
                pdfStyle.text,
                { marginTop: "131px", marginLeft: "242px", fontSize: "26px" },
              ]}
            >
              /
            </Text>
          )}

          {/* เรื่อง ส่วนตัว */}
          {leave.subType === "personal" && (
            <Text
              style={[
                pdfStyle.text,
                { marginTop: "131px", marginLeft: "383px", fontSize: "26px" },
              ]}
            >
              /
            </Text>
          )}

          {/* ผู้ลา */}
          <Text
            style={[
              pdfStyle.text,
              {
                marginTop: "201px",
                marginLeft: "170px",
              },
            ]}
          >
            {fullName?.firstName} {fullName?.lastName}
          </Text>
          <Text
            style={[
              pdfStyle.text,
              {
                marginTop: "201px",
                marginLeft: "460px",
              },
            ]}
          >
            {leave.position}
          </Text>

          {/* วันที่ลา */}
          <Text
            style={[
              pdfStyle.text,
              {
                marginTop: "222px",
                marginLeft: "170px",
              },
            ]}
          >
            {fromDate}
          </Text>
          <Text
            style={[
              pdfStyle.text,
              {
                marginTop: "222px",
                marginLeft: "380px",
              },
            ]}
          >
            {toDate}
          </Text>

          {/* เวลาออก - เวลาเข้า */}
          <Text
            style={[
              pdfStyle.text,
              {
                marginTop: "245px",
                marginLeft: "200px",
              },
            ]}
          >
            {leave.timeFrom ?
              new Date(leave.timeFrom).toLocaleTimeString("th-TH", {
                hour: "2-digit",
                minute: "2-digit",
              }) : ''}
          </Text>
          <Text
            style={[
              pdfStyle.text,
              {
                marginTop: "245px",
                marginLeft: "400px",
              },
            ]}
          >
            {leave.timeTo ?
              new Date(leave.timeTo).toLocaleTimeString("th-TH", {
                hour: "2-digit",
                minute: "2-digit",
              }) : ''}
          </Text>

          {/* สาเหตุการลา */}
          <Text
            style={[
              pdfStyle.text,
              {
                marginTop: "268px",
                marginLeft: "110",
              },
            ]}
          >
            {leave.causeOfLeave}
          </Text>

          {/* แลกการสอนกับ */}
          <Text
            style={[
              pdfStyle.text,
              {
                marginTop: "313px",
                marginLeft: "170",
              },
            ]}
          >
            {fullNameExchange?.firstName} {fullNameExchange?.lastName}
          </Text>

          {/* ลงนาม */}
          <Text
            style={[
              pdfStyle.text,
              {
                marginTop: "462px",
                marginLeft: "328px",
              },
            ]}
          >
            {fullName?.firstName} {fullName?.lastName}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export const TemplateSickLeave: FC<leaveProps> = ({ leave, fileNamePDF }) => {
    const fullName = MockData.find((val) => {
        return val.code === leave.code;
      });
      const fullNameExchange = MockData.find((val) => {
        return val.code === leave.exchange;
      });
      const fromDate = leave.dateFrom
        ? new Date(leave.dateFrom).toLocaleDateString("th-TH", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        : "";
      const toDate = leave.dateTo
        ? new Date(leave.dateTo).toLocaleDateString("th-TH", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        : "";
    
      let createDate = new Date();
      if (leave && typeof leave.createDate !== "string") {
        const seconds = leave.createDate.seconds;
        createDate = new Date(seconds * 1000);
      }
    
      return (
        <Document title={fileNamePDF}>
          <Page size="A4" style={pdfStyle.page}>
            <View>
              <Image src={imgSickLeave} style={{ position: "relative" }} />
    
              {/* วันที่พิมพ์ */}
              <Text
                style={[
                  pdfStyle.text,
                  {
                    marginTop: "105px",
                    marginLeft: "350px",
                  },
                ]}
              >
                {createDate.toLocaleDateString("th-TH", { day: "numeric" })}
              </Text>
              <Text
                style={[
                  pdfStyle.text,
                  {
                    marginTop: "105px",
                    marginLeft: "420px",
                  },
                ]}
              >
                {createDate.toLocaleDateString("th-TH", { month: "long" })}
              </Text>
              <Text
                style={[
                  pdfStyle.text,
                  {
                    marginTop: "105px",
                    marginLeft: "510px",
                  },
                ]}
              >
                {createDate.getFullYear() + 543}
              </Text>
    
              {/* เรื่อง ป่วย */}
              {leave.subType === "sick" && (
                <Text
                  style={[
                    pdfStyle.text,
                    {
                      marginTop: "118px",
                      marginLeft: "125px",
                      fontSize: "26px",
                    },
                  ]}
                >
                  /
                </Text>
              )}
    
              {/* เรื่อง ครึ่งวัน */}
              {leave.subType === "halfDay" && (
                <Text
                  style={[
                    pdfStyle.text,
                    { marginTop: "118px", marginLeft: "195px", fontSize: "26px" },
                  ]}
                >
                  /
                </Text>
              )}
    
              {/* เรื่อง เต็มวัน */}
              {leave.subType === "fullDay" && (
                <Text
                  style={[
                    pdfStyle.text,
                    { marginTop: "118px", marginLeft: "280px", fontSize: "26px" },
                  ]}
                >
                  /
                </Text>
              )}
    
              {/* เรื่อง งานโรงเรียน */}
              {leave.subType === "schoolWork" && (
                <Text
                  style={[
                    pdfStyle.text,
                    { marginTop: "118px", marginLeft: "364px", fontSize: "26px" },
                  ]}
                >
                  /
                </Text>
              )}
    
              {/* ผู้ลา */}
              <Text
                style={[
                  pdfStyle.text,
                  {
                    marginTop: "185px",
                    marginLeft: "170px",
                  },
                ]}
              >
                {fullName?.firstName} {fullName?.lastName}
              </Text>
              <Text
                style={[
                  pdfStyle.text,
                  {
                    marginTop: "185px",
                    marginLeft: "460px",
                  },
                ]}
              >
                {leave.position}
              </Text>
    
              {/* วันที่ลา */}
              <Text
                style={[
                  pdfStyle.text,
                  {
                    marginTop: "208px",
                    marginLeft: "170px",
                  },
                ]}
              >
                {fromDate}
              </Text>
              <Text
                style={[
                  pdfStyle.text,
                  {
                    marginTop: "208px",
                    marginLeft: "380px",
                  },
                ]}
              >
                {toDate}
              </Text>
    

              {/* สาเหตุการลา */}
              <Text
                style={[
                  pdfStyle.text,
                  {
                    marginTop: "230px",
                    marginLeft: "110",
                  },
                ]}
              >
                {leave.causeOfLeave}
              </Text>
    
              {/* แลกการสอนกับ */}
              <Text
                style={[
                  pdfStyle.text,
                  {
                    marginTop: "277px",
                    marginLeft: "170",
                  },
                ]}
              >
                {fullNameExchange?.firstName} {fullNameExchange?.lastName}
              </Text>
    
              {/* ลงนาม */}
              <Text
                style={[
                  pdfStyle.text,
                  {
                    marginTop: "382px",
                    marginLeft: "328px",
                  },
                ]}
              >
                {fullName?.firstName} {fullName?.lastName}
              </Text>
            </View>
          </Page>
        </Document>
      );
};
