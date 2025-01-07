import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import ProjectLanguages from "../../components/projectLanguages/ProjectLanguages";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import "./ProjectModal.css";

export default function ProjectModal({ project, theme, isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";

      const handleEsc = (e) => {
        if (e.key === "Escape") {
          onClose(e);
        }
      };

      window.addEventListener("keydown", handleEsc);
      return () => {
        document.body.style.overflow = "unset";
        window.removeEventListener("keydown", handleEsc);
      };
    }
  }, [isOpen, onClose]);

  const openLink = (url) => {
    window.open(url, "_blank");
  };

  if (!isOpen) return null;

  const modalContent = (
    <div
      className="modal-overlay"
      onClick={onClose}
      style={{ cursor: "default" }}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ backgroundColor: theme.highlight }}
      >
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close modal"
          style={{ color: theme.text, backgroundColor: `${theme.text}15` }}
        >
          &times;
        </button>

        {project.video && (
          <div className="modal-video-container">
            <div className="modal-video">
              <video controls>
                <source src={project.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        )}

        <div className="modal-body">
          <div className="modal-header">
            <h2 style={{ color: theme.text }}>{project.name}</h2>
            {project.date && (
              <div
                className="modal-date-badge"
                style={{
                  backgroundColor: `${theme.text}15`,
                  color: theme.text,
                }}
              >
                {project.date}
              </div>
            )}
          </div>

          <div className="modal-actions">
            {project.url && (
              <button
                className="modal-link-button github"
                onClick={() => openLink(project.url)}
                style={{
                  backgroundColor: `${theme.text}15`,
                  color: theme.text,
                }}
              >
                <FaGithub /> View on GitHub
              </button>
            )}
            {project.live && (
              <button
                className="modal-link-button live"
                onClick={() => openLink(project.live)}
                style={{ backgroundColor: "#2563eb" }}
              >
                <FaExternalLinkAlt /> Live Demo
              </button>
            )}
          </div>

          <div className="modal-section">
            <h3 style={{ color: theme.text }}>Overview</h3>
            <p style={{ color: theme.secondaryText }}>
              {project.longDescription}
            </p>
          </div>

          {project.features && (
            <div className="modal-section">
              <h3 style={{ color: theme.text }}>Key Features</h3>
              <ul style={{ color: theme.secondaryText }}>
                {project.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {project.impact && (
            <div className="modal-section">
              <h3 style={{ color: theme.text }}>Impact & Achievements</h3>
              <ul style={{ color: theme.secondaryText }}>
                {Array.isArray(project.impact) ? (
                  project.impact.map((impact, index) => (
                    <li key={index}>{impact.replace(/[•§]/g, "").trim()}</li>
                  ))
                ) : (
                  <li>{project.impact}</li>
                )}
              </ul>
            </div>
          )}

          <div className="modal-section technologies">
            <h3 style={{ color: theme.text }}>Technologies Used</h3>
            <div className="tech-section">
              <ProjectLanguages logos={project.languages} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
