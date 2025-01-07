import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import ProjectLanguages from "../../components/projectLanguages/ProjectLanguages";
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
          style={{ color: theme.text }}
        >
          &times;
        </button>

        {project.video && (
          <div className="modal-video">
            <video controls>
              <source src={project.video} type="video/mp4" />
            </video>
          </div>
        )}

        <div className="modal-body">
          <h2 style={{ color: theme.text }}>{project.name}</h2>

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

          <div className="modal-section">
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
