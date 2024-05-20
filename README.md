## Introduction

While working on a project that need to deal with different sockets at the same time. I had a several issues with handle reactive/non-reactive value in useEffect | useCallback | useMemo with React, in differents usecase reactive value can become non-reactive and vice versa. Take a look at [this react offical document](https://react.dev/learn/separating-events-from-effects#extracting-non-reactive-logic-out-of-effects) for further explaination. This hook come with a(optional) [babel plugin](https://www.npmjs.com/package/babel-plugin-none-reactive-effect so you dont have to do the extra job on modifying your code, just replace useState with useNoneReactiveState.

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
import useNoneReactiveState from 'use-none-reactive-state'

function ChatRoom({ roomName }) {
  const [theme, setTheme, themeRef] = useState('dark')

  useEffect(() => {
    // This will ensure u still get the latest value inside the callback
    connection.onConnect(() => console.log(themeRef.current))

    return () => connection.disconnect();
  }, [roomName])
}
```

### With [babel plugin](https://www.npmjs.com/package/babel-plugin-none-reactive-effect)

```jsx
import useNoneReactiveState from 'use-none-reactive-state'

function Component() {
  // Only have to replace useState with useNoneReactive state
  const [theme, setTheme] = useNoneReactiveState('dark')

  useEffect(() => {
    connection.onConnect(() => console.log(theme))
    // If u add theme to deps list it will work like normal useState(when theme change, cleanup function is triggered)
  }, [])
}
```