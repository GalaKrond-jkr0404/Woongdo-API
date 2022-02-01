<h1>[Woongdo API] - '단대라이브러리' DB 정보 조회</h1>

> ## `GET` /api/addBook

- 이 API를 사용하는 일반적인 사용자
    - 사용할 수 없습니다.

- 이 API를 사용하는 관리자 (관리자 여부는 토큰 값을 사용해서 분류)
    - 사용자 수, 저장된 책의 수, 대출 내역 수 정보들을 조회한다.

- **Headers**
    | # | Name | Description | Required |
    | -- | -- | -- | -- |
    | 1 | `authorization` | 유저 토큰 값 | O |

- **Response Classes**
    | # | Name | Data Type | Description |
    | -- | -- | -- | -- |
    | 1 | `isError` | `Boolean` | |
    | 2 | `message` | `String` | |
    | 3 | `cnt` | `Array<number>` | 순서대로 사용자 수, 저장된 책의 수, 대출 내역 수 |

- **Response Errors**
    - 발생할 수 있는 모든 오류는 `message` 항목을 참고하시길 바랍니다.