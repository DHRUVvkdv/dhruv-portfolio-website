import React, { Component } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Button from "../../components/button/Button";
import TopButton from "../../components/topButton/TopButton";
import { Fade } from "react-reveal";
import { academicProjectsHeader } from "../../portfolio.js";
import "./AcademicProjects.css";
import ProjectsImg from "./ProjectsImg";

class AcademicProjects extends Component {
  render() {
    const theme = this.props.theme;
    return (
      <div className="projects-main">
        <Header theme={theme} />
        <div className="basic-projects">
          <Fade bottom duration={2000} distance="40px">
            <div className="projects-heading-div">
              <div className="projects-heading-img-div">
                <ProjectsImg theme={theme} />
              </div>
              <div className="projects-heading-text-div">
                <h1
                  className="projects-heading-text"
                  style={{ color: theme.text }}
                >
                  {academicProjectsHeader.title}
                </h1>
                <p
                  className="projects-header-detail-text subTitle"
                  style={{ color: theme.secondaryText }}
                >
                  {academicProjectsHeader["description"]}
                </p>
              </div>
            </div>
          </Fade>
        </div>

        <div className="academic-categories">
          {academicProjectsHeader.categories.map((category, index) => (
            <div key={index} className="category-section">
              <h2 className="category-title" style={{ color: theme.text }}>
                {category.name}
              </h2>
              <div className="repo-cards-div-main">
                {category.projects.map((project, idx) => (
                  <div
                    key={idx}
                    className="academic-project-card"
                    style={{ backgroundColor: theme.highlight }}
                  >
                    <h3 style={{ color: theme.text }}>{project.title}</h3>
                    <p style={{ color: theme.secondaryText }}>
                      {project.description}
                    </p>
                    <div className="project-tech-stack">
                      {project.technologies.map((tech, techIdx) => (
                        <span
                          key={techIdx}
                          className="tech-tag"
                          style={{ backgroundColor: theme.imageHighlight }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <Footer theme={this.props.theme} onToggle={this.props.onToggle} />
        <TopButton theme={this.props.theme} />
      </div>
    );
  }
}

export default AcademicProjects;
