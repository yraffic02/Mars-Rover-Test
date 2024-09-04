-- CreateTable
CREATE TABLE "Logs" (
    "id" SERIAL NOT NULL,
    "plateauSize" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "command" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Logs_pkey" PRIMARY KEY ("id")
);
