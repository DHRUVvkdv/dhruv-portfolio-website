import React from "react";
import ProjectLanguages from "../../components/projectLanguages/ProjectLanguages";

export default function ProjectModal({ project, theme, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
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
              <p style={{ color: theme.secondaryText }}>{project.impact}</p>
            </div>
          )}

          <div className="modal-section">
            <h3 style={{ color: theme.text }}>Technologies Used</h3>
            <ProjectLanguages logos={project.languages} />
          </div>
        </div>
      </div>
    </div>
  );
}
