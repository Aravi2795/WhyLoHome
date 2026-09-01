/**
 * KMS Travels — Interactive Fleet & Cabin Customizer Engine
 */

import { FLEET_MODELS } from './packagesData.js';
import { soundFX } from './soundFX.js';

export const CABIN_LIGHTING_COLORS = [
    { id: "cyan", name: "Neon Cyan", hex: "#00f2fe", shadow: "rgba(0, 242, 254, 0.6)" },
    { id: "violet", name: "Purple Rain", hex: "#a855f7", shadow: "rgba(168, 85, 247, 0.6)" },
    { id: "amber", name: "Sunset Gold", hex: "#fbbf24", shadow: "rgba(251, 191, 36, 0.6)" },
    { id: "emerald", name: "Highland Mint", hex: "#10b981", shadow: "rgba(16, 185, 129, 0.6)" },
    { id: "crimson", name: "Ruby Luxury", hex: "#f43f5e", shadow: "rgba(244, 63, 94, 0.6)" }
];

class FleetCustomizer {
    constructor() {
        this.selectedBus = FLEET_MODELS[0];
        this.activeLightColor = CABIN_LIGHTING_COLORS[0];
    }

    setBus(busId) {
        const found = FLEET_MODELS.find(b => b.id === busId);
        if (found) {
            this.selectedBus = found;
            soundFX.playClick();
        }
        return this.selectedBus;
    }

    setLighting(colorId) {
        const found = CABIN_LIGHTING_COLORS.find(c => c.id === colorId);
        if (found) {
            this.activeLightColor = found;
            soundFX.playHover();
        }
        return this.activeLightColor;
    }

    getSelectedBus() {
        return this.selectedBus;
    }

    getActiveLighting() {
        return this.activeLightColor;
    }
}

export const fleetCustomizer = new FleetCustomizer();
