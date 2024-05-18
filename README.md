## Introduction

use-none-reactive-state is a React custom hook to solve problem with none-reactive value inside useEffect. Read more [here](https://react.dev/learn/separating-events-from-effects#extracting-non-reactive-logic-out-of-effects). This hook come with a <b>[babel plugin](https://www.npmjs.com/package/babel-plugin-none-reactive-effect)</b> so you dont have to do the extra job on modifying your code, just replace useState with useNoneReactiveState.

### Usage example

<b>Without babel plugin</b>

```jsx
import useNoneReactiveState from 'use-none-reactive-state'

function Component() {
  const [theme, setTheme, ThemeRef] = useNoneReactiveState('dark')

  useEffect(() => {
    // This will ensure u still get the latest value inside the callback
    connection.onConnect(() => console.log(themeRef.current))
  }, [])
}
```

<b>With [babel plugin](https://www.npmjs.com/package/babel-plugin-none-reactive-effect)</b>

```jsx
import useNoneReactiveState from 'use-none-reactive-state'

function Component() {
  const [theme, setTheme] = useNoneReactiveState('dark')

  useEffect(() => {
    connection.onConnect(() => console.log(theme))
    // If u add theme to deps list it will work like normal useState(when theme change, cleanup function is triggered)
  }, [])
}
```