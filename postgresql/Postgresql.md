# Postgresql sql 따라잡기

## Posgresql이란?

- PostgreSQL은 무료 ORDBMS중 하나로 1996년 첫 출시되었습니다.

- 오라클 개발자들이 PostgreSQL 개발에 합류하여 oracle과 유사합니다.

- 전세계적으로의 트렌드는 4위에 랭킹되어 있으며 작년, 전달대비 꾸준히 점유율이 증가하고 있는 DB입니다.

<p align="center"><img src=".\IMG\1.png"></p>

> ORDBMS : ORDBMS는 관계형 및 객체 지향 데이터베이스 모델을 기반으로하는 객체 지향 관계형 데이터베이스 관리 시스템입니다.

> RDBMS : RDBMS는 관계형 데이터 모델을 기반으로하는 관계형 데이터베이스 관리 시스템입니다.

> DBMS : Database Management System으로 데이터베이스 내 데이터에 접근,사용할수 있도록 해주는 프로그램

<p align="center"><img src=".\IMG\2.png"></p>

## 1번 CREATE USER,DB,SCHEMA

- postgresql에서 먼저 user를 추가 하기위해 유저 테이블을 보도록 하겠습니다.

```sql
select * from pg_user;

    --postgresql 최신 버전에서 유저테이블 확인

select * from pg_shadow;

    --postgresql 8.1 이하 버전에서 유저테이블 확인
```

- 이렇게 하면 기본적인 유저의 `table`에 배치된 유저가 보일겁니다.

- 이제 유저를 만들어볼게요

```sql
create user kim PASSWORD '1234' SUPERUSER CREATEDB ;

    --user의 이름은 kim 비밀번호는 '1234'에 권한(superuser,createdb)부여
```

- 이번에는 DB를 만들어 보도록 하겠습니다.

```sql
create DATABASE tmpDB OWNER kim;

    --kim이라는 유저로 tmpDB를 만듭니다
```

- DB 안에 schema를 만들겠습니다

```sql
create schema tmpSchema;

    -- tmpSchema 만들기

ALTER schema tmpschema TO tmpschma;

    -- schema 이름 변경

DROP schema tmpchema;

    -- schema  삭제
```

<p align="center"><img src=".\IMG\3.png"></p>

## Data Type

> 잠깐 DataType에 대해서 알고가자!

- 정수타입 (소수는 표현 못함)

  |   타입   |   크기   |                     범위                      |   별칭    |
  | :------: | :------: | :-------------------------------------------: | :-------: |
  | smallint | 2바이트  |               -32768에서 +32767               |   int2    |
  | integer  | 4 바이트 |          -2147483648에서 +2147483647          | int, int4 |
  |  bigint  | 8 바이트 | -9223372036854775808에서 +9223372036854775807 |   int8    |

- 예시

```sql
create table numtest1 (num1 smallint, num2 integer, num3 bigint예시
```

- 정밀 숫자 (매우 큰숫자 저장 가능)

  |  타입   | 크기 |                          범위                           |  별칭   |
  | :-----: | :--: | :-----------------------------------------------------: | :-----: |
  | numeric | 가변 | 소수점 위 131072 자리까지 소수점 아래는 16,383 자리까지 | decimal |

- 예시

```sql
create table numtest2 (num numeric(5, 2));
```

- 소수 타입

  |       타입       |   크기   |                      범위                       |  별칭  |
  | :--------------: | :------: | :---------------------------------------------: | :----: |
  |       real       | 4 바이트 | 최소 6 자리의 정밀도 (적어도 1E-37에서 1E + 37) | float4 |
  | double precision | 8 바이트 | 최소 15 자리의 정밀도 (약 1E-307에서 1E + 308)  | float8 |

- 예시

```sql
create table numtest3 (num1 real, num2 double precision);
```

- 자동 증가 형식

  - 자동 증가 타입이 설정된 컬럼이 포함된 테이블에 데이터를 추가를 하면, 자동 증가 타입의 컬럼에 직접 값을 지정하는 것이 아니라 기본값이 포함되도록 합니다.

  |    타입     |   크기   |         범위          |  별칭   |
  | :---------: | :------: | :-------------------: | :-----: |
  | smallserial | 2 바이트 |        1~32767        | serial2 |
  |   serial    | 4 바이트 |     1~2147483647      | serial4 |
  |  bigserial  | 8 바이트 | 1~9223372036854775807 | serial8 |

- 예시

```sql
create table myfriends (id serial, name varchar(10), address varchar(10));
```

- 문자열 형식

  |         타입         |        크기        |    별칭    |
  | :------------------: | :----------------: | :--------: |
  | character varying(n) |  가변 길이 문자열  | varchar(n) |
  |     character(n)     |  고정 길이 문자열  |  char(n)   |
  |         text         | 제한없이 가변 길이 |            |

- 예시

```sql
create table strtest (str1 varchar(10), str2 char(10));
```

- 날짜/시간
  | 타입 | 크기 | 범위 | 별칭 |
  | :---------: | :------: | :-------------------: | :-----: |
  |timestamp [(p)] [without time zone] | 8 바이트| 날짜와 시간 모두| |
  | timestamp [(p)] [with time zone] |8 바이트 | 날짜와 시간 모두 시간대 포함 |timestamptz |
  |interval [(p)] |12 바이트 |시간 간격 | |
  |date | 4 바이트 |날짜 | |
  |time [(p)] [without time zone] | 8 바이트|시간 | |
  |time [(p)] with time zone |12 바이트 |시간, 시간대 첨부 | timetz |

- 예시

  ```sql
  timestamp                     '2011-11-19 09:20:34'
  timestamp with time zone      '2021-11-19 09:20:34+09'
  date                          '2031-11-19'
  time                          '09:20:34'
  time with time zone           '09:20:34+09'
  ```

## 2번 CREATE TABLE

- 이번엔 tmpSchema에 테이블을 만들어 보도록 할게요

```sql
create table tmpschema."CITY"
(
    ID serial primary key, -- 주키값, 컬럼이 생길때마다 자동 증가
    NAME varchar(20) not null , -- 사람이름 길이는 20자, null허용 안함
    COUNTRYCODE varchar(3) not null ,
    DISTRICT varchar(20) not null ,
    POPULATION int not null -- 인구수 숫자형 타입 , null 허용안함
);
```

## 3번 INSERT (CITY 테이블 활용 )

- 테이블에 데이터를 넣어 봅시다.( 기본형태는 아래와 같습니다.)

```sql
insert into tmpschema."CITY"
VALUES(0,'Deagu','14','anyting',10);

insert into tmpschema."CITY"(name, countrycode, district, population)
VALUES('busan','15','anyting',20);

```

<p align="center"><img src=".\IMG\4.png"></p>

## 4번 SELECT

- 테이블의 요소를 가져오거나 확인 해봅시다.

```sql
select * from tmpschema."CITY";

    -- 모든요소 가져오기
```

- 이번엔 특정 요소만 가져와 보겠습니다.

```sql
select ID,NAME from tmpschema."CITY";

    -- 모든요소 가져오기
```

- 도시중에 대구라는 이름을 가진 도시의 ID를 찾아보겠습니다.

```sql
select id from tmpschema."CITY" where name='Deagu';

```

- 도시중에 대구라는 이름이 `아닌` 도시의 ID를 찾아보겠습니다.

```sql
select id from tmpschema."CITY" where name !='Deagu';

select id from tmpschema."CITY" where name<>'Deagu';
```

## 5번 UPDATE

- 테이블의 요소를 수정해 보겠습니다.(Deagu를 Daegu로 수정해보겠습니다)

```sql
update tmpschema."CITY"
SET name = 'Daegu'
where name = 'Deagu';
```

- 그런데! 만약 있으면 update하고 없으면 insert 할려면 어떻게 해야할까?

- 이것을 흔히 upsert라고 한다.

```sql
INSERT  into tmpschema."CITY" (name, countrycode, district, population)
VALUES('busan','15','anyting',20) ON CONFLICT  (name) do nothing;

    --  CONFILCT (컬럼) do nothing 을 통해 충돌될시 실행을 시키지 않는다!
```

## 6번 DELETE

- 컬럼을 삭제해 보겠습니다!

```sql
insert into tmpschema."CITY"(name, countrycode, district, population)
VALUES('111','11','anyting',22);

    -- 실수로 해당값이 들어갔다 가정해보겠습니다!

delete from tmpschema."CITY" where name = '111';

    -- 그럼 name을 기준으로 컬럼을 찾고 삭제 해주면 됩니다!
```

## 7번 GROUP BY

- 이제 그룹 별로 묶어 보는걸 해보겠습니다!

- 그룹으로 묶기위해서 일단 자료들을 넣어줘야 겠네요

```sql
insert into tmpschema."CITY"(name, countrycode, district, population)
VALUES('busan','15','anyting',21);


insert into tmpschema."CITY"(name, countrycode, district, population)
VALUES('busan','15','anyting',22);
```

- 이제 `CITY` 테이블에서

```sql
select  name,countrycode from tmpschema."CITY" group by name,countrycode;

  -- 도시 이름과 코드를 통해 묶어보았습니다.
```

> Group by에서 주의해야 할점은 데이터를 그룹화 하는 조건의 내용을 select에 적어줘야합니다

## 6번 ORDER BY (ASC,DESC)

- 이번엔 오름차순 내림차순으로 정렬을 해보겠습니다.

