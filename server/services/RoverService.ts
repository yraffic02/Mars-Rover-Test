import { directions, moves } from "../config/constants";
import { Direction, Position } from "../types/types";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const RoverService = {
    turnRight:  (currentDirection: Direction): Direction => {
        const currentIndex = directions.indexOf(currentDirection);
        const newIndex = (currentIndex + 1) % 4;
        return directions[newIndex];
    },
    turnLeft: (currentDirection: Direction): Direction => {
        const currentIndex = directions.indexOf(currentDirection);
        const newIndex = (currentIndex + 3) % 4;
        return directions[newIndex];
    },
    getCurrentPositin: (initialPosition: string) =>{
        const  [x, y, direction] = initialPosition.split(" ");

        const currentPosition: Position = {
        x: parseInt(x),
        y: parseInt(y),
        direction: direction as Direction,
        };

        return currentPosition;
    },
    createLogRover: async (
        command: string,
        plateauSize: string,
        position: string,
        name: string,
        userId: number,
    ) =>{
        const log = await prisma.logs.create({
            data: {
                command,
                plateauSize,
                position,
                name,
                userId
            }
        });

        return log
    }, 
    calculateFinalPosition: async (
        rover: number,
        plateauSize: string,
        initialPosition: string,
        commands: string,
        userId: number
    ): Promise<{ 
        rover: number,
        coordinates: {
            x: number,
            y: number
        },
        direction: string,
    } | undefined> => {
        try {
            const lastLog = await prisma.logs.findFirst({
                where: { name: `Rover ${rover}`, plateauSize },
                orderBy: { createdAt: 'desc' }
            });

        
            if (lastLog) {
                plateauSize = lastLog.plateauSize;
                initialPosition = lastLog.position;
            }
  
            const [plateauX, plateauY] = plateauSize.split(" ").map(Number);

            let currentPosition = RoverService.getCurrentPositin(initialPosition)

            await RoverService.createLogRover(
                    '', 
                    plateauSize, 
                    `${currentPosition.x} ${currentPosition.y} ${currentPosition.direction}`,
                    `Rover ${rover}`,
                    userId,
            )

            for (const command of commands) {
                if (command === 'L') {
                    currentPosition.direction = RoverService.turnLeft(currentPosition.direction);
                } else if (command === 'R') {
                    currentPosition.direction = RoverService.turnRight(currentPosition.direction);
                } else if (command === 'M') {
                    const move = moves[currentPosition.direction];
                    currentPosition.x = Math.min(Math.max(currentPosition.x + move.x, 0), plateauX);
                    currentPosition.y = Math.min(Math.max(currentPosition.y + move.y, 0), plateauY);
                }
                await RoverService.createLogRover(
                    commands, 
                    plateauSize, 
                    `${currentPosition.x} ${currentPosition.y} ${currentPosition.direction}`,
                    `Rover ${rover}`,
                    userId,
                )
            }

            return {
                rover,
                coordinates: {
                    x: currentPosition.x,
                    y: currentPosition.y
                },
                direction: currentPosition.direction
            };
        } catch (error) {
            console.log(error);
        }
    },
    getAll:async (plateauSize: string) =>{
        const logs = await prisma.logs.findMany({
            where: {
                plateauSize
            }
        })

        return logs;
    },
    getByRoverDirections: async (rover: string, plateauSize: string) => {
        const logs = await prisma.logs.findMany({
            where: {
                name: rover,
                plateauSize
            }
        })
        
        const positions = logs.map(log => {
            const [x, y] = log.position.split(" ").map(Number);
            return { x, y };
        });
    
        return {
            rover,
            positions
        };
    }
}

