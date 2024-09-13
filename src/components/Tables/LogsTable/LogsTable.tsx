'use client'
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/store/store"
import { StoreTable } from "../Table";
import { ColumnDef } from "@tanstack/react-table";
import { useCallback, useEffect } from "react"
import { getLocalStorageItem } from "@/utils/localStorage";
import { getLogs } from "@/store/actions/logsActions";


export type Logs = {
    id: number
    plateauSize: string
    position: string
    command: string
    name: string
}

export const columns: ColumnDef<Logs>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "plateauSize",
        header: "Plateau Size",
    },
    {
        accessorKey: "position",
        header: "Position",
    },
    {
        accessorKey: "command",
        header: "Command",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
]


export function LogsTable() {
    const dispatch = useDispatch<AppDispatch>();
    const { data } = useSelector((state: RootState) => state.logs);
    const { result } = useSelector((state: RootState) => state.rover);

    const fetchLogs = useCallback(async () => {
        try {
            const plateauSize = getLocalStorageItem('plateauSize');

            if (!plateauSize) {
                return;
            }

            await dispatch(getLogs(plateauSize));
        } catch (error) {
            console.error('Error fetching logs:', error);
        }
    }, [result, dispatch]);

    useEffect(() => {
        fetchLogs();
    }, [result, fetchLogs]);

    return (
        <div className="w-full p-4">
            <h1 className="font-bold p-2">Logs</h1>
            <StoreTable data={data} columns={columns} />
        </div>
    )
}
