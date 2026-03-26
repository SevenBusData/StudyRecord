import type { BlogPost } from '../types';

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'React hooks 完全指南',
    excerpt: '本文将详细介绍 React 中的所有钩子函数，包括 useState、useEffect、useContext 等，帮助你更好地理解和使用它们。',
    content: `
# React hooks 完全指南

React hooks 是 React 16.8 引入的新特性，它允许我们在函数组件中使用状态和其他 React 特性。

## useState

useState 是最基础的钩子函数，它用于在函数组件中添加状态。

import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

## useEffect

useEffect 用于处理副作用操作，例如数据获取、订阅或手动修改 DOM。

import { useState, useEffect } from 'react';

function DataFetching() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('https://api.example.com/data')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  return (
    <div>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
    </div>
  );
}

## useContext

useContext 用于在组件树中传递数据，而不必一级一级地传递 props。

import { createContext, useContext } from 'react';

const ThemeContext = createContext('light');

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <ChildComponent />
    </ThemeContext.Provider>
  );
}

function ChildComponent() {
  const theme = useContext(ThemeContext);

  return <p>Current theme: {theme}</p>;
}

## useReducer

useReducer 是 useState 的替代方案，它用于处理复杂的状态逻辑。

import { useReducer } from 'react';

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>Decrement</button>
    </div>
  );
}

## useMemo 和 useCallback

useMemo 和 useCallback 用于性能优化，它们分别用于缓存值和函数。

import { useMemo, useCallback } from 'react';

function ExpensiveComponent({ data }) {
  const processedData = useMemo(() => {
    return processData(data);
  }, [data]);

  const handleClick = useCallback(() => {
    console.log('Button clicked');
  }, []);

  return (
    <div>
      <p>{processedData}</p>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
}

## 自定义钩子

我们也可以创建自己的自定义钩子，以便在多个组件之间共享逻辑。

import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

## 总结

React hooks 是一个强大的特性，它允许我们在函数组件中使用状态和其他 React 特性，同时保持组件的简单性和可复用性。
    `,
    category: '前端开发',
    tags: ['React', 'Hooks', 'JavaScript'],
    date: '2025-10-15',
    readTime: '10 min read',
    author: '张三',
    featuredImage: 'https://images.unsplash.com/photo-1633356122544?w=800&q=80'
  },
  {
    id: '2',
    title: 'TypeScript 高级类型详解',
    excerpt: '本文将深入探讨 TypeScript 的高级类型系统，包括交叉类型、联合类型、泛型、映射类型等，帮助你写出更安全、更可维护的代码。',
    content: `
# TypeScript 高级类型详解

TypeScript 是 JavaScript 的超集，它添加了静态类型系统，帮助我们在开发过程中发现错误。

## 交叉类型

交叉类型使用 & 符号表示，它将多个类型合并为一个类型。

interface A {
  x: number;
}

interface B {
  y: string;
}

type C = A & B;

const c: C = { x: 1, y: 'hello' };

## 联合类型

联合类型使用 | 符号表示，它表示一个值可以是多种类型中的一种。

type StringOrNumber = string | number;

const a: StringOrNumber = 'hello';
const b: StringOrNumber = 42;

## 泛型

泛型允许我们在定义函数、接口或类时不指定具体的类型，而是在使用时指定。

function identity<T>(value: T): T {
  return value;
}

const result = identity<string>('hello');

## 映射类型

映射类型允许我们基于现有类型创建新类型。

interface Person {
  name: string;
  age: number;
}

type PartialPerson = Partial<Person>;
type ReadonlyPerson = Readonly<Person>;

## 条件类型

条件类型允许我们根据条件选择类型。

type IsString<T> = T extends string ? 'yes' : 'no';

type A = IsString<string>;
type B = IsString<number>;

## 总结

TypeScript 的高级类型系统提供了强大的类型检查能力，帮助我们写出更安全、更可维护的代码。
    `,
    category: '前端开发',
    tags: ['TypeScript', 'JavaScript', '类型系统'],
    date: '2025-10-10',
    readTime: '8 min read',
    author: '李四',
    featuredImage: 'https://images.unsplash.com/photo-1633356122544?w=800&q=80'
  },
  {
    id: '3',
    title: 'Node.js 性能优化实战',
    excerpt: '本文将介绍 Node.js 性能优化的一些实战经验，包括代码优化、内存管理、并发处理等方面，帮助你提高应用程序的性能。',
    content: `
# Node.js 性能优化实战

Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境，它允许我们使用 JavaScript 编写服务器端代码。

## 代码优化

### 使用异步函数

异步函数可以提高应用程序的并发处理能力。

// 同步版本
function syncReadFile() {
  const data = fs.readFileSync('file.txt', 'utf8');
  console.log(data);
}

// 异步版本
async function asyncReadFile() {
  const data = await fs.promises.readFile('file.txt', 'utf8');
  console.log(data);
}

### 使用流

流可以处理大量数据而不消耗过多内存。

const fs = require('fs');
const readStream = fs.createReadStream('largeFile.txt');
const writeStream = fs.createWriteStream('output.txt');

readStream.pipe(writeStream);

## 内存管理

### 避免内存泄漏

内存泄漏是 Node.js 应用程序的常见问题，我们可以使用工具来检测内存泄漏。

// 使用 heapdump 工具
const heapdump = require('heapdump');

// 定期生成堆快照
setInterval(() => {
  heapdump.writeSnapshot((err, filename) => {
    console.log('Heap snapshot written to', filename);
  });
}, 60000);

### 使用垃圾回收

Node.js 使用 V8 引擎的垃圾回收机制，我们可以使用 --expose-gc 选项来强制进行垃圾回收。

node --expose-gc app.js

## 并发处理

### 使用 cluster 模块

cluster 模块可以创建多个进程来处理请求，提高应用程序的并发处理能力。

const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isPrimary) {
  console.log(\`Primary \${process.pid} is running\`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(\`worker \${worker.process.pid} died\`);
    cluster.fork();
  });
} else {
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('Hello World\n');
  }).listen(8000);

  console.log(\`Worker \${process.pid} started\`);
}

### 使用 PM2

PM2 是一个进程管理器，它可以帮助我们管理 Node.js 应用程序的进程。

npm install -g pm2

pm2 start app.js -i 0

## 总结

Node.js 性能优化需要综合考虑多个方面，包括代码优化、内存管理、并发处理等。通过使用工具和技术，我们可以提高应用程序的性能。
    `,
    category: '后端开发',
    tags: ['Node.js', '性能优化', 'JavaScript'],
    date: '2025-10-05',
    readTime: '12 min read',
    author: '王五',
    featuredImage: 'https://images.unsplash.com/photo-1633356122544?w=800&q=80'
  }
];
