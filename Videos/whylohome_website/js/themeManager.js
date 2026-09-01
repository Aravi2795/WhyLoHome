/**
 * KMS Travels — Dynamic Theme Manager (Crimson Flame Edition)
 */

import { soundFX } from './soundFX.js';

export const THEMES = [
    {
        id: "theme-crimson",
        name: "KMS Crimson Flame",
        icon: "🔥",
        description: "Official KMS Red & Gold Flame Edition (TN 23 BS 8742)",
        colorPreview: "#ff1744"
    },
    {
        id: "theme-midnight",
        name: "Midnight Cyber Bus",
        icon: "🌌",
        description: "Obsidian dark mode with glowing cyan and purple neon accents",
        colorPreview: "#00f2fe"
    },
    {
        id: "theme-emerald",
        name: "Misty Highlands",
        icon: "🌿",
        description: "Deep Western Ghats forest emerald with warm mist gold",
        colorPreview: "#00e676"
    },
    {
        id: "theme-royal",
        name: "Royal Gold & Indigo",
        icon: "👑",
        description: "Imperial dark navy with gold leaf and regal purple accents",
        colorPreview: "#ffb300"
    }
];

class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('kms_theme') || 'theme-crimson';
    }

    init() {
        this.applyTheme(this.currentTheme, false);
    }

    setTheme(themeId) {
        if (this.currentTheme === themeId) return;
        this.currentTheme = themeId;
        localStorage.setItem('kms_theme', themeId);
        this.applyTheme(themeId, true);
        soundFX.playThemeChime();
    }

    applyTheme(themeId, triggerAnimation = true) {
        document.documentElement.setAttribute('data-theme', themeId);

        if (triggerAnimation) {
            document.body.classList.add('theme-changing');
            setTimeout(() => {
                document.body.classList.remove('theme-changing');
            }, 500);
        }

        window.dispatchEvent(new CustomEvent('kmsThemeChanged', { detail: { themeId } }));
    }

    getCurrentTheme() {
        return this.currentTheme;
    }
}

export const themeManager = new ThemeManager();
