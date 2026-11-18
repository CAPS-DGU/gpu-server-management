# GPU 공동 사용 플랫폼 — 프론트엔드

Figma 파일 `tf-페이지`의 **'화면 설계' 페이지**에 있는 화면 15개(01 ~ 13)를 Node.js 웹 프로젝트로 옮긴 것입니다.
백엔드(`CAPS-GPU-Server-Manage`)와 섞이지 않도록 저장소 루트의 `frontend` 폴더에 따로 둡니다.

## 실행 방법

필요한 것: Node.js 18 이상 (`node -v`로 확인)

```bash
cd frontend
npm start
```

브라우저에서 http://localhost:3000 을 엽니다. 첫 화면에 전체 화면 목록이 있습니다.

- 외부 라이브러리를 쓰지 않아서 `npm install`은 하지 않아도 됩니다.
- 포트를 바꾸려면 `PORT=4000 npm start`처럼 실행합니다.
- 브라우저 창을 **1280×720**으로 맞추면 Figma 화면(2560×1440)과 같은 비율로 보입니다.

## 폴더 구조

```
(저장소 루트)
├── CAPS-GPU-Server-Manage/   백엔드
├── docs/
└── frontend/                 프론트엔드 (npm 프로젝트)
    ├── package.json          npm start → node server.js
    ├── server.js             Node.js 기본 모듈(http)로 만든 정적 파일 서버
    ├── README.md             이 문서
    └── public/
        ├── index.html
        ├── css/
        │   ├── tokens.css     Figma 변수(색) · 글자 스타일
        │   └── components.css 컴포넌트 모양
        └── js/
            ├── app.js         주소(#/...)에 따라 화면 전환
            ├── components.js  Figma 컴포넌트를 옮긴 코드 부품
            └── screens/       화면 하나 = 파일 하나
```

## 화면과 주소

| Figma 프레임 | 주소 | 파일 |
|---|---|---|
| 01 로그인 | `#/login` | 01-login.js |
| 02 내 인스턴스 | `#/instances` | 02-instances.js |
| 03 내 인스턴스 (빈 목록) | `#/instances/empty` | 03-instances-empty.js |
| 04 인스턴스 생성 | `#/create` | 04-create.js |
| 04-2 인스턴스 생성 | `#/create/class` | 04-2-create-class.js |
| 05 인스턴스 상세 (실행 중) | `#/instances/running` | 05-instance-running.js |
| 06 인스턴스 상세 (종료됨) | `#/instances/stopped` | 06-instance-stopped.js |
| 07 알림 | `#/alerts` | 07-alerts.js |
| 08 알림 (모바일 웹) | `#/m/alerts` | 08-alerts-mobile.js |
| 09 관리자 · 장비 | `#/admin/equipment` | 09-admin-equipment.js |
| 10 관리자 · 그래픽카드 | `#/admin/gpus` | 10-admin-gpus.js |
| 11 관리자 · 인스턴스 | `#/admin/instances` | 11-admin-instances.js |
| 11-2 관리자 종료 (모달) | `#/admin/instances/terminate` | 11-admin-instances.js |
| 12 관리자 · 티어 | `#/admin/tiers` | 12-admin-tiers.js |
| 13 관리자 · 크레딧 | `#/admin/credits` | 13-admin-credits.js |

## Figma 컴포넌트 ↔ 코드 부품 (components.js)

| Figma | 코드 |
|---|---|
| 버튼 (기본/보조/위험/비활성) | `Button(label, kind)` |
| 티어 | `TierBadge(tier)` |
| gpu 상태 | `StatusBadge(status)` |
| 작은 배지 | `Chip(label, color)` |
| 선택 상자 | `Select(label)` |
| 입력란 | `Field(label, placeholder)` |
| 표 입력 | `CellInput(value, width)` |
| 값 상자 | `ValueBox(value)` |
| 스위치 | `Switch(on)` |
| 사용량 막대 | `UsageBar(state, fill)` |
| 상단바 · 크레딧 잔액 | `TopBar()` |
| 사이드바 · 내비 항목 | `Sidebar(active)` |
| 티어 선택 카드 | `TierCard(data, state)` |
| 알림 항목 | `AlertItem(data)` |
| 인스턴스 행 | `InstanceRow(data)` |

## 동작하는 것

- 화면 사이 이동 (상단바, 사이드바, 버튼)
- 04 인스턴스 생성: 티어 카드를 누르면 선택과 아래 요약이 바뀜
- 11 관리자 · 인스턴스: '관리자 종료'를 누르면 종료 모달이 열림
- 12 관리자 · 티어: 명목 크기를 고치면 가용 크기(명목 + 측정 상수 256MB)를 바로 다시 계산
- 스위치 켜기/끄기, 접속 명령 복사

화면의 숫자는 모두 Figma에 있는 예시 값이며, 서버 API와는 아직 연결되어 있지 않습니다.
