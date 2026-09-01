/**
 * KMS Travels — Dynamic Instant Fare Calculator & WhatsApp Link Generator
 * Updated with comprehensive South India pickup cities and vehicle options.
 */

import { adminManager } from './adminManager.js';
import { FLEET_MODELS } from './packagesData.js';

export const CITIES = [
    { name: "Chennai", distMultiplier: 1.0, distanceKm: 520 },
    { name: "Bengaluru", distMultiplier: 0.9, distanceKm: 460 },
    { name: "Coimbatore", distMultiplier: 0.55, distanceKm: 180 },
    { name: "Madurai", distMultiplier: 0.45, distanceKm: 120 },
    { name: "Salem", distMultiplier: 0.6, distanceKm: 220 },
    { name: "Trichy (Tiruchirappalli)", distMultiplier: 0.5, distanceKm: 190 },
    { name: "Kochi / Ernakulam", distMultiplier: 0.7, distanceKm: 310 },
    { name: "Puducherry", distMultiplier: 0.85, distanceKm: 420 },
    { name: "Tirunelveli", distMultiplier: 0.65, distanceKm: 260 },
    { name: "Erode", distMultiplier: 0.58, distanceKm: 210 },
    { name: "Vellore", distMultiplier: 0.8, distanceKm: 390 },
    { name: "Thanjavur", distMultiplier: 0.55, distanceKm: 230 },
    { name: "Dindigul", distMultiplier: 0.4, distanceKm: 90 }
];

export function calculateTripFare({
    originCity = "Chennai",
    packageId = "kodaikanal",
    vehicleId = "kms-crimson-coach",
    passengers = 12,
    travelDate = "",
    includeResort = true
}) {
    const packages = adminManager.getPackages();
    const fleetList = adminManager.getFleet();

    const pkg = packages.find(p => p.id === packageId) || packages[0];
    const city = CITIES.find(c => c.name === originCity) || CITIES[0];
    const fleet = fleetList.find(f => f.id === vehicleId) || fleetList[0];

    // Base package price adjusted for distance
    let baseRate = pkg.pricePerPerson * (city.distMultiplier || 1.0);

    // Vehicle multiplier
    let vehicleMultiplier = 1.0;
    if (vehicleId === 'kms-crimson-coach') vehicleMultiplier = 1.15; // Flagship Coach
    if (vehicleId === 'volvo-b11r') vehicleMultiplier = 1.25;
    if (vehicleId === 'force-urbania') vehicleMultiplier = 1.05;

    // Resort stay adjustment
    if (!includeResort) {
        baseRate = baseRate * 0.65; // Transport only discount
    }

    const estimatedPerPerson = Math.round(baseRate * vehicleMultiplier);
    const totalFare = estimatedPerPerson * Math.max(1, passengers);

    // Cost Breakdown
    const busCharterCost = Math.round(totalFare * (includeResort ? 0.55 : 0.80));
    const resortStayCost = includeResort ? Math.round(totalFare * 0.30) : 0;
    const tollsAndFuelCost = Math.round(totalFare * (includeResort ? 0.15 : 0.20));

    return {
        pkg,
        city,
        fleet,
        estimatedPerPerson,
        totalFare,
        busCharterCost,
        resortStayCost,
        tollsAndFuelCost,
        includeResort
    };
}

export function generateWhatsAppLink({
    originCity,
    packageTitle,
    vehicleName,
    passengers,
    travelDate,
    customerName = "",
    notes = "",
    includeResort = true
}) {
    const settings = adminManager.getSettings();
    const phone = "919751206676";

    let text = `🚍 *KMS TRAVELS — NEW TOUR BOOKING ENQUIRY*\n`;
    text += `═══════════════════════════\n\n`;
    text += `📍 *Pickup Location:* ${originCity}\n`;
    text += `🗺️ *Destination Package:* ${packageTitle}\n`;
    text += `🚌 *Vehicle Preference:* ${vehicleName}\n`;
    text += `👥 *Group Size:* ${passengers} Travelers\n`;
    text += `🏨 *Resort Stay:* ${includeResort ? 'Included (3-Star Hotel)' : 'Transport Only'}\n`;
    if (travelDate) text += `📅 *Travel Date:* ${travelDate}\n`;
    if (customerName) text += `👤 *Customer Name:* ${customerName}\n`;
    if (notes) text += `📝 *Notes:* ${notes}\n`;
    text += `\nHello KMS Travels team! Please send an official quote & confirm bus availability for TN 23 BS 8742.`;

    const encodedText = encodeURIComponent(text);
    return `https://wa.me/${phone}?text=${encodedText}`;
}
