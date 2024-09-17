import { CartesianState } from "@/configs/interfaces-redux";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: CartesianState = {
    datasets: [
        {
            label: "Rover 1",
            data: [],
            backgroundColor: "rgb(255, 0, 55)",
            borderColor: "rgb(255, 99, 132)",
            borderWidth: 1,
            pointRadius: 5,
        },
        {
            label: "Rover 2",
            data: [],
            backgroundColor: "rgb(0, 217, 255)",
            borderColor: "rgb(8, 175, 253)",
            borderWidth: 1,
            pointRadius: 5,
        },
        {
            label: "Past Rover 1",
            data: [],
            backgroundColor: "rgba(255, 93, 193, 0.507)",
            borderColor: "rgba(114, 114, 113, 0.507)",
            borderWidth: 1,
            pointRadius: 5,
        },
        {
            label: "Past Rover 2",
            data: [],
            backgroundColor: "rgba(136, 253, 247, 0.397)",
            borderColor: "rgba(112, 112, 112, 0.397)",
            borderWidth: 1,
            pointRadius: 5,
        },
    ],
    loading: false,
    error: null,
    eixos: {
        x: 0,
        y: 0,
    },
};

const roverSlice = createSlice({
    name: "cartesian",
    initialState,
    reducers: {
        setEixos(state, action: PayloadAction<{ x: number, y: number }>) {
            state.eixos = action.payload;
        },
        createRoverPosition(
            state, 
            action: PayloadAction<{
                color: string, 
                rover: {
                    number: string,
                    position: string
                }
            }>){
            const { color, rover} = action.payload;

            const label = `Rover-${rover.number} init:${rover.position}`;

            if (!state.datasets.some(dataset => dataset.label === label)) {
                const [x, y] = rover.position.split(" ").map(Number);
                state.datasets.push({
                    label: label,
                    data: [{ x, y }],
                    backgroundColor: color,
                    borderColor: "rgba(255, 255, 255, 0.5)",
                    borderWidth: 1,
                    pointRadius: 5,
                });
            }
        },
        updateRoverPosition(
            state, 
            action: PayloadAction<{ 
                rover: number, 
                x: number, 
                y: number, 
                direction: string 
            }>) {
            const { rover, x, y, direction } = action.payload;
        
            if(rover === 1){
                state.datasets[1].data = [];
                state.datasets[0].data.push({ x, y });
                state.datasets[0].label = `Rover ${rover} - ${direction} ${x} ${y}`;
            }

            if(rover === 2){
                state.datasets[1].data = [];
                state.datasets[1].data.push({ x, y });
                state.datasets[1].label = `Rover ${rover} - ${direction} ${x} ${y}`;
            }
        },
        updatePastRoverPosition(
            state, 
            action: 
            PayloadAction<{ 
                rover: string, 
                positions: { 
                    x: number, 
                    y: number 
                }[] 
            }>) {
            const { rover, positions } = action.payload;

            const dataset = state.datasets.find(dataset =>
                dataset.label === `Past ${rover}`
            );

            if(dataset){
                dataset.data = [
                    ...dataset.data,
                    ...positions
                ]
            }

            const rover1Init = state.datasets.find(dataset => dataset.label.startsWith('Rover-1 init'));

            if (rover1Init && rover === "Rover 1") {
                const pastRover1 = state.datasets.find(dataset => dataset.label === "Past Rover 1");

                if (pastRover1) {
                    pastRover1.data = pastRover1.data.filter(
                        pastPos => !rover1Init.data.some(
                            initPos => initPos.x === pastPos.x && initPos.y === pastPos.y
                        )
                    );
                }
            }

            const rover2Init = state.datasets.find(dataset => dataset.label.startsWith('Rover-2 init'));

            if (rover2Init && rover === "Rover 2") {
                const pastRover2 = state.datasets.find(dataset => dataset.label === "Past Rover 2");

                if (pastRover2) {
                    pastRover2.data = pastRover2.data.filter(
                        pastPos => !rover2Init.data.some(
                            initPos => initPos.x === pastPos.x && initPos.y === pastPos.y
                        )
                    );
                }
            }
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {},
});

export const {
    setEixos,
    updateRoverPosition,
    updatePastRoverPosition,
    setLoading,
    setError,
    createRoverPosition
} = roverSlice.actions;

export default roverSlice.reducer;
