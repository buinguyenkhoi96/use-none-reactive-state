/// <reference types="react" />
declare const useNoneReactiveState: <Type>(defaultValue: Type) => (Type | import("react").Dispatch<import("react").SetStateAction<Type>> | import("react").MutableRefObject<Type>)[];
export default useNoneReactiveState;
