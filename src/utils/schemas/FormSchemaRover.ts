import { z } from "zod";

export const FormSchemaRover = z
  .object({
    plateauSize: z
      .string({ required_error: "O tamanho do platô é obrigatório." })
      .regex(/^\d+ \d+$/, {
        message: "O tamanho do platô deve estar no formato 'x y', com um espaço entre os números.",
      })
      .refine((value) => {
        const [x, y] = value.split(" ").map(Number);
        return x !== y;
      }, {
        message: "As dimensões do platô não podem ser iguais.",
      }),
    initialPosition: z
      .string({ required_error: "A posição inicial é obrigatória." })
      .regex(/^\d+ \d+ [NESW]$/, {
        message: "A posição inicial deve estar no formato 'x y N', com espaços entre os números e a direção.",
      }),
    command: z
      .string({ required_error: "Os comandos são obrigatórios." })
      .regex(/^[LRM]+$/, { message: "Os comandos devem conter apenas 'L', 'R' e 'M'." }),
    initialPosition1: z
      .string({ required_error: "A segunda posição inicial é obrigatória." })
      .regex(/^\d+ \d+ [NESW]$/, {
        message: "A segunda posição inicial deve estar no formato 'x y N', com espaços entre os números e a direção.",
      }),
    command1: z
      .string({ required_error: "Os segundos comandos são obrigatórios." })
      .regex(/^[LRM]+$/, { message: "Os comandos devem conter apenas 'L', 'R' e 'M'." }),
  })
  .refine(
    (data) => data.initialPosition !== data.initialPosition1,
    {
      message: "As posições iniciais não podem ser iguais.",
      path: ["initialPosition1"],
    }
  )
  .refine(
    (data) => data.command !== data.command1,
    {
      message: "Os comandos não podem ser iguais.",
      path: ["command1"],
    }
  );
