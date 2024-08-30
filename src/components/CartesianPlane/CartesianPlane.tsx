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
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "@/store/store";
import { useCallback, useEffect, useState } from "react";
import { getLocalStorageItem } from "@/utils/localStorage";
import { getDirectionByRove } from "@/store/features/rover-slice";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CartesianPlane = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [eixos, setEixos] = useState({
        x: 0,
        y: 0
    })
    const { result, direction } = useSelector((state: RootState) => state.rover);
    const [data, setData] = useState({
        datasets: [
            {
                label: "Rover 1",
                data: [] as { x: number | null, y: number | null }[],
                backgroundColor: "rgb(255, 0, 55)",
                borderColor: "rgb(255, 99, 132)",
                borderWidth: 1,
                pointRadius: 5,
            },
            {
                label: "Rover 2",
                data: [] as { x: number, y: number }[],
                backgroundColor: "rgb(0, 217, 255)",
                borderColor: "rgb(8, 175, 253)",
                borderWidth: 1,
                pointRadius: 5,
            },
            {
                label: "Past Rover 1",
                data: [] as { x: number | null, y: number | null }[],
                backgroundColor: "rgba(255, 93, 193, 0.507)",
                borderColor: "rgba(114, 114, 113, 0.507)",
                borderWidth: 1,
                pointRadius: 5,
            },
            {
                label: "Past Rover 2",
                data: [] as { x: number, y: number }[],
                backgroundColor: "rgba(136, 253, 247, 0.397)",
                borderColor: "rgba(112, 112, 112, 0.397)",
                borderWidth: 1,
                pointRadius: 5,
            },
        ],
    });
    const options = {
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
                max: eixos.x,
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
                max: eixos.y,
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

    useEffect(() => {

        if (result.route) {
            setData(prevData => {
                const newData = { ...prevData };
                const { x, y } = result.route.coordinates;

                if (result.route.rover === 1) {
                    newData.datasets[0].label = `Rover 1 - ${result.route.direction}`
                    newData.datasets[0].data = [...newData.datasets[0].data, { x, y }];
                }

                if (result.route.rover === 2) {
                    newData.datasets[1].label = `Rover 2 - ${result.route.direction}`
                    newData.datasets[1].data = [...newData.datasets[1].data, { x, y }];
                }

                return newData;
            });
        }


    }, [result]);

    useEffect(() => {
        const existingPlateauSize = getLocalStorageItem('plateauSize') ?? ''
        if (existingPlateauSize) {
            const [plateauX, plateauY] = existingPlateauSize.split(" ").map(Number);
            setEixos({ x: plateauX, y: plateauY })
        }

        if (result && existingPlateauSize) {
            getDirectionRover(result.route.rover!, existingPlateauSize)
        }
    }, [result])

    const getDirectionRover = useCallback(async (rover: number, plateauSize: string) => {
        try {
            await dispatch(
                getDirectionByRove({ plateauSize, rover })
            )
        } catch (error) {
            console.log(error);
        }
    }, [result])

    useEffect(() => {
        if (result) {
            setData(prevData => {
                const newData = { ...prevData };

                const dataset = newData.datasets.find(dataset =>
                    dataset.label === `Past ${direction.rover}`
                );

                if (dataset) {
                    dataset.data = [
                        ...dataset.data,
                        ...direction.positions
                    ];
                }

                return newData;
            });
        }
    }, [direction])

    useEffect(() => {
        const rover1 = getLocalStorageItem('Rover-1');
        const rover2 = getLocalStorageItem('Rover-2');

        if (result.route) {
            setData(prevData => {
                const newData = { ...prevData };

                if (rover1) {
                    const label1 = `Rover-1 init:${rover1.position}`;
                    if (!newData.datasets.some(dataset => dataset.label === label1)) {
                        const [x, y] = rover1.position.split(" ").map(Number);
                        newData.datasets.push({
                            label: label1,
                            data: [{ x, y }],
                            backgroundColor: "rgb(255, 187, 0)",
                            borderColor: "rgba(255, 255, 255, 0.5)",
                            borderWidth: 1,
                            pointRadius: 5,
                        });
                    }
                }

                if (rover2) {
                    const label2 = `Rover-2 init:${rover2.position}`;
                    if (!newData.datasets.some(dataset => dataset.label === label2)) {
                        const [x, y] = rover2.position.split(" ").map(Number);
                        newData.datasets.push({
                            label: label2,
                            data: [{ x, y }],
                            backgroundColor: "rgb(25, 255, 4)",
                            borderColor: "rgba(255, 255, 255, 0.5)",
                            borderWidth: 1,
                            pointRadius: 5,
                        });
                    }
                }

                return newData;
            });
        }
    }, [])

    return (
        <div className="w-1/2 shadow-md p-4">
            <Scatter key={JSON.stringify(data)} data={data} options={options} />
        </div>
    );
};

export default CartesianPlane;
