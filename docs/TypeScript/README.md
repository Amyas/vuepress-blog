# TypeScript

## 基础类型

``` ts
// 基础类型

// 布尔
let isDone: boolean = true;

// 数字
let score: number = 20;

// 字符串
let str: string = "amyas";

// 字符串拼接
let str1: string = `Hello, my name is ${str}`;

// 数组：数字类型
let list: number[] = [1, 2, 3, 4];

// 数组：数字泛型
let list1: Array<number> = [1, 2, 3];

// 元组
let x: [string, number] = ["1", 2];

// 枚举
enum Color {
  Red = 1,
  Green,
  Blue,
}

let color: Color = Color.Green;

// any
let notSure: any = 4;
notSure = "amyas";
notSure = true;

// void
function warnUser(): void {
  console.log(123);
}

// null undefined
let u: undefined = undefined;
let n: null = null;

// 联合类型
let num: number | null = 3;
num = null;

// never
function error(msg: string): never {
  throw new Error(msg);
}

function fail() {
  return error("something faied");
}

// Object
declare function create(o: object | null): void;

create({ prop: 0 });
create(null);

// 强制转换
let someVal: any = "this is a string";
let strLen: number = (someVal as string).length;

```

## var声明

## let声明

## const声明

## 解构

## 展开

## 接口

## 类

## 函数

## 泛型

## 类型推断

## 高级类型-交叉类型

## 高级类型-联合类型

## 高级类型-类型保护

## 高级类型-可以为null的类型+字符串字面量类型
