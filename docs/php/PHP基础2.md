# PHP基础2

## 定义常量

``` php
// 1、定义常量
define('NAME', 'Amyas');
define('AGE', 18);
echo NAME, '<br />', AGE; // Amyas 18


// 2、使用特殊字符做变量名
define('%-%', 'Amyas');
echo constant('%-%'); // Amyas

// 3、判断常量是否已经定义
define('NAME', 'Tom');
if(!defined('NAME')) {
    define('NAME', 'Amyas');
}
echo NAME; // Amyas

// 4、通过const定义常量
const NAME = 'Amyas';
echo NAME; // Amyas
```
::: tip 小结
1. 定义常量有两种方式：`define()`和`const`
2. 常量在整个运行过程中值保持不变， 变量不能重新定义
3. 使用`constant()`获取特殊字符常量的值
4. `defined()`用来判断常量是否被定义
:::

## 预定义常量、魔术常量

``` php
// 1、预定义常量（PHP预先定义好的常量）
echo PHP_VERSION, '<br />';    // PHP版本号
echo PHP_OS, '<br />';         // PHP操作系统
echo PHP_INT_MAX, '<br />';    // PHP中整形的最大值

// 2、魔术常量
echo __LINE__, '<br />';       // 获取当前行号 8
echo __LINE__, '<br />';       // 9
echo __FILE__, '<br />';       // 文件的完整路径和文件夹
echo __DIR__, '<br />';        // 文件所在的目录
```

## 数据类型 - 数组

``` php
// 1、索引数组的声明
$stu = array('tom','jack','amyas'); // 索引数组
print_r($stu);   // 只打印值
echo '<br />';
var_dump($stu);  // 打印详细信息 
echo '<br />';
echo $stu[0], '<br />';    // tom
echo $stu[1], '<br />';    // jack
echo $stu[2], '<hr />';    // amyas

// 2、关联数组
$emp = array('name'=>'Amyas','sex'=>'男','age'=>23);
print_r($emp);
echo '<br />';
echo $emp['name'], '<br />'; // Amyas
echo $emp['sex'], '<br />';  // 男
echo $emp['age'], '<br />';  // 23
```

::: tip 小结
1. 数组有两种形式
   + 索引数组（用整数做下标，默认从0开始，后面依次加一）
   + 关联数组（用字符串做下标，用过`=>`关联起来）
:::

## 数据类型 - 数组下标

## 数据类型 - 特殊类型

## 数据类型 - 类型转换

## 算术运算符

## 比较运算符、逻辑运算符

## 赋值、字符串连接、错误抑制、三元运算符、null合并

## 判断的语法、判断闰年

## 判断成绩

## 更改颜色