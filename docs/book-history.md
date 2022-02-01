<h1>[Woongdo API] - '단대라이브러리' 사용자 대출 내역 조회</h1>

> ## `GET` /api/history

- 이 API를 사용하는 일반적인 사용자
    - `userID` 값을 사용하여, 특정 사용자의 대출 내역을 조회한다.

- 이 API를 사용하는 관리자 (관리자 여부는 토큰 값을 사용해서 분류)
    - `isLoanned` 값을 사용하여, 대출 내역 중, 반납할 수 있는 내역만 조회한다.

 - **Headers**
    | # | Name | Description | Required |
    | -- | -- | -- | -- |
    | 1 | `authorization` | 유저 토큰 값 | O |

 - **Parameters**
    | # | Name | Description | Data Type | Required |
    | -- | -- | -- | -- | -- |
    | 1 | `userID` | 암호화 되지 않은 아이디 | `String` | O |
    | 2 | `isLoanned` | `true` or `false` | `Boolean` | O |

 - **Response Classes**
    | # | Name | Data Type | Description |
    | -- | -- | -- | -- |
    | 1 | `isError` | `Boolean` | |
    | 2 | `message` | `String` | |
    | 3 | `rows` | `Array<LoannedBookData>` | LoannedBookData에 대한 자료형은 하단 참조 |
    
    - **LoannedBookData**
        | # | Name | Data Type | Description |
        | -- | -- | -- | -- |
        | 1 | `idx` | `Number` | |
        | 2 | `userName` | `String` | 대출자 이름 |
        | 3 | `userID` | `String` | 대출자 아이디 |
        | 4 | `bookTitle` | `String` | 대출된 책 제목 |
        | 5 | `bookAuthor` | `String` | 대출된 책 작가 |
        | 6 | `bookCompany` | `String` | 대출된 책 출판사 |
        | 7 | `bookID` | `String` | 대출된 책 UUID |
        | 8 | `fromDate` | `String` | 대출 날짜 |
        | 9 | `endDate` | `String` | 반납 날짜 |
        | 10 | `status` | `Number` | 책 상태 (0: `반납완료`, 1: `반납미완료`) |

- **Response Errors**
    - 발생할 수 있는 모든 오류는 `message` 항목을 참고하시길 바랍니다.
