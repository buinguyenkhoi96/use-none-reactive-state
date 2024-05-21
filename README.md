## Introduction

While working on a project that need to deal with different sockets at the same time. I had a several issues with handle reactive/non-reactive value in useEffect | useCallback | useMemo with React, in differents usecase reactive value can become non-reactive and vice versa. Take a look at [this react offical document](https://react.dev/learn/separating-events-from-effects#extracting-non-reactive-logic-out-of-effects) for further explaination. This hook come with a optional [babel plugin](https://www.npmjs.com/package/babel-plugin-none-reactive-effect) so you dont have to do the extra job on modifying your code, just replace useState with useNoneReactiveState.

```jsx
import { useState } from 'react'

function ChatRoom({ roomName }) {
  const [theme, setTheme, themeRef] = useState('dark')

  useEffect(() => {
    // This will ensure u still get the latest value inside the callback
    connection.onConnect(() => console.log(theme))

    return () => connection.disconnect();
  }, [theme, roomName])
}
```

The code above seems good but there's still problem:

- If theme included in useEffect deps list, everytime user changed theme the chat room will be re-connect.
- If theme's not included in deps list when connection success we dont have the access to latest data.

So theme is a reactive value for the layout(when change theme the look change), but is a none-reactive value for our effect(we wanna access to latest theme but dont wanna run the cleanup when theme is changed).


## Usage example


### Without babel plugin

```jsx
import useNoneReactiveState from  'use-none-reactive-state';

function  Component() {
  const [noneReactiveTheme, setNoneReactiveTheme, noneReactiveThemeRef] = useNoneReactiveState('dark');

  useEffect(() => {
   // with noneReactiveTheme from useNoneReactiveState, u could still get the latest value without have to run the cleanup when noneReactiveTheme is changed
    connection.onConnect(() =>  console.log(noneReactiveThemeRef.current));
    return () => connection.disconnect();
  }, []);

  useEffect(() => {
    console.log(nonReactiveTheme)
    return () => {
      console.log('nonReactiveTheme become reactive');
    };
  // If you want, you can put the value into dependencies list and it works normally like normal useState.
  }, [nonReactiveTheme])


  const reactiveCallback = useCallback|useMemo(() => {
  // noneReactiveTheme changed, reference wont change(better optimization)
    console.log(noneReactiveThemeRef.current);
  }, []);
}
```

### With [babel plugin](https://www.npmjs.com/package/babel-plugin-none-reactive-effect)

```jsx
import useNoneReactiveState from  'use-none-reactive-state';

function  Component() {
  const [noneReactiveTheme, setNoneReactiveTheme] = useNoneReactiveState('dark');

  useEffect(() => {
   // with noneReactiveTheme from useNoneReactiveState, u could still get the latest value without have to run the cleanup when noneReactiveTheme is changed
    connection.onConnect(() =>  console.log(noneReactiveTheme));
    return () => connection.disconnect();
  }, []);

  useEffect(() => {
    console.log(noneReactiveTheme);
    return () => {
      console.log('nonReactiveTheme become reactive');
    };
  // If you want, you can put the value into dependencies list and it works normally like normal useState.
  }, [nonReactiveTheme])

  const reactiveCallback = useCallback|useMemo(() => {
  // noneReactiveTheme changed, reference wont change(better optimization)
    console.log(noneReactiveTheme);
  }, []);
}
```
