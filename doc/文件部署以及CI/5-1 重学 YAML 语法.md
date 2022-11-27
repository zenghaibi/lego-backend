#### Github Actions 简介

**学习YAML**

YAML(YAML Ain't a Markup Language) 是一种标记语言，它使用空格作为缩进，看起来

非常的简洁，可读性非常的好，非常适合一些内容大䋞和配置文件

```
# document start
# scalars 纯量，不能再分割的量
key: value
a_number_value: 100
boolean: true
# 字符串是不需要使用引号，但是使用了也不会报错
quote_string: 'quote string'
# 多行字符串可以使用 literal block,也就是竖线
mutiple_string: |
	line one
	line two
	line three

# COLLERCTION TYPE 集合类型

```

##### 示例代码：
```
# doucment start
# scalars 纯量，不能再分割的量
key: value
number: 100
boolean: true
# 字符串是不需要命名用引号的，但是使用了也不会报错
quote_string: 'quote string'
# 多行字符串可以使用literal block 也就是竖线
mutiple_string: |
  line one
  line two
  line three
# COLLECTION TYPES 集合类型
# 使用缩进表示层级关系，最好是两个空格
# 不是也没有关系，只人对齐就可以，比如统一三个空格
person:
  name: viking
  age:30
  address:
    city: 'shanghai'

# Sequences 数组或者列表
hobbies:
  - Item 1
  - Item 2
  - name: 'wedon'
    value: 'xyz'
    address:
      city: 'beijing'
```

##### 在线检测试工具
http: yamlchecker.com