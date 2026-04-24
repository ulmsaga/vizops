# vizops

> **viz** · ops — Full-stack OSS Visualization GUI Template

---

## 이름의 어원 (Etymology)

| 구성 | 원어 | 의미 |
|------|------|------|
| **viz** | Visualization | 데이터를 그래프·토폴로지·차트로 시각적으로 표현하는 행위 |
| **ops** | Operations Support System (OSS) | 통신사 운영 지원 시스템 — NMS 상위 계층에서 장애·성능·서비스를 통합 관리 |

```
NE  (Network Element, 실제 장비)
 ↓
EMS (Element Management System)
 ↓
NMS (Network Management System)
 ↓
OSS (Operations Support System)  ←  vizops 가 시각화하는 계층
```

**vizops** = OSS 계층의 데이터를 누구나 쉽게 볼 수 있도록 만드는 풀스택 GUI 템플릿.

---

## 프로젝트 목표

- 통신/네트워크 운영 환경(OSS)에서 반복적으로 필요한 시각화 UI를 **재사용 가능한 템플릿**으로 제공
- 프론트엔드(대시보드·토폴로지·알람)와 백엔드(API·데이터 파이프라인)를 **풀스택으로 포함**
- Jarvis 팀 자동화 인프라의 **첫 번째 프로젝트**로, `@bot` 명령어로 코드 리뷰·보안 수정·문서화를 자동화

---

## 구성 (예정)

```
vizops/
├── frontend/   # 시각화 UI (React + D3.js / ECharts)
│   ├── topology/   # 네트워크 토폴로지 뷰
│   ├── dashboard/  # KPI · 알람 대시보드
│   └── alarm/      # 장애 목록 · 필터
└── backend/    # API 서버 (FastAPI / Node.js)
    ├── api/        # REST API
    ├── collector/  # 데이터 수집 어댑터
    └── db/         # 모델 · 마이그레이션
```

---

## Jarvis 연동

이 저장소는 [Jarvis](https://github.com/ulmsaga/jarvis) 팀 자동화 인프라와 연동됩니다.

```
# Slack에서 바로 작업 요청
@bot review  repo:vizops branch:main skill:code-review
@bot fix     repo:vizops branch:main skill:safe-security-fix
@bot doc     repo:vizops branch:main skill:generate-docs
```

---

*vizops — Powered by Jarvis 🤖*
