/**
 * KMS Travels — Admin Authentication & Data Persistence Engine
 * Enables live modification of packages, fleet, pricing, and contact entries stored in localStorage.
 */

import { PACKAGES_DATA, FLEET_MODELS } from './packagesData.js';

const STORAGE_KEY_PACKAGES = 'kms_admin_packages_v1';
const STORAGE_KEY_FLEET = 'kms_admin_fleet_v1';
const STORAGE_KEY_ENQUIRIES = 'kms_admin_enquiries_v1';
const STORAGE_KEY_SETTINGS = 'kms_admin_settings_v1';
const STORAGE_KEY_AUTH = 'kms_admin_auth_v1';

class AdminManager {
    constructor() {
        this.authenticated = localStorage.getItem(STORAGE_KEY_AUTH) === 'true';
        this.initDefaultData();
    }

    initDefaultData() {
        if (!localStorage.getItem(STORAGE_KEY_PACKAGES)) {
            localStorage.setItem(STORAGE_KEY_PACKAGES, JSON.stringify(PACKAGES_DATA));
        }
        if (!localStorage.getItem(STORAGE_KEY_FLEET)) {
            localStorage.setItem(STORAGE_KEY_FLEET, JSON.stringify(FLEET_MODELS));
        }
        if (!localStorage.getItem(STORAGE_KEY_ENQUIRIES)) {
            localStorage.setItem(STORAGE_KEY_ENQUIRIES, JSON.stringify([]));
        }
        if (!localStorage.getItem(STORAGE_KEY_SETTINGS)) {
            const defaultSettings = {
                phone1: "+91 9751206676",
                phone2: "+91 8072598747",
                phone3: "+91 9042299797",
                email: "kmstravels8742@gmail.com",
                tagline: "Journey Beyond Destination. Safety • Comfort • On Time.",
                regNo: "TN 23 BS 8742"
            };
            localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(defaultSettings));
        }
    }

    login(username, password) {
        if ((username === 'admin' || username === 'kmstravels') && (password === 'kms2026' || password === 'admin123')) {
            this.authenticated = true;
            localStorage.setItem(STORAGE_KEY_AUTH, 'true');
            return { success: true };
        }
        return { success: false, error: 'Invalid credentials. Use admin / kms2026' };
    }

    logout() {
        this.authenticated = false;
        localStorage.removeItem(STORAGE_KEY_AUTH);
    }

    isLoggedIn() {
        return this.authenticated;
    }

    // Packages Management
    getPackages() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY_PACKAGES)) || PACKAGES_DATA;
        } catch (e) {
            return PACKAGES_DATA;
        }
    }

    savePackage(pkg) {
        const packages = this.getPackages();
        const existingIdx = packages.findIndex(p => p.id === pkg.id);
        if (existingIdx >= 0) {
            packages[existingIdx] = pkg;
        } else {
            packages.unshift(pkg);
        }
        localStorage.setItem(STORAGE_KEY_PACKAGES, JSON.stringify(packages));
        window.dispatchEvent(new CustomEvent('kmsDataUpdated'));
    }

    deletePackage(pkgId) {
        let packages = this.getPackages();
        packages = packages.filter(p => p.id !== pkgId);
        localStorage.setItem(STORAGE_KEY_PACKAGES, JSON.stringify(packages));
        window.dispatchEvent(new CustomEvent('kmsDataUpdated'));
    }

    // Fleet Management
    getFleet() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY_FLEET)) || FLEET_MODELS;
        } catch (e) {
            return FLEET_MODELS;
        }
    }

    saveFleetModel(bus) {
        const fleet = this.getFleet();
        const existingIdx = fleet.findIndex(f => f.id === bus.id);
        if (existingIdx >= 0) {
            fleet[existingIdx] = bus;
        } else {
            fleet.push(bus);
        }
        localStorage.setItem(STORAGE_KEY_FLEET, JSON.stringify(fleet));
        window.dispatchEvent(new CustomEvent('kmsDataUpdated'));
    }

    // Enquiries & Quote Requests Log
    getEnquiries() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY_ENQUIRIES)) || [];
        } catch (e) {
            return [];
        }
    }

    addEnquiry(entry) {
        const enquiries = this.getEnquiries();
        const newEntry = {
            id: 'ENQ-' + Date.now(),
            date: new Date().toLocaleString(),
            ...entry
        };
        enquiries.unshift(newEntry);
        localStorage.setItem(STORAGE_KEY_ENQUIRIES, JSON.stringify(enquiries));
    }

    // Settings Management
    getSettings() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY_SETTINGS));
        } catch (e) {
            return {
                phone1: "+91 9751206676",
                phone2: "+91 8072598747",
                email: "kmstravels8742@gmail.com"
            };
        }
    }

    saveSettings(settings) {
        localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
        window.dispatchEvent(new CustomEvent('kmsDataUpdated'));
    }
}

export const adminManager = new AdminManager();
