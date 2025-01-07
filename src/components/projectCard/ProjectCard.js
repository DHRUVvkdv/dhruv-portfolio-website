import React, { useState, useCallback } from "react";
import ProjectLanguages from "../projectLanguages/ProjectLanguages";
import { Fade } from "react-reveal";
import { FaPlay, FaExternalLinkAlt } from "react-icons/fa";
import "./ProjectCard.css";
import ProjectModal from "./ProjectModal";

export default function ProjectCard({ repo, theme }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openRepoinNewTab = useCallback((url, e) => {
    e && e.stopPropagation();
    const win = window.open(url, "_blank");
    win.focus();
  }, []);

  const handleModalToggle = useCallback((e) => {
    e && e.stopPropagation();
    setIsModalOpen((prev) => !prev);
  }, []);

  return (
    <>
      <div
        className="repo-card-div"
        style={{ backgroundColor: theme.highlight }}
        onClick={(e) => e.stopPropagation()}
      >
        <Fade bottom duration={2000} distance="40px">
          <div>
            {repo.video && (
              <div className="video-preview">
                <img src={repo.thumbnail} alt={repo.name} />
                <button
                  className="play-button"
                  onClick={handleModalToggle}
                  style={{ backgroundColor: theme.text }}
                >
                  <FaPlay color={theme.body} />
                </button>
              </div>
            )}

            {repo.date && (
              <div
                className="repo-date-badge"
                style={{
                  backgroundColor: `${theme.text}15`,
                  color: theme.text,
                }}
              >
                {repo.date}
              </div>
            )}

            <div
              className="repo-name-div"
              onClick={(e) => openRepoinNewTab(repo.url, e)}
            >
              <svg
                aria-hidden="true"
                className="octicon repo-svg"
                height="20"
                role="img"
                viewBox="0 0 12 16"
                width="16"
                style={{ color: theme.text }}
              >
                <path
                  fillRule="evenodd"
                  d="M4 9H3V8h1v1zm0-3H3v1h1V6zm0-2H3v1h1V4zm0-2H3v1h1V2zm8-1v12c0 .55-.45 1-1 1H6v2l-1.5-1.5L3 16v-2H1c-.55 0-1-.45-1-1V1c0-.55.45-1 1-1h10c.55 0 1 .45 1 1zm-1 10H1v2h2v-1h3v1h5v-2zm0-10H2v9h9V1z"
                ></path>
              </svg>
              <p className="repo-name" style={{ color: theme.text }}>
                {repo.name}
              </p>
            </div>

            <p className="repo-description" style={{ color: theme.text }}>
              {repo.description}
            </p>

            {repo.impact && (
              <p className="repo-impact" style={{ color: theme.text }}>
                {Array.isArray(repo.impact)
                  ? repo.impact.map((point, index) => (
                      <span key={index} className="impact-point">
                        {point}
                        {index < repo.impact.length - 1 && <br />}
                      </span>
                    ))
                  : repo.impact}
              </p>
            )}

            <div className="repo-languages">
              <ProjectLanguages
                className="repo-languages"
                logos={repo.languages}
              />
            </div>

            <div className="repo-actions">
              {repo.live && (
                <button
                  className="live-button"
                  onClick={(e) => openRepoinNewTab(repo.live, e)}
                >
                  <FaExternalLinkAlt /> Live Demo
                </button>
              )}
              <button
                className="details-button"
                onClick={handleModalToggle}
                style={{
                  flex: repo.live ? "1" : "2",
                  maxWidth: repo.live ? "180px" : "360px",
                }}
              >
                Learn More
              </button>
            </div>
          </div>
        </Fade>
      </div>

      <ProjectModal
        project={repo}
        theme={theme}
        isOpen={isModalOpen}
        onClose={handleModalToggle}
      />
    </>
  );
}
