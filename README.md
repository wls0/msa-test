## Description

1. start.sh 를 실행시키고 localhost:3000 에서 사용하면 됩니다.

```bash
$ sh start.sh
```

```
Post /auth/join : 회원가입
Post /auth/login : 로그인
Post /role : 권한 수정

Post /event : 이벤트 등록
Get /event : 이벤트 조회
Get /event/detail/:eventId : 이벤트 상세 조회
Get /event/reward : 이벤트 보상 조회
Post /event/reward : 이벤트 보상 등록
Post /event/reward/request : 이벤트 보상 요청(유저)
Get /event/reward/request : 이벤트 보상 요청 조회 (유저)
Get /event/reward/request/manager : 이벤트 보상 요청 조회 (관리자)
```

1. 게이트 웨이 서버 조건에 맞게 토큰, 권한 작업을 하고 라우팅이 가능하도록 작업을 진행했습니다.
2. auth 서버는 유저 로그인, 가입, 권한 계정에 대한 권한 관리를 위한 서버로 작업을 진행했습니다.
3. 이벤트 서버는 이벤트 관련 작업 서버로 작업을 진행했습니다.
4. 구조는 이벤트 컬렉션, 보상 컬렉션, 보상 요청 컬렉션을 분리해서 모델을 생성했습니다.
5. 보상 조회시 이벤트 정보가 같이 나와야 하는 조건을 위해 populate를 사용해서 간편하게 정보를 가져오도록 작업을 진행했습니다.
6. 이벤트 관련 일반 유저는 타 유저의 데이터를 조회를 막아야 한다고 생각하여 관리자와 일반 유저간 api를 구분해서 작업을 진행했습니다.
7. early return 방식으로 로직을 작성하여 로직을 이해하기 쉽게 작성했습니다.
8. 재화나 이벤트 타입은 계속 늘어난다고 판단되어서 서버 로직으로는 enum 형태로 데이터를 타입을 작성했습니다.
9. .env는 제출을 위해서 gitignore를 하지않았습니다.
