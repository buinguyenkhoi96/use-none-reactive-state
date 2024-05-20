"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const useNoneReactiveState = (initialState) => {
    const [state, setState] = (0, react_1.useState)(initialState);
    const stateRef = (0, react_1.useRef)(state);
    stateRef.current = state;
    return [state, setState, stateRef];
};
exports.default = useNoneReactiveState;
