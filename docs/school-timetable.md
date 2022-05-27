<h1>[Woongdo API] - '단대라이프' 시간표 정보 조회</h1>

> ## `GET` /api/timetable

- 이 API를 사용하는 일반적인 사용자
    - `setGrade` 값을 가진 학년의, `setClass` 값을 가진 반의, `setDate` 값을 가진 요일의 시간표 정보를 조회한다.

 - **Parameters**
    | # | Name | Description | Data Type | Required |
    | -- | -- | -- | -- | -- |
    | 1 | `setGrade` | 학년 [1, 3] | `Number` | O |
    | 2 | `setClass` | 반 [1, 5] | `Number` | O |
    | 3 | `setDate` | 요일 (월요일, 화요일, 수요일, ...) | `String` | O |

 - **Response Classes**
    | # | Name | Data Type | Description |
    | -- | -- | -- | -- |
    | 1 | `isError` | `Boolean` | |
    | 2 | `message` | `String` | |
    | 3 | `grade` | `Number` | |
    | 4 | `class` | `Number` | |
    | 5 | `timeTable` | `Array<string>` | |

- **Response Errors**
    - 발생할 수 있는 모든 오류는 `message` 항목을 참고하시길 바랍니다.
