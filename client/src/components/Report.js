import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import NavBar from "./NavBar";
import SideMenu from "./SideMenu";
import Footer from "./Footer";

export default function Report() {
  const [bytype, setByType] = useState([]);
  const [byact, setByAct] = useState([]);
  const [bycondition, setByCondition] = useState([]);

  useEffect(() => {
    const fetchByType = async () => {
      try {
        const response = await axios.get("/api/sos/stats");
        setByType(response.data);
        console.log("By Type stats: ", response.data);
      } catch (err) {
        console.log(err);
      }
    };
    const fetchByAct = async () => {
      try {
        const response = await axios.get("/api/sos/stats2");
        setByAct(response.data);
        console.log("By Act stats: ", response.data);
      } catch (err) {
        console.log(err);
      }
    };
    const fetchByCondition = async () => {
      try {
        const response = await axios.get("/api/sos/stats1");
        setByCondition(response.data);
        console.log("By Condition stats: ", response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchByType();
    fetchByAct();
    fetchByCondition();
  }, []);

  const generatePDF = () => {
    var doc = new jsPDF("p", "pt");
    const imgData =
      "data:image/png;base64,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";
    console.log(doc.getFontList());
    doc.addImage(imgData, 20, 30);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Safety Observation System - Summary Report", 120, 60);
    doc.line(20, 110, 580, 110);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    let i = 140;
    doc.text("A. By Type", 20, i);
    i += 20;

    bytype.map((t, idx) => {
      doc.text(`${idx + 1}. ${t.name}: ${t.count}`, 40, i);
      i += 20;
    });

    i += 20;
    doc.text("B. By Unsafe Act", 20, i);

    i += 20;

    byact.map((t, idx) => {
      doc.text(`${idx + 1}. ${t.name}: ${t.count}`, 40, i);
      i += 20;
    });

    i += 20;
    doc.text("C. By Unsafe Condition", 20, i);
    i += 20;
    bycondition.map((t, idx) => {
      doc.text(`${idx + 1}. ${t.name}: ${t.count}`, 40, i);
      i += 20;
    });
    // doc.text(20, 20, "This is the first title.");
    // doc.addFont("helvetica", "normal");
    // doc.text(20, 60, "This is the second title.");
    // doc.text(20, 100, "This is the thrid title.");

    doc.save("SOS_Summary_Report.pdf");
  };

  return (
    <>
      <NavBar />
      <Container fluid>
        <Row>
          <Col lg={2}>
            <SideMenu />
          </Col>
          <Col>
            <div>
              <Container className="mt-5">
                <Row>
                  <Col lg={4} className="m-auto">
                    <Card>
                      <Card.Header className="bg-primary text-center text-white">
                        <h4>SOS Report</h4>
                      </Card.Header>
                      <Card.Body className="m-auto">
                        <Button variant="primary" onClick={generatePDF}>
                          Download Report
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </div>
          </Col>
        </Row>
        <footer>
          <Footer />
        </footer>
      </Container>
    </>
  );
}
