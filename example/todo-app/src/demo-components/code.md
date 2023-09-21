> useRewireState example in todo-list-wrapper

```typescript js
const initialState = createInitialState<{tasks: string[]}>('todo-list', {
  tasks: []
})
const reducerSlice = createReducerSlice(initialState, {
  mount: (state, url: string) => state,
  updateTasks: (state, actionData: string[], props) => {
    state.tasks = actionData
    return state
  }
})
const actionsSlice = createActionSlice(reducerSlice, {
  mount: async (url, {actions}) => {
    const response = await fetch(url)
    const jsonData: string[] = (await response.json()).map((_: any) => _.todo)
    actions.updateTasks(jsonData)
  }
})
```

```typescript
  const [,tasks, actions] = useRewireState('todo-list', actionsSlice, state => state.tasks)
  useEffect(() => {
    actions.mount("https://api.npoint.io/b9a6a4aa275f4c538e9d")
  }, [])
```

> New File todo-shared.ts

```typescript
export const todoShared = createSharedState('todo-share', actionsSlice, false)
```

```typescript
  const [,tasks, actions] = useSharedState('', todoShared, state => state.tasks)
  useEffect(() => {
    actions.mount("https://api.npoint.io/b9a6a4aa275f4c538e9d")
  }, [])
```

> Add Task reducer

```typescript
  addTask: (state, actionData: string, props) => {
    state.tasks.push(actionData)
    return state
  }
```

```typescript
  const [,,actions] = useSharedState('', todoShared, noneSelector)
```

```typescript
    const value: string = (e.nativeEvent.target as any)?.[0]?.value
    //TODO: handleAdd(value)
    actions.addTask(value)
```
