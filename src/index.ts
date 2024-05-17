import { useState, useRef } from 'react';

const useNoneReactiveState = <Type>(defaultValue: Type) => {
  const [state, setState] = useState<Type>(defaultValue);
  const stateRef = useRef<Type>(defaultValue);

  stateRef.current = state;

  return [state, setState, stateRef.current];
};

export default useNoneReactiveState;


