<h1>[Woongdo API] - '웅도' 사용자 탈퇴</h1>

> ## `DELETE` /api/withDraw

- 이 API를 사용하는 일반적인 사용자
    - `authorization` 헤더 값으로 사용자 지정하여 userDB에 저장된 사용자를 삭제한다.

- **Headers**
    | # | Name | Description | Required |
    | -- | -- | -- | -- |
    | 1 | `authorization` | 유저 토큰 값 | O |

- **Response Classes**
    | # | Name | Data Type | Description |
    | -- | -- | -- | -- |
    | 1 | `isError` | `Boolean` | |
    | 2 | `message` | `String` | |

- **Response Errors**
    - 발생할 수 있는 모든 오류는 `message` 항목을 참고하시길 바랍니다.