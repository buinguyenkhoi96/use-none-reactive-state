"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const useNoneReactiveState = (defaultValue) => {
    const [state, setState] = (0, react_1.useState)(defaultValue);
    const stateRef = (0, react_1.useRef)(defaultValue);
    stateRef.current = state;
    return [state, setState, stateRef];
};
exports.default = useNoneReactiveState;