```sql
select * from tmpschema."CITY" order by  population ;
  -- 오름차순으로 정렬

select * from tmpschema."CITY" order by  population desc;
  -- 내림차순으로 정렬
```

## 8번 DISTINCT

- DISTINCT는 중복된 자료를 제거하는 문법입니다.

```sql
insert into tmpschema."CITY"(name, countrycode, district, population)
VALUES('111','11','anyting',22);
```

<p align="center"><img src=".\IMG\5.png"></p>

- 위의 insert문을 두번 입력해서 옆과 같은 테이블을 만들었다고 가정하겠습니다.

- 만약 여기서 `select name from tmpschema."CITY"`를 입력하면 대구,부산,111이 여러개로 나오겠죠

- 이걸 간단하게 대구,부산,111 3가지로 중복을 제거 하고 싶을떄 `DISTINCT`를 사용합니다.

```sql
select distinct name from tmpschema."CITY";
  --이름이 중복인 컬럼 제외

select distinct * from tmpschema."CITY";
  -- 완전히 중복인 내용 제외 여기서는 ID가 모두 다르기 때문에 의미가 없습니다.

select distinct on(name) * from tmpschema."CITY" ;
  -- 그래서 distinct on을 통해 이름기준으로 중복인 열을 묶을수도 있습니다.
```

## 9번 LIMIT,OFFSET, Fetch

- 위에서는 중복되는 열을 줄여 봤는데 만약 테이블에 1억개의 결과물이 있어서 이걸 불러온다면 오래걸리겠죠?

- 그래서 이것을 제한하는 LIMIT이 있습니다.

```sql
select  * from tmpschema."CITY" LIMIT 2;

  -- 해당 LIMIT 옆에 숫자를 넣어줘서 양을 줄일수가 있습니다.
```

- 그런데 이렇게하면 가끔씩 예상치 못한 테이블의 배열을 보게될겁니다!

```sql
select  * from tmpschema."CITY"  order by id limit 1 offset 3;
```

- 그 이유는 id 기준으로 orderby 를 하지 않아 아래 테이블에서 몇개를 가져오기 때문이죠

<p align="center"><img src=".\IMG\6.png"></p>

```sql
select  * from tmpschema."CITY"  order by id limit 1 offset 3;
  -- 그렇기 때문에 order by id 기준으로 limit를 먹여봤습니다
```

- 그럼 `id`가 3이후로 2개를 출력하고 싶을때 어떻게 하죠? (그럴땐 Offset을 사용합니다)

```sql
select  * from tmpschema."CITY"  order by id limit 2 offset 3;
  -- id순으로 정렬한 다음 3에서 부터 2개 출력
```

- 또한 비슷한 친구로 `fetch`라는 친구가 있습니다

- LIMIT와 마찬가지로 조회한 결과의 개수를 제한하는 역할을 합니다.(postgresql 에서는 Limit과 Fetch를 동시지원)

```sql
select  * from tmpschema."CITY"  order by id  Fetch first 1 Row ONLY offset 3;
  -- Limit과 같은역할을 합니다
```

## 10번 IN

- 특정 집합(컬럼 혹은 리스트)에서 존재하는지를 판단하는 연산자입니다.

- 만약 여러분이 부산이랑 111이 있는 컬럼의 id를 찾고 싶을떄는 어떻게 해야할까요?

```sql
select  * from tmpschema."CITY" where name in ('busan','111') order by  id;
  -- 해당 in을 사용하여 busan 과 111을 찾아냄
```

## 11번 and(Between)

- and를 연산과 비슷한 Between도 존재합니다.

```sql
select * from tmpschema."CITY" where population >= 20 and population <= 21

select * from tmpschema."CITY" where population between 20 and 21 ;
```

## 12번 LIKE

- 어떤 컬럼의 값이 특정 값과 유사한 패턴을 갖는 값을 모을때 사용

```sql
select * from tmpschema."CITY" where name like 'bu___' ;select
  -- 5글자에 bu로 시작하는 단어는 부산!
```

- `like`의 패턴은 아래와 같습니다

```sql
select
'foo' like 'foo', --true
'foo' like 'f%', --f로 시작하기 때문에 true
'foo' like '_o_', -- 3자리이며 2번째 자리가 o true
'bar' like 'b_' -- 2자리이며 첫번쨰 자리가 b false
```

## 13번 JOIN

- 도시 테이블 하고 도시가 가진 맛집이 있다고 가정하면 두가지의 테이블을 합쳐야합니다.

- 이럴경우 `JOIN`이라는 것을 사용해야합니다

- 조인의 종류는 아래와 가이 다양하게 있습니다.

<p align="center"><img src=".\IMG\7.png"></p>

```sql
select * from tmpschema."Cookhouse" as Cook JOIN tmpschema."CITY" as City ON Cook.cityname = City.name;

  -- Cook City Join
```
