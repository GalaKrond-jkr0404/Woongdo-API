<h1>[Woongdo API] - '웅도' 사용자 비밀번호 변경</h1>

> ## `POST` /api/pwReset

- 이 API를 사용하는 일반적인 사용자
    - `authorization` 헤더 값으로 사용자 지정하고, `old_userPW`, `new_userPW` 값을 사용하여, userDB에 저장된 사용자의 비밀번호를 변경한다.

- **Headers**
    | # | Name | Description | Required |
    | -- | -- | -- | -- |
    | 1 | `authorization` | 유저 토큰 값 | O |

- **Parameters**
    | # | Name | Description | Data Type | Required |
    | -- | -- | -- | -- | -- |
    | 1 | `old_userPW` | 암호화 된 예전 비밀번호 | `String` | O |
    | 2 | `new_userPW` | 암호화 된 새로운 비밀번호 | `String` | O |

- **Response Classes**
    | # | Name | Data Type | Description |
    | -- | -- | -- | -- |
    | 1 | `isError` | `Boolean` | |
    | 2 | `message` | `String` | |

- **Response Errors**
    - 발생할 수 있는 모든 오류는 `message` 항목을 참고하시길 바랍니다.