"use client";

import { toast } from "sonner";
import {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
  type Dispatch,
} from "react";
import normalizeToSeconds from "@/lib/normalizeToSeconds";

interface ScheduleProviderProps {
  children: ReactNode;
}

type State = {
  callDuration: number;
  callGap: number;
  callStartTime: number;
  callEndTime: number;
  callDate: number;
  batchNumber: number;
  MIN_CALL_DURATION: number;
  MAX_CALL_DURATION: number;
  MIN_CALL_GAP: number;
  MAX_CALL_GAP: number;
};

type Action =
  | { type: "SET_CALL_DURATION"; payload: { type: "duration"; value: number } }
  | { type: "SET_CALL_GAP"; payload: { type: "duration"; value: number } }
  | {
      type: "SET_CALL_START";
      payload: { type: "time" | "datetime"; value: string };
    }
  | {
      type: "SET_CALL_END";
      payload: { type: "time" | "datetime"; value: string };
    }
  | { type: "SET_CALL_DATE"; payload: { type: "date"; value: string } }
  | { type: "SET_BATCH_NUMBER"; payload: string }
  | { type: "RESET"; payload: {} };

interface ScheduleContextValue {
  state: State;
  dispatch: Dispatch<Action>;
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_CALL_DURATION":
      return {
        ...state,
        callDuration: normalizeToSeconds("duration", action.payload.value),
      };

    case "SET_CALL_GAP":
      return {
        ...state,
        callGap: normalizeToSeconds("duration", action.payload.value),
      };

    case "SET_CALL_START":
      return {
        ...state,
        callStartTime: normalizeToSeconds(
          action.payload.type,
          action.payload.value
        ),
      };

    case "SET_CALL_END":
      return {
        ...state,
        callEndTime: normalizeToSeconds(
          action.payload.type,
          action.payload.value
        ),
      };

    case "SET_CALL_DATE":
      return {
        ...state,
        callDate: normalizeToSeconds("date", action.payload.value),
      };

    case "SET_BATCH_NUMBER":
      return {
        ...state,
        batchNumber: Number(action.payload),
      };

    case "RESET":
      return DEFAULT_STATE;

    default:
      return state;
  }
};

const DEFAULT_STATE: State = {
  // Default values are in seconds
  callDuration: 150,
  callGap: 10,
  callStartTime: 0,
  callEndTime: 0,
  callDate: 0,
  batchNumber: 7,
  MIN_CALL_DURATION: 150,
  MAX_CALL_DURATION: 600,
  MIN_CALL_GAP: 5,
  MAX_CALL_GAP: 15,
};

const ScheduleContext = createContext<ScheduleContextValue | null>(null);

export default function ScheduleProvider({ children }: ScheduleProviderProps) {
  const [state, dispatch] = useReducer(reducer, DEFAULT_STATE);

  return (
    <ScheduleContext.Provider value={{ state, dispatch }}>
      {children}
    </ScheduleContext.Provider>
  );
}

export function useSchedule() {
  const context = useContext(ScheduleContext);
  if (!context) {
    toast.error("useSchedule must be used within a ScheduleProvider");
    throw new Error("useSchedule must be used within a ScheduleProvider");
  }
  return context;
}
