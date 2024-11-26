import React, { useState, useEffect } from "react";
import { FaFingerprint } from "react-icons/fa";

function AuthFingerprintModal({ isOpen, onClose, onSaveFingerprint, userId }) {
  const [scanMessage, setScanMessage] = useState(
    "Place your finger on the scanner."
  );
  const [scanCount, setScanCount] = useState(0);

  useEffect(() => {
    const handleFingerprintScan = async () => {
      try {
        const response = await fetch("http://localhost:8081/scan-status", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();

        if (data.success) {
          setScanCount(data.scanCount);
          setScanMessage(data.message);

          if (data.thresholdReached) {
            setScanMessage("Fingerprints saved successfully!");
            await onSaveFingerprint(userId); // Save fingerprint first
            setTimeout(() => {
              setScanCount(0); // Reset scan count for next use
              onClose(); // Close modal after delay
            });
          }
        } else {
          setScanMessage(
            data.message || "Fingerprint not detected. Try again."
          );
        }
      } catch (error) {
        console.error("Error checking fingerprint scan:", error);
        setScanMessage("An error occurred. Please try again.");
      }
    };

    if (isOpen && scanCount < 5) {
      const interval = setInterval(handleFingerprintScan, 1000);
      return () => clearInterval(interval);
    }
  }, [isOpen, scanCount, userId, onSaveFingerprint, onClose]);

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-[#9CA98D] p-6 rounded-lg shadow-lg w-80">
          <h2 className="text-xl font-bold mb-5 text-center">
            Scanning Fingerprint
          </h2>
          <FaFingerprint className="text-[#000000] text-6xl mx-auto mb-8    " />
          <p className="mb-4 text-center">{scanMessage}</p>
        </div>
      </div>
    )
  );
}

export default AuthFingerprintModal;
