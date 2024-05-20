import { Dispatch, SetStateAction, MutableRefObject } from 'react';
declare const useNoneReactiveState: <Type>(initialState: Type | (() => Type)) => [Type, Dispatch<SetStateAction<Type>>, MutableRefObject<Type>];
export default useNoneReactiveState;
