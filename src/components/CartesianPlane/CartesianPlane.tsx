"use client";

import { Scatter } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";
import { AppDispatch, RootState } from "@/store/store";
import { useCallback, useEffect, useState } from "react";
import { getLocalStorageItem } from "@/utils/localStorage";
import { useDispatch, useSelector } from "react-redux";
import { getDirectionByRove } from "@/store/actions/roverActions";
import { createRoverPosition, updatePastRoverPosition, updateRoverPosition } from "@/store/slices/cartesianSlice";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CartesianPlane = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { result, direction } = useSelector((state: RootState) => state.rover);
    const { datasets, eixos } = useSelector((state: RootState) => state.cartesian);
    let options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
            },
            title: {
                display: true,
                text: "Mars Rover",
            },
        },
        scales: {
            x: {
                min: 0,
                max: eixos.x!,
                ticks: {
                    stepSize: 1,
                },
                title: {
                    display: true,
                    text: "Eixo X",
                },
            },
            y: {
                min: 0,
                max: eixos.y!,
                ticks: {
                    stepSize: 1,
                },
                title: {
                    display: true,
                    text: "Eixo Y",
                },
            },
        },
    };

    const getDirectionRover = useCallback(async (rover: number) => {
        await dispatch(
            getDirectionByRove({ rover })
        )
    }, [result])

    useEffect(() => {
        if (result.route) {
            dispatch(updateRoverPosition({
                direction: result.route.direction,
                rover: result.route.rover!,
                x: result.route.coordinates.x!,
                y: result.route.coordinates.y!
            }))

            getDirectionRover(result.route.rover!);
        }
    }, [result]);

    useEffect(() => {
        if (direction) {
            dispatch(updatePastRoverPosition(
                {
                    positions: direction.positions,
                    rover: direction.rover,
                }
            ))
        }
    }, [direction])

    useEffect(() => {
        const rover1 = getLocalStorageItem('Rover-1');
        const rover2 = getLocalStorageItem('Rover-2');

        if (rover1 && rover2) {
            getDirectionRover(rover1.rover);

            getDirectionRover(rover2.rover);

            dispatch(createRoverPosition({
                color: "rgb(255, 187, 0)",
                rover: { number: "1", position: rover1.position }
            }))

            dispatch(createRoverPosition({
                color: "rgb(25, 255, 4)",
                rover: { number: "2", position: rover2.position }
            }))
        }

    }, [])

    return (
        <div className="w-1/2 shadow-md p-4">
            <Scatter key={JSON.stringify({ datasets })} data={{ datasets }} options={options} />
        </div>
    );
};

export default CartesianPlane;
