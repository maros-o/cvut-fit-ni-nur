"use client";

import { useState, createContext, useEffect, useCallback } from "react";

type Settings = {
  showEraser: boolean;
  maxSessionTime: number;
  sessionTimeWarningLimit: number;
  numberOfReservedSeatsOnStart: number;
};

type ContextData = {
  setSetting: <K extends keyof Settings>(field: K, value: Settings[K]) => void;
  resetSettings: () => void;
} & Settings;

const SETTINGS_KEY = "settings";

const defaultSettings: Settings = {
  showEraser: true,
  maxSessionTime: 20,
  sessionTimeWarningLimit: 5,
  numberOfReservedSeatsOnStart: 0,
};

export const SettingsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [settingsState, setSettingsState] = useState<Settings>(() => {
    try {
      return JSON.parse(localStorage.getItem(SETTINGS_KEY) as string);
    } catch (error) {
      return defaultSettings;
    }
  });

  const setSetting: ContextData["setSetting"] = useCallback(
    (field, value) =>
      setSettingsState((prev) => {
        const newSettings = { ...prev, [field]: value };
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings));
        return newSettings;
      }),
    []
  );

  const resetSettings: ContextData["resetSettings"] = useCallback(() => {
    setSettingsState(defaultSettings);
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(defaultSettings));
  }, []);

  useEffect(() => {
    const settings = localStorage.getItem(SETTINGS_KEY);
    if (settings) {
      setSettingsState((prev) => ({ ...prev, ...JSON.parse(settings) }));
    } else {
      localStorage.removeItem(SETTINGS_KEY);
    }
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        ...settingsState,
        setSetting,
        resetSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

const SettingsContext = createContext<ContextData>({} as ContextData);

export default SettingsContext;
