<h1>[Woongdo API] - '단대라이브러리' 책 정보 조회</h1>

> ## `GET` /api/search

- 이 API를 사용하는 일반적인 사용자
    - `authorization` 헤더 값을 사용하여, 본교 학생인지 판별한다.
    - `option` 값을 사용하여, 검색 대상을 지정한다. (책 제목, 작가, 출판사로 검색)
    - `option` 값에 부합하는 `query` 값을 사용하여, 책 정보를 조회한다.

- **Headers**
    | # | Name | Description | Required |
    | -- | -- | -- | -- |
    | 1 | `authorization` | 유저 토큰 값 | O |

- **Parameters**
    | # | Name | Description | Data Type | Required |
    | -- | -- | -- | -- | -- |
    | 1 | `query` | `option` 항목에 부합하는 데이터 값 | `String` | O |
    | 2 | `option` | title, author, company... | `String` | O |

- **Response Classes**
    | # | Name | Data Type | Description |
    | -- | -- | -- | -- |
    | 1 | `isError` | `Boolean` | |
    | 2 | `message` | `String` | |
    | 3 | `rows` | `Array<SearchBookData>` | SearchBookData에 대한 자료형은 하단 참조 |

    - **SearchBookData**

        | # | Name | Data Type | Description |
        | -- | -- | -- | -- |
        | 1 | `idx` | `Number` | |
        | 2 | `title` | `String` | 책 제목 |
        | 3 | `author` | `String` | 책 작가 |
        | 4 | `company` | `String` | 책 출판사 |
        | 5 | `status` | `Number` | 책 상태 (0: `대출가능`, 1: `대출중`, 2: `대출불가`) |

- **Response Errors**
    - 발생할 수 있는 모든 오류는 `message` 항목을 참고하시길 바랍니다.