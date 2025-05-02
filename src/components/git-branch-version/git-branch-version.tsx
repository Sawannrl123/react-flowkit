import React from "react";
import getCurrentBranch from "current-git-branch";

export interface GitBranchVersionProps {
  /**
   * The name of the git branch. If not provided, will be detected automatically.
   */
  branchName?: string;
  /**
   * Whether to show the version from package.json
   */
  showVersion?: boolean;
  /**
   * Position of the branch name tag
   */
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  /**
   * Additional CSS styles
   */
  style?: React.CSSProperties;
  /**
   * Additional CSS class names
   */
  className?: string;
}

/**
 * A component that displays the current git branch name and optionally the version from package.json
 * Only shows on non-production branches (not 'main' or 'master')
 */
export function GitBranchVersion({
  branchName,
  showVersion = false,
  position = "top-right",
  style = {},
  className = "",
}: GitBranchVersionProps) {
  let detectedBranch: string | null = null;

  try {
    // Get branch name if not provided
    if (!branchName) {
      const branchResult = getCurrentBranch();
      detectedBranch = typeof branchResult === "string" ? branchResult : null;
    }
  } catch (error) {
    console.error("Failed to detect git branch:", error);
    return null;
  }

  const branch = branchName || detectedBranch;

  // Don't render on main/master branches
  if (!branch || branch === "main" || branch === "master") {
    return null;
  }

  // Get version from package.json if showVersion is true
  let version = null;
  if (showVersion) {
    try {
      const packageJson = require(`${process.cwd()}/package.json`);
      version = packageJson.version;
    } catch (error) {
      console.warn("Failed to load package.json:", error);
    }
  }

  // Determine position styles
  const positionStyles: React.CSSProperties = {};
  switch (position) {
    case "top-right":
      positionStyles.top = "10px";
      positionStyles.right = "10px";
      break;
    case "top-left":
      positionStyles.top = "10px";
      positionStyles.left = "10px";
      break;
    case "bottom-right":
      positionStyles.bottom = "10px";
      positionStyles.right = "10px";
      break;
    case "bottom-left":
      positionStyles.bottom = "10px";
      positionStyles.left = "10px";
      break;
  }

  // Combine styles
  const combinedStyles: React.CSSProperties = {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    color: "#333",
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "12px",
    fontFamily: "monospace",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    position: "fixed",
    zIndex: 9999,
    ...positionStyles,
    ...style,
  };

  return (
    <div className={className} style={combinedStyles}>
      {branch}
      {version && <span style={{ marginLeft: "10px" }}>v{version}</span>}
    </div>
  );
}
