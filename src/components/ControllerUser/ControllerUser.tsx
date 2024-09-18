'use client'
import { createUser } from "@/store/actions/userActions";
import { getUser } from "@/store/slices/userSlice";
import { AppDispatch } from "@/store/store";
import { getLocalStorageItem } from "@/utils/localStorage";
import { ReactNode, useCallback, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import uuid from 'react-uuid';

export function ControllerUser({ children }: { children: ReactNode }) {
    const dispatch = useDispatch<AppDispatch>();

    const generateUsername = useCallback(() => {
        const uniqueId = uuid();

        const generatedName = uniqueId;

        return generatedName;
    }, [])


    useEffect(() => {
        const user = getLocalStorageItem('user');

        if (!user) {
            const name = generateUsername();
            dispatch(createUser({ username: name }));
        } else {
            dispatch(getUser());
        }
    }, [dispatch, generateUsername])

    return (
        <div>
            {children}
        </div>
    )
}