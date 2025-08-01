// import {
//   schedulePrizeDrawEnd,
//   updateThePacks,
// } from "./checking-scheduled-timmer";
// import prisma from "./prisma.utils";

// export async function initializeScheduledJobs() {
//   const now = new Date();

//   // 1. First check for expired but still live draws
//   const expiredDraws = await prisma.prizeDraw.findMany({
//     where: {
//       isLive: true,
//       endDateTime: { lte: now }, // Draws that should have ended
//     },
//   });

//   // Process all expired draws
//   for (const draw of expiredDraws) {
//     console.log(`⚠️ Found expired draw ${draw.id}, performing cleanup...`);
//     try {
//       await updateThePacks(draw.id);
//     } catch (error) {
//       console.error(`❌ Failed to cleanup expired draw ${draw.id}:`, error);
//     }
//   }

//   // 2. Now check for currently active draws
//   const activeDraw = await prisma.prizeDraw.findFirst({
//     where: {
//       isLive: true,
//       endDateTime: { gt: now }, // Only future-dated draws
//     },
//   });

//   if (!activeDraw) {
//     console.log("⏲️ No active timers found. Returning back...");
//     return;
//   }

//   // 3. Schedule the active draw
//   console.log(
//     `⏰ Rescheduling timer for draw ${activeDraw.id} ending at ${activeDraw.endDateTime}`,
//   );
//   schedulePrizeDrawEnd(activeDraw.id, activeDraw.endDateTime);
// }
