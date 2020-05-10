import { BaseHUDPart } from "../base_hud_part";
import { makeDiv } from "../../../core/utils";
import { getStringForKeyCode } from "../../key_action_mapper";
import { TrackedState } from "../../../core/tracked_state";

export class HUDKeybindingOverlay extends BaseHUDPart {
    initialize() {
        this.shiftDownTracker = new TrackedState(this.onShiftStateChanged, this);

        this.root.hud.signals.selectedPlacementBuildingChanged.add(
            this.onSelectedBuildingForPlacementChanged,
            this
        );
    }

    onShiftStateChanged(shiftDown) {
        this.element.classList.toggle("shiftDown", shiftDown);
    }

    createElements(parent) {
        const mapper = this.root.gameState.keyActionMapper;

        const getKeycode = id => {
            return getStringForKeyCode(mapper.getBinding(id).keyCode);
        };

        this.element = makeDiv(
            parent,
            "ingame_HUD_KeybindingOverlay",
            [],
            `
            <div class="binding">
                <code class="keybinding">${getKeycode("center_map")}</code>
                <label>Center</label>
            </div>

            <div class="binding">
                <code class="keybinding leftMouse"></code><i></i>
                <code class="keybinding">${getKeycode("map_move_up")}</code>
                <code class="keybinding">${getKeycode("map_move_left")}</code>
                <code class="keybinding">${getKeycode("map_move_down")}</code>
                <code class="keybinding">${getKeycode("map_move_right")}</code>
                <label>Move</label>
            </div>               
            
            <div class="binding noPlacementOnly">
                <code class="keybinding rightMouse"></code>
                <label>Delete</label>
            </div>
            
            
            <div class="binding placementOnly">
                <code class="keybinding rightMouse"></code> <i></i>
                <code class="keybinding">${getKeycode("building_abort_placement")}</code>
                <label>Stop placement</label>
            </div>

            <div class="binding placementOnly">
                <code class="keybinding">${getKeycode("rotate_while_placing")}</code>
                <label>Rotate Building</label>
            </div>

            <div class="binding placementOnly shift">
                <code class="keybinding">⇧ SHIFT</code>
                <label>Place Multiple</label>
            </div>

            <div class="binding placementOnly shift">
                <code class="keybinding">ALT</code>
                <label>Reverse orientation</label>
            </div>
        `
        );
    }

    onSelectedBuildingForPlacementChanged(selectedMetaBuilding) {
        this.element.classList.toggle("placementActive", !!selectedMetaBuilding);
    }

    update() {
        this.shiftDownTracker.set(this.root.app.inputMgr.shiftIsDown);
    }
}
