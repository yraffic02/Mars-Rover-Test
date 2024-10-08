"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Button } from "../ui/button"
import { FormSchemaRover } from "@/utils/schemas/FormSchemaRover"
import { Input } from "../ui/input"
import { toast } from "../ui/use-toast"
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from "@/store/store"
import { clearAllLocalStorage, getLocalStorageItem } from "@/utils/localStorage"
import { registerCommandRover } from "@/store/actions/roverActions"
import { useEffect } from "react"
import { createRoverPosition, setEixos } from "@/store/slices/cartesianSlice"

export function FormRoverCommand() {
    const dispatch = useDispatch<AppDispatch>();
    const { user } = useSelector((state: RootState) => state.user)
    const existingPlateauSize = typeof window !== 'undefined' ? getLocalStorageItem('plateauSize') : null;
    const rover1 = typeof window !== 'undefined' ? getLocalStorageItem(`Rover-1`) : null;
    const rover2 = typeof window !== 'undefined' ? getLocalStorageItem(`Rover-2`) : null;
    const form = useForm<z.infer<typeof FormSchemaRover>>({
        resolver: zodResolver(FormSchemaRover),
        defaultValues: {
            command: '',
            initialPosition: rover1 ? rover1.position : '',
            plateauSize: existingPlateauSize ? existingPlateauSize : '',
            command1: '',
            initialPosition1: rover2 ? rover2.position : ''
        },
    })
    const plateauSize = form.watch("plateauSize")

    const onSubmit = async (data: z.infer<typeof FormSchemaRover>) => {
        try {
            const response1 = await dispatch(
                registerCommandRover({
                    rover: 1,
                    plateauSize: data.plateauSize,
                    initialPosition: data.initialPosition,
                    command: data.command,
                    userId: user.id
                })
            ).unwrap();

            if (response1.status === 200) {
                toast({
                    title: `Rover 1 está na localização ${response1.route.coordinates}`,
                });

                dispatch(createRoverPosition({
                    color: "rgb(255, 187, 0)",
                    rover: { number: "1", position: data.initialPosition }
                }))

                const response2 = await dispatch(
                    registerCommandRover({
                        rover: 2,
                        plateauSize: data.plateauSize,
                        initialPosition: data.initialPosition1,
                        command: data.command1,
                        userId: user.id
                    })
                ).unwrap();
                if (response2.status === 200) {
                    toast({
                        title: `Rover 2 está na localização ${response2.route.coordinates}`,
                    });

                    dispatch(createRoverPosition({
                        color: "rgb(25, 255, 4)",
                        rover: { number: "2", position: data.initialPosition1 }
                    }))

                } else {
                    toast({
                        title: "Erro ao calcular rota! Rover 2",
                    });
                }
            } else {
                toast({
                    title: "Erro ao calcular rota! Rover 1",
                });
            }
        } catch (error) {
            console.log(error);

            toast({
                title: "Erro ao calcular rota!",
            });
        }
    };

    useEffect(() => {
        const [plateauX, plateauY] = plateauSize.split(" ").map(Number);

        if (plateauX || plateauY) {
            dispatch(setEixos({ x: plateauX, y: plateauY }))
        } else {
            dispatch(setEixos({ x: 0, y: 0 }))
        }
    }, [plateauSize])

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 lg:w-1/2 md:w-full shadow-lg p-6 rounded-md">
                {
                    !existingPlateauSize &&
                    <FormField
                        control={form.control}
                        name="plateauSize"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Plateau size</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormDescription>
                                    (ex: "5 5")
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                }
                <div className="space-y-3 shadow-lg p-2 rounded-md">
                    <h1>Rover 1</h1>
                    {
                        !existingPlateauSize &&
                        <FormField
                            control={form.control}
                            name="initialPosition"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Initial position</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        (ex: "1 2 N")
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    }
                    <FormField
                        control={form.control}
                        name="command"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Command</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormDescription>
                                    (ex: "LMLMLMLMM")
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="space-y-3 shadow-lg p-2 rounded-md">
                    <h1>Rover 2</h1>
                    {
                        !existingPlateauSize &&
                        <FormField
                            control={form.control}
                            name="initialPosition1"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Initial position</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        (ex: "1 2 N")
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    }
                    <FormField
                        control={form.control}
                        name="command1"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Command</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormDescription>
                                    (ex: "LMLMLMLMM")
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="w-full flex items-center gap-2">
                    <Button type="submit">Submit</Button>
                    {
                        existingPlateauSize &&
                        <Button onClick={() => {
                            clearAllLocalStorage()
                            form.reset()
                            location.reload()
                        }}>
                            Reset
                        </Button>
                    }
                </div>
            </form>
        </Form>
    )
}
