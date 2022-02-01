<h1>[Woongdo API] - '단대라이브러리' 책 대출 신청</h1>

> ## `PUT` /api/loanAction

- 이 API를 사용하는 일반적인 사용자
    - `authorization` 헤더 값을 사용하여, 사용자의 아이디를 구한다.
    - `bookID` 값을 가진 책을 대출한다.

 - **Headers**
    | # | Name | Description | Required |
    | -- | -- | -- | -- |
    | 1 | `authorization` | 유저 토큰 값 | O |

 - **Parameters**
    | # | Name | Description | Data Type | Required |
    | -- | -- | -- | -- | -- |
    | 1 | `bookID` | 빌릴 책 청구기호 값 | `String` | O |

 - **Response Classes**
    | # | Name | Data Type | Description |
    | -- | -- | -- | -- |
    | 1 | `isError` | `Boolean` | |
    | 2 | `message` | `String` | |

- **Response Errors**
    - 발생할 수 있는 모든 오류는 `message` 항목을 참고하시길 바랍니다.
