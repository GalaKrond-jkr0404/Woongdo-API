<h1>[Woongdo API] - '웅도' 회원가입</h1>

> ## `POST` /api/register

- 이 API를 사용하는 일반적인 사용자
    - `userID`, `userPW`, `userName`, `userBirthday` 값을 사용하여, userDB에 새로운 사용자를 저장한다.

- **Parameters**
    | # | Name | Description | Data Type | Required |
    | -- | -- | -- | -- | -- |
    | 1 | `userID` | 암호화 된 아이디 | `String` | O |
    | 2 | `userPW` | 암호화 된 비밀번호 | `String` | O |
    | 3 | `userName` | 암호화 된 이름 | `String` | O |
    | 4 | `userBirthday` | 암호화 된 생년월일 6자리(ex. 040522) | `String` | O |

- **Response Classes**
    | # | Name | Data Type | Description |
    | -- | -- | -- | -- |
    | 1 | `isError` | `Boolean` | |
    | 2 | `message` | `String` | |

- **Response Errors**
    - 발생할 수 있는 모든 오류는 `message` 항목을 참고하시길 바랍니다.