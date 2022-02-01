<h1>[Woongdo API] - '웅도' 로그인 & 사용자 토큰 조회</h1>

> ## `POST` /api/login

- 이 API를 사용하는 일반적인 사용자
    - `userID`, `userPW` 값을 사용하여, userDB에 저장된 사용자의 유저 토큰 값을 리턴 받는다. (실제로는 로그인 처리가 되지 않음.)

- **Parameters**
    | # | Name | Description | Data Type | Required |
    | -- | -- | -- | -- | -- |
    | 1 | `userID` | 암호화 된 아이디 | `String` | O |
    | 2 | `userPW` | 암호화 된 비밀번호 | `String` | O |

- **Response Classes**
    | # | Name | Data Type | Description |
    | -- | -- | -- | -- |
    | 1 | `isError` | `Boolean` | |
    | 3 | `message` | `String` | |
    | 4 | `token` | `Number` | 유저 토큰 값 |

- **Response Errors**
    - 발생할 수 있는 모든 오류는 `message` 항목을 참고하시길 바랍니다.