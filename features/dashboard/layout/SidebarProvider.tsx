"use client";

import { logInfo } from "@/lib/logger";
import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";

type ActiveSectionData = {
  value: string;
  type: "accordion" | "link" | "";
};

type SidebarContextType = {
  isExpanded: boolean;
  toggleSidebarCollapse: () => void;
  handlePointerEnter: () => void;
  handlePointerLeave: () => void;
  activeSection: string;
  isCollapsedSidebar: boolean;
  isMouseHovering: boolean;
  handleActiveSection: (incomingItemData: ActiveSectionData) => void;
  hasHydrated: boolean;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export default function SidebarProvider({ children }: { children: ReactNode }) {
  // Initialize with default state to match server-side rendering
  const [isCollapsedSidebar, setIsCollapsedSidebar] = useState(false);
  const [isMouseHovering, setIsMouseHovering] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [hasHydrated, setHasHydrated] = useState(false);

  // Load from localStorage after hydration
  useEffect(() => {
    const loadSidebarState = () => {
      try {
        const appConfig = JSON.parse(localStorage.getItem("appConfig") || "{}");
        logInfo("Loaded appConfig:", appConfig);

        // Only update state if we have a valid boolean value
        if (typeof appConfig.sidebarCollapsed === "boolean") {
          setIsCollapsedSidebar(appConfig.sidebarCollapsed);
        }
      } catch (err) {
        console.error("Failed to parse appConfig:", err);
      } finally {
        setHasHydrated(true);
      }
    };

    // Use setTimeout to ensure this runs after hydration is complete
    const timeoutId = setTimeout(loadSidebarState, 0);

    return () => clearTimeout(timeoutId);
  }, []);

  // Sync to localStorage whenever state changes (only after hydration)
  useEffect(() => {
    if (!hasHydrated) return;

    const saveSidebarState = () => {
      try {
        const existingConfig = JSON.parse(
          localStorage.getItem("appConfig") || "{}"
        );
        const updatedConfig = {
          ...existingConfig,
          sidebarCollapsed: isCollapsedSidebar,
        };
        localStorage.setItem("appConfig", JSON.stringify(updatedConfig));
        logInfo("Saved sidebar state:", isCollapsedSidebar);
      } catch (err) {
        console.error("Failed to save appConfig:", err);
      }
    };

    saveSidebarState();
  }, [isCollapsedSidebar, hasHydrated]);

  const toggleSidebarCollapse = () => {
    setIsCollapsedSidebar((prev) => !prev);
  };

  const handlePointerEnter = () => {
    setIsMouseHovering(true);
  };

  const handlePointerLeave = () => {
    setIsMouseHovering(false);
  };

  const handleActiveSection = (incomingItemData: ActiveSectionData) => {
    if (incomingItemData.type === "accordion") {
      setActiveSection((prev) =>
        prev === incomingItemData.value ? "" : incomingItemData.value
      );
    } else {
      setActiveSection(incomingItemData.value);
    }
  };

  // Calculate isExpanded - this ensures consistent behavior
  const isExpanded = !isCollapsedSidebar || isMouseHovering;

  const contextValue: SidebarContextType = {
    isExpanded,
    toggleSidebarCollapse,
    handlePointerEnter,
    handlePointerLeave,
    handleActiveSection,
    activeSection,
    isCollapsedSidebar,
    isMouseHovering,
    hasHydrated,
  };

  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}
