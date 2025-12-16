import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { jsPDF } from "jspdf";
import {
  Clipboard,
  Link45deg,
  Download,
  CheckCircle,
  ExclamationCircle,
} from "react-bootstrap-icons";
import { Button } from "react-bootstrap";
import { fetchCertificateById } from "../../../Services/FetchContent";

const CertificateVerificationPage = () => {
const { certificateId } = useParams();
  const location = useLocation();
  const initialData = location.state?.result || null;
  const userName =  "";

  const [result, setResult] = React.useState(initialData);

  // Fetch data only if result is not available from state
  useEffect(() => {
    if (!result) {
      const fetchData = async () => {
        const response = await fetchCertificateById(certificateId);
        console.log("Fetched Certificate Data:", response.data.certificates[0]);
        setResult(response.data.certificates[0]);
      };

      fetchData();
    }
  }, [certificateId, result]);

 // Show loading until data arrives
  if (!result) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "300px" }}>
        <h5>Loading certificate...</h5>
      </div>
    );
  }

  const url = `http://localhost:5173/certificates/${result.certificateId}`;
  const iframeUrl = `http://localhost:5173/certificates/iframe/${result.certificateId}`;

  const certificateLink = result.certificateUrl || "";
  const courseName = result.courseName || "Unknown Course";
  const certificateTitle = `${courseName} Certification`;
  const percent = result.score ?? null;

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Copied!");
    } catch {
      alert("Failed to copy");
    }
  };

  const handleDownload = async () => {
    try {
      if (!certificateLink) return alert("No certificate available");

      // Fetch certificate image
      const response = await fetch(certificateLink);
      const blob = await response.blob();
      const imgData = await blobToBase64(blob);

      // Create PDF
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Add the image to PDF
      pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pageHeight);

      // Download PDF
      pdf.save(`${courseName.replace(/\s+/g, "_")}_certificate.pdf`);
    } catch (error) {
      console.error("PDF error:", error);
      alert("Failed to generate PDF");
    }
  };

  // Helper function
  const blobToBase64 = (blob) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  };

  const handleAddToLinkedIn = () => {
  const linkedInUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME
    &name=${encodeURIComponent(courseName)}
    &organizationName=${encodeURIComponent("Learn Code")}
    &issueYear=${new Date(result.date).getFullYear()}
    &issueMonth=${new Date(result.date).getMonth() + 1}
    &expiration=0
    &certId=${encodeURIComponent(result.certificateId)}
    &certUrl=${encodeURIComponent(url)}
  `.replace(/\s+/g, "");

  window.open(linkedInUrl);
};

  return (
    <div
      className="container py-4 mt-5"
      style={{ maxWidth: "100%", paddingInline: "2rem" }}
    >
      <div className="d-flex row g-4">
        {/* LEFT SIDE */}
        <div style={{ width: "55%" }}>
          <div
            className="d-flex justify-content-center align-items-center bg-white rounded p-3"
            style={{ minHeight: 380 }}
          >
            {certificateLink ? (
              <img
                src={certificateLink}
                alt="Certificate"
                className="img-fluid rounded"
                style={{
                  maxHeight: 520,
                  boxShadow: "0 8px 30px rgba(17,24,39,0.08)",
                }}
              />
            ) : (
              <p className="text-muted">No certificate image available</p>
            )}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div style={{ width: "45%" }}>
          <div className="p-3 h-100">
            <div className="card-body d-flex flex-column">
              <div className="mb-3">
                <h3 className="fw-bold text-capitalize">{certificateTitle}</h3>
                <small className="text-muted">Issued to:</small>
                <div className="fw-semibold">{result.candidateName}</div>
              </div>

              <div className="d-flex align-items-center justify-content-between mb-3">
                <div>
                  <small className="text-muted">Completion</small>
                  <div className="fw-semibold">
                    {percent !== null ? `${percent}%` : "N/A"}
                  </div>
                </div>

                <div className="text-end">
                  <small className="text-muted">Issued</small>
                  <div className="fw-semibold">{result.date}</div>
                </div>
              </div>

              <div className="mb-3">
                <span className="badge bg-info mb-2">{courseName}</span>
                <p className="text-muted small">
                  This certificate confirms successful course completion.
                </p>
              </div>

              {/* SHARE LINK */}
              <div className="mb-3">
                <label className="form-label small text-muted">
                  Shareable Link
                </label>
                <div className="input-group">
                  <input
                    type="text"
                    value={url}
                    readOnly
                    className="form-control"
                  />
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => handleCopy(url)}
                  >
                    <Clipboard />
                  </button>
                </div>
              </div>

              {/* EMBED CODE */}
              <div className="mb-3">
                <label className="form-label small text-muted">
                  Embed Code
                </label>
                <div className="input-group">
                  <input
                    type="text"
                    value={iframeUrl}
                    readOnly
                    className="form-control"
                  />
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() =>
                      handleCopy(
                        `<iframe src="${url}" width="100%" height="600px"></iframe>`
                      )
                    }
                  >
                    <Link45deg />
                  </button>
                </div>
              </div>

              <div className="d-flex gap-3">
              <Button className="btn btn-primary mb-3 mt-2" style={{width:"12rem"}} onClick={handleAddToLinkedIn}>
                <i class="bi bi-linkedin"/>  Share on linkedin
              </Button>

              <Button className="btn btn-success mb-3 mt-2" style={{width:"12rem"}} onClick={handleDownload}>
                <i class="bi bi-download"/>   Download
              </Button>
              </div>

              <div className="mt-auto pt-3 border-top">
                <div className="d-flex align-items-center gap-2">
                  <CheckCircle className="text-success" />
                  <small className="text-muted">
                    This certificate was generated and verified by our platform.
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateVerificationPage;
