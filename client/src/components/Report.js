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

    doc.text("Safety Observation System - Summary Report", 20, 60);

    let i = 100;
    doc.text("A. By Type", 20, i);
    i += 20;

    bytype.map((t, idx) => {
      doc.text(`${idx + 1}. ${t.name}: ${t.count}`, 40, i);
      i += 20;
    });

    i += 20;
    doc.text("B. By Act", 20, i);

    i += 20;

    byact.map((t, idx) => {
      doc.text(`${idx + 1}. ${t.name}: ${t.count}`, 40, i);
      i += 20;
    });

    i += 20;
    doc.text("C. By Condition", 20, i);
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
