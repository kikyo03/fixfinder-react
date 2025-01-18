// src/utils/dragAndDropUtils.js

/**
 * Handles the drag-and-drop reordering logic.
 * @param {Object} result - The result object from react-beautiful-dnd.
 * @param {Array} pins - The current list of pins.
 * @param {Function} setPins - State updater function for pins.
 */
export const handleDragEnd = (result, pins, setPins) => {
    const { destination, source } = result;

    // If there's no destination (dropped outside the list), do nothing
    if (!destination) return;

    // Reorder the pins
    const updatedPins = Array.from(pins);
    const [reorderedItem] = updatedPins.splice(source.index, 1);
    updatedPins.splice(destination.index, 0, reorderedItem);

    // Update the state
    setPins(updatedPins);
};
