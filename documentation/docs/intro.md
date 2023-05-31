---
sidebar_position: 1
---

# Redux-Rewire

**State management in large-scale react projects**.

## What is Redux-Rewire?

Redux-Rewire is a state management library for React applications.
It is a toolkit built around Redux that provides a simple and clean API to manage state in large-scale React applications.

## Why Redux-Rewire?

Below are some of the reasons why you should use Redux-Rewire in your React applications.

- Incremental stores, though some library provides them but is difficult to implement, and some lacks clear documentation. 
- Convention for proper namespacing components state so that a single component could be used multiple times on a single page without having any kind of side-effects on each other's state.
- State mutation makes code complicated, not taking this seriously could lead to some non-debuggable bugs.
- Implementation of side effects is still nieve in many of the above libraries. Redux-rewire does this through actions file defined next to the component
- Not enough typesafe or complicated to implement as the project grows
- A solution that should work with both web and react-native projects
- Should work with server-side rendering.
- Writing unit test cases is difficult and many times front end projects ignore writing them.
