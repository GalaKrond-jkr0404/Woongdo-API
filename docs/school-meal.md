<h1>[Woongdo API] - '단대라이프' 급식 정보 조회</h1>

> ## `GET` /api/meal

- 이 API를 사용하는 일반적인 사용자
    - `YMD` 값을 가진 날짜의 급식 정보를 조회한다.

 - **Parameters**
    | # | Name | Description | Data Type | Required |
    | -- | -- | -- | -- | -- |
    | 1 | `YMD` | YYYY-MM-DD값 (ex. 2022-01-01) | `String` | O |

 - **Response Classes**
    | # | Name | Data Type | Description |
    | -- | -- | -- | -- |
    | 1 | `isError` | `Boolean` | |
    | 2 | `message` | `String` | |
    | 3 | `mealData` | Array<mealData> | mealData에 대한 자료형은 하단 참조 |

    - **mealData**

        | # | Name | Data Type | Description |
        | -- | -- | -- | -- |
        | 1 | `title` | `String` | 급식 정보 (중식, 석식) |
        | 2 | `menu` | `Array<string>` | 급식 메뉴 |

- **Response Errors**
    - 발생할 수 있는 모든 오류는 `message` 항목을 참고하시길 바랍니다.