import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import axios from "axios";

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

    doc.save("demo.pdf");
  };

  return (
    <>
      <div>
        <button onClick={generatePDF} type="primary">
          Download PDF
        </button>
      </div>
    </>
  );
}
