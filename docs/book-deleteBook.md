<h1>[Woongdo API] - '단대라이브러리' 기존 책 삭제</h1>

> ## `PUT` /api/deleteBook

- 이 API를 사용하는 일반적인 사용자
    - 사용할 수 없습니다.

- 이 API를 사용하는 관리자 (관리자 여부는 토큰 값을 사용해서 분류)
    - `bID` 값을 사용하여, bookDataDB에 저장된 책을 삭제한다.

- **Headers**
    | # | Name | Description | Required |
    | -- | -- | -- | -- |
    | 1 | `authorization` | 유저 토큰 값 | O |

- **Parameters**
    | # | Name | Description | Data Type | Required |
    | -- | -- | -- | -- | -- |
    | 1 | `bID` | 책 식별 아이디 (분류 번호) | `String` | O |

- **Response Classes**
    | # | Name | Data Type | Description |
    | -- | -- | -- | -- |
    | 1 | `isError` | `Boolean` | |
    | 2 | `message` | `String` | |

- **Response Errors**
    - 발생할 수 있는 모든 오류는 `message` 항목을 참고하시길 바랍니다.