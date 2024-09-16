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
        const userAgent = navigator.userAgent;
        const platform = navigator.platform;
        const browser = userAgent.match(/(firefox|msie|chrome|safari|trident)/gi)?.[0] || 'unknown-browser';
        const uniqueId = uuid();


        const generatedName = `${browser}-${platform}-${uniqueId}`;

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