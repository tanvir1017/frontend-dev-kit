import cron from "node-cron";
import { io } from "../..";

// Store active cron jobs
export const activeCronJobs: Map<string, cron.ScheduledTask> = new Map();

export const schedulePrizeDrawEnd = (prizeDrawId: string, targetTime: Date) => {
  // Clear any existing job for this prize draw
  if (activeCronJobs.has(prizeDrawId)) {
    activeCronJobs.get(prizeDrawId)?.stop();
    activeCronJobs.delete(prizeDrawId);
  }

  // Convert to UTC and get components
  const utcDate = new Date(targetTime);
  const minutes = utcDate.getUTCMinutes();
  const hours = utcDate.getUTCHours();
  const dayOfMonth = utcDate.getUTCDate();
  const month = utcDate.getUTCMonth() + 1;
  // Note: We use '*' for day of week to avoid conflicts
  const dayOfWeek = "*";

  console.log(`Scheduled to run at: ${utcDate.toISOString()}`);
  console.log(
    `Cron expression: ${minutes} ${hours} ${dayOfMonth} ${month} ${dayOfWeek}`,
  );

  // Schedule new job
  const job = cron.schedule(
    `${minutes} ${hours} ${dayOfMonth} ${month} ${dayOfWeek}`,
    () => updateThePacks(prizeDrawId),
    {
      scheduled: true,
      timezone: "UTC", // Explicitly use UTC
    },
  );

  activeCronJobs.set(prizeDrawId, job);
};

export const updateThePacks = async (prizeDrawId: string) => {
  console.log("Prize draw time has expired, performing the task...");

  try {
    // Update all promotional packs

    // const result = await prisma.$transaction(async (tx) => {
    //   const updatePromotionalPack = await tx.choosePromotionalPack.updateMany({
    //     data: { quantityOfEntries: 0 },
    //   });
    //   console.log(
    //     "~ 🚀Successfully updated promotional packs:",
    //     updatePromotionalPack,
    //   );

    //   // updating the prizes also. which will become invisible
    //   const prizesUpdate = await tx.prizesSection.updateMany({
    //     where: { isLive: true },
    //     data: { isLive: false },
    //   });

    //   console.log(
    //     "~ 🚀Successfully updated the prize visibility:",
    //     prizesUpdate,
    //   );

    //   // Mark THIS prize draw as not live
    //   const timers = await tx.prizeDraw.updateMany({
    //     where: { isLive: true },
    //     data: { isLive: false },
    //   });

    //   const wheelUpdate = await tx.spinnerWheel.updateMany({
    //     where: {
    //       isValid: true,
    //     },
    //     data: {
    //       isValid: false,
    //     },
    //   });

    //   return {
    //     updatePromotionalPack,
    //     prizesUpdate,
    //     timers,
    //     wheelUpdate,
    //   };
    // });

    // ? if the timer is reached its `edge` make an emit and know the client
    io.emit("prizeDrawCompleted", {
      prizeDrawId,
      success: true,
      timestamp: new Date().toISOString(),
    });

    // Clean up the job
    if (activeCronJobs.has(prizeDrawId)) {
      activeCronJobs.get(prizeDrawId)?.stop();
      activeCronJobs.delete(prizeDrawId);
    }
    console.log("~ 🚀 Transaction section from prisma 🔼");
  } catch (error) {
    io.emit("prizeDrawError", {
      prizeDrawId,
      error: "Failed to complete prize draw",
      timestamp: new Date().toISOString(),
    });
    console.error("Error updating promotional packs:", error);
  }
};
