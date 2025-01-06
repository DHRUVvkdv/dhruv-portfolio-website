import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "styled-components"; // Add this import
import "./Splash.css";

const SplashScreen = () => {
  const theme = useTheme(); // Access the current theme
  const [phase, setPhase] = useState(0);
  const [terminalText, setTerminalText] = useState({});
  const [showButton, setShowButton] = useState(false);
  const [buttonHovered, setButtonHovered] = useState(false);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  const name = "Dhruv Varshney";
  const username = "";
  const commands = [
    "sudo init --dev",
    "npm install soul",
    "connecting...",
    "hack_time.exe",
    "access = TRUE",
    "run matrix.js",
  ];

  // Matrix rain effect
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current || phase < 1) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      const { width, height } = container.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
      ctx.font = "15px monospace";
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const chars =
      "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
    const columns = Math.floor(canvas.width / 20);
    const drops = new Array(columns).fill(0);

    const matrix = () => {
      // Use theme colors for matrix effect
      ctx.fillStyle = `${theme.dark}0D`; // Adding alpha for fade effect
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = theme.highlight;
      ctx.font = "15px monospace";

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * 20, drops[i] * 20);

        if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(matrix, 50);

    // Initial background
    ctx.fillStyle = theme.splashBg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [phase, theme]);

  // Terminal text animation
  useEffect(() => {
    const typeCommand = async (cmd, index) => {
      for (let i = 0; i <= cmd.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 30));
        setTerminalText((prev) => ({
          ...prev,
          [index]: cmd.substring(0, i),
        }));
      }
      await new Promise((resolve) => setTimeout(resolve, 300));
    };

    const runSequence = async () => {
      setPhase(1);
      for (let i = 0; i < commands.length; i++) {
        await typeCommand(commands[i], i);
      }
      setPhase(2);
      setTimeout(() => setPhase(3), 1000);
      setTimeout(() => setShowButton(true), 2000);
    };

    runSequence();
  }, []);

  const handleEnterPortfolio = () => {
    setPhase(4);
    setTimeout(() => {
      window.location.href = "/home";
    }, 800);
  };

  return (
    <div
      ref={containerRef}
      className="container"
      style={{ backgroundColor: theme.splashBg }}
    >
      <canvas ref={canvasRef} className="matrix-canvas" />

      <div className="scanlines"></div>

      <div className="content">
        <div className={`terminal ${phase >= 1 ? "visible" : ""}`}>
          <div className="terminal-header">
            <div className="terminal-button red"></div>
            <div className="terminal-button yellow"></div>
            <div className="terminal-button green"></div>
            <span className="terminal-title">portfolio.exe</span>
          </div>

          <div className="terminal-body">
            {Object.entries(terminalText).map(([index, text]) => (
              <div key={index} className="terminal-line">
                <span className="terminal-prompt">$</span>
                <span className="terminal-text">{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={`name-section ${phase >= 2 ? "visible" : ""}`}>
          <h1 className="main-title">
            {name.split("").map((char, i) => (
              <span
                key={i}
                className="glitch-char"
                style={{
                  animationDelay: `${i * 0.05}s`,
                  opacity: 0,
                }}
              >
                {char}
              </span>
            ))}
          </h1>

          <div className="username-container">
            <span className={`username ${phase >= 3 ? "slide-up" : ""}`}>
              {username}
            </span>
          </div>
        </div>

        <div className={`button-section ${showButton ? "visible" : ""}`}>
          <button
            onClick={handleEnterPortfolio}
            onMouseEnter={() => setButtonHovered(true)}
            onMouseLeave={() => setButtonHovered(false)}
            className="cyberpunk-button"
          >
            <span className="button-content">
              <span>&lt;</span>
              ENTER_CYBERSPACE
              <span>/&gt;</span>
            </span>
            <div className="button-background"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
