<h1>[Woongdo API] - '단대라이브러리' 새로운 책 추가</h1>

> ## `PUT` /api/addBook

- 이 API를 사용하는 일반적인 사용자
    - 사용할 수 없습니다.

- 이 API를 사용하는 관리자 (관리자 여부는 토큰 값을 사용해서 분류)
    - `bTitle`, `bAuthor`, `bCompany`, `bID` 값을 사용하여, bookDataDB에 새로운 책을 추가한다.

- **Headers**
    | # | Name | Description | Required |
    | -- | -- | -- | -- |
    | 1 | `authorization` | 유저 토큰 값 | O |

- **Parameters**
    | # | Name | Description | Data Type | Required |
    | -- | -- | -- | -- | -- |
    | 1 | `bTitle` | 책 제목 | `String` | O |
    | 2 | `bAuthor` | 책 작가 (ex. 황순원 글;고성원 그림) | `String` | O |
    | 3 | `bCompany` | 책 출판사 | `String` | O |
    | 4 | `bID` | 책 식별 아이디 (분류 번호) | `String` | O |

- **Response Classes**
    | # | Name | Data Type | Description |
    | -- | -- | -- | -- |
    | 1 | `isError` | `Boolean` | |
    | 2 | `message` | `String` | |

- **Response Errors**
    - 발생할 수 있는 모든 오류는 `message` 항목을 참고하시길 바랍니다.