import { useState, useRef, Dispatch, SetStateAction, MutableRefObject } from 'react';

const useNoneReactiveState = <Type>(initialState: Type | (() => Type)): [Type, Dispatch<SetStateAction<Type>>, MutableRefObject<Type>] => {
  const [state, setState] = useState<Type>(initialState);
  const stateRef = useRef<Type>(state);

  stateRef.current = state;

  return [state, setState, stateRef];
};

export default useNoneReactiveState;


