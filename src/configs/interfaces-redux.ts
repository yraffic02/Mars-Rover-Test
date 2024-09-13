import { Logs } from "@prisma/client";
import { Coordinates, Dataset } from "./interfaces";

export interface LogsStates {
    data: Logs[];
    loading: boolean;
    error: string | null;
}

export interface RoverState {
    result:{
      route: {
        rover: number |null
        coordinates: {
          x: number | null,
          y: number | null
        },
        direction: string
      },
      status: number | null
    };
    direction: {
      positions: [],
      rover: string
    },
    loading: boolean;
    error: string | null;
}

export interface CartesianState {
  datasets: Dataset[];
  loading: boolean;
  error: string | null;
  eixos: Coordinates
}