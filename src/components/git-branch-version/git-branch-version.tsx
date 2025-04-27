import { useState, useEffect } from "react";
import getCurrentBranch from "current-git-branch";

interface GitBranchVersionProps {
  position?:
    | "topLeft"
    | "topCenter"
    | "topRight"
    | "bottomLeft"
    | "bottomCenter"
    | "bottomRight";
  backgroundColor?: string;
  textColor?: string;
  showVersion?: boolean;
  classes?: {
    container?: string;
    icon?: string;
    divider?: string;
  };
  style?: React.CSSProperties;
  gitBranch?: string;
  appVersion?: string;
}

export default function GitBranchVersion({
  position = "bottomLeft",
  backgroundColor = "rgba(0, 0, 0, 0.7)",
  textColor = "white",
  showVersion = true,
  classes = {},
  style,
  gitBranch = "",
  appVersion = "",
}: GitBranchVersionProps) {
  const [branch, setBranch] = useState(gitBranch);
  const [version, setVersion] = useState(appVersion);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        setIsLoading(true);

        // Get the current branch using the current-git-branch package
        const branchName = getCurrentBranch() as unknown as string;

        if (!branchName) {
          throw new Error("It seems you are not in a git repository");
        }

        setBranch(branchName);

        // Get package version
        try {
          // Try to dynamically import package.json to get version
          // This approach works with many build systems like webpack
          const packageJson = require("../package.json");
          setVersion(packageJson.version || "");
        } catch (versionErr) {
          console.warn("Could not load package version:", versionErr);
          setVersion("unknown");
        }

        // Log branch name if not main or master
        if (!["main", "master"].includes(branchName.toLowerCase())) {
          console.log(`Current git branch: ${branchName}`);
          if (version) {
            console.log(`Package version: ${version}`);
          }
        }
      } catch (err) {
        console.error("Error fetching git branch:", err);
        setError("Failed to load branch");
      } finally {
        setIsLoading(false);
      }
    };

    fetchInfo();
  }, []);

  // Determine if the chip should be visible
  const shouldBeVisible = !(
    isLoading ||
    error ||
    ["main", "master"].includes(branch.toLowerCase())
  );

  // Calculate position styles based on prop
  const getPositionStyle = () => {
    switch (position) {
      case "topLeft":
        return { top: "1rem", left: "1rem" };
      case "topCenter":
        return { top: "1rem", left: "50%", transform: "translateX(-50%)" };
      case "topRight":
        return { top: "1rem", right: "1rem" };
      case "bottomLeft":
        return { bottom: "1rem", left: "1rem" };
      case "bottomCenter":
        return { bottom: "1rem", left: "50%", transform: "translateX(-50%)" };
      case "bottomRight":
        return { bottom: "1rem", right: "1rem" };
      default:
        return { bottom: "1rem", left: "1rem" };
    }
  };

  const containerStyle = {
    position: "fixed",
    display: "flex",
    alignItems: "center",
    padding: "0.25rem 0.75rem",
    borderRadius: "9999px",
    fontFamily: "monospace",
    fontSize: "0.875rem",
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
    zIndex: 9999,
    backgroundColor,
    color: textColor,
    // Hide with CSS instead of removing from DOM
    visibility: shouldBeVisible ? "visible" : "hidden",
    opacity: shouldBeVisible ? 1 : 0,
    transition: "opacity 0.3s ease",
    ...getPositionStyle(),
    ...style,
  } as React.CSSProperties;

  const iconStyle = {
    width: "1rem",
    height: "1rem",
    marginRight: "0.25rem",
  };

  const dividerStyle = {
    margin: "0 0.25rem",
    opacity: 0.6,
  };

  return (
    <div style={containerStyle} className={classes.container}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={iconStyle}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className={classes.icon}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 16l-6-6 6-6m6 12l6-6-6-6"
        />
      </svg>
      {branch}
      {showVersion && version && (
        <>
          <span style={dividerStyle} className={classes.divider}>
            |
          </span>
          <span>v{version}</span>
        </>
      )}
    </div>
  );
}
