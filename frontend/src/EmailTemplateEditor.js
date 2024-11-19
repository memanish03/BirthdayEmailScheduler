import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import "./EmailTemplateEditor.css";

const EmailTemplateEditor = () => {
  // State management
  const [recipientName, setRecipientName] = useState("");
  const [message, setMessage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const navigate = useNavigate(); // Initialize the navigate function

  // Preview Handler
  const handlePreview = () => {
    setShowPreview(true);
  };

  // Save Email Template Handler
  const handleSaveTemplate = async () => {
    try {
      const emailTemplate = {
        subject: `Happy Birthday ${recipientName || "Friend"}`,
        messageBody: message || "Wishing you a day filled with love and joy!",
        imageUrl: imageUrl || "",
      };

      // POST request to the backend
      const response = await axios.post(
        "http://localhost:8080/api/email-templates",
        emailTemplate
      );

      if (response.status === 200) {
        alert("Email Template saved successfully!");
      }
    } catch (error) {
      console.error("Error saving email template:", error);
      alert("Failed to save email template.");
    }
  };

  // Navigate to Dashboard Handler
  const handleGoToDashboard = () => {
    navigate("/"); // Navigate to the dashboard route
  };

  return (
    <div className="container">
      <h1>Birthday Email Editor</h1>
      <form className="editor-form">
        <div className="form-group">
          <label htmlFor="recipient-name">Recipient's Name:</label>
          <input
            type="text"
            id="recipient-name"
            placeholder="Enter the recipient's name"
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Birthday Message:</label>
          <textarea
            id="message"
            rows="5"
            placeholder="Write your birthday message here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="image-url">Image URL (Optional):</label>
          <input
            type="text"
            id="image-url"
            placeholder="Paste an image URL here"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>

        {/* Buttons Container */}
        <div className="button-container">
          <button
            type="button"
            id="preview-button"
            className="preview-button"
            onClick={handlePreview}
          >
            Preview Email
          </button>
          <button
            type="button"
            className="save-button"
            onClick={handleSaveTemplate}
          >
            Save Template
          </button>
          <button
            type="button"
            className="nav-button"
            onClick={handleGoToDashboard}
          >
            Back to Dashboard
          </button>
        </div>
      </form>

      {/* Email Preview Section */}
      {showPreview && (
        <div id="email-preview" className="email-template">
          <div className="email-header">
            <h2>
              Happy Birthday{" "}
              <span id="preview-name">
                {recipientName ? recipientName : "Friend"}
              </span>
              !
            </h2>
          </div>
          <div className="email-content">
            <p id="preview-message">
              {message || "Wishing you a day filled with love and joy!"}
            </p>
            {imageUrl && (
              <div id="preview-image">
                <img src={imageUrl} alt="Birthday Image" />
              </div>
            )}
          </div>
          <div className="email-footer">
            <p>Warm wishes,</p>
            <p>ABC Group</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailTemplateEditor;
