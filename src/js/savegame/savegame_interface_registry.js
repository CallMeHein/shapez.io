import { BaseSavegameInterface } from "./savegame_interface";
import { SavegameInterface_V1000 } from "./schemas/1000";
import { createLogger } from "../core/logging";

/** @type {Object.<number, typeof BaseSavegameInterface>} */
const interfaces = {
    1000: SavegameInterface_V1000,
};

const logger = createLogger("savegame_interface_registry");

/**
 * Returns if the given savegame has any supported interface
 * @param {any} savegame
 * @returns {BaseSavegameInterface|null}
 */
export function getSavegameInterface(savegame) {
    if (!savegame || !savegame.version) {
        logger.warn("Savegame does not contain a valid version (undefined)");
        return null;
    }
    const version = savegame.version;
    if (!Number.isInteger(version)) {
        logger.warn("Savegame does not contain a valid version (non-integer):", version);
        return null;
    }

    const interfaceClass = interfaces[version];
    if (!interfaceClass) {
        logger.warn("Version", version, "has no implemented interface!");
        return null;
    }

    return new interfaceClass(savegame);
}
