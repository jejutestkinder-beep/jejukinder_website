# 제주 발도르프 어린이집 웹사이트 프로젝트

이 프로젝트는 Astro 프레임워크와 Tailwind CSS를 기반으로 구축된 제주 발도르프 어린이집의 공식 웹사이트입니다.

## 🛠 기술 스택

- **Framework**: Astro 5.x
- **Styling**: Tailwind CSS
- **CMS**: Decap CMS (Netlify Identity 기반)
- **Icons**: Astro-icon (로컬 SVG 방식)
- **Deployment**: Netlify

## 🎨 색상 시스템 (Color System)

모든 색상은 `src/utils/colors.ts`에서 중앙 집중식으로 관리되며, Tailwind 설정에도 등록되어 있습니다.

| 이름 | 코드 | 클래스 (Tailwind) | 용도 |
| :--- | :--- | :--- | :--- |
| **brown** | `#674949` | `bg-custom-brown`, `text-custom-brown` | 주요 타이틀, 강조 텍스트 |
| **rose** | `#C64444` | `bg-custom-rose`, `text-custom-rose` | 브랜드 포인트 컬러, 링크, 버튼 |
| **bgPink** | `#FFFAF8` | `bg-custom-bgPink` | 섹션 배경색 (매우 연한 핑크) |
| **lightPink** | `#FFEEE8` | `bg-custom-lightPink` | 아이콘 배경, 강조 섹션 |
| **lightYellow** | `#FFFDF4` | `bg-custom-lightYellow` | 보조 섹션 배경색 |
| **green** | `#227A71` | `bg-custom-green` | 보조 포인트 컬러, 버튼 |
| **grey** | `#D0CECE` | `text-custom-grey` | 비활성 텍스트, 보더 |
| **darkGrey** | `#6C6C6C` | `text-custom-darkGrey` | 푸터 텍스트, 보조 설명 |

## 📦 주요 컴포넌트 가이드

### 1. `Hero.astro`
- 페이지 최상단 이미지/그라데이션 섹션
- **Props**: `title`, `description` (선택), `image` (배경 이미지), `gradient` (배경색 옵션)
- **사용 페이지**: 교육 및 운영 철학(`education.astro`), 하루 일과(`rhythm.astro`), 연혁 및 시설(`status.astro`), 교육 철학(`philosophy.astro`), 자주 묻는 질문(`faq.astro`), 어린이집 후기(`testimonial.astro`)

### 2. `HeroIndex.astro`
- 메인 페이지 전용 대형 히어로 섹션
- **사용 페이지**: 메인 페이지(`index.astro`)

### 3. `CardSection.astro`
- 여러 개의 카드를 격자 형태로 배치하는 섹션
- **특징**: `cardType`에 따라 `default`, `image`, `vertical` 스타일 지원
- **아이콘**: `src/assets/icons/` 내의 SVG 파일명으로 호출 가능
- **사용 페이지**: 교육 및 운영 철학(`education.astro`), 하루 일과(`rhythm.astro`), 연혁 및 시설(`status.astro`), 교육 철학(`philosophy.astro`)

### 4. `Content2Col.astro`
- 이미지와 텍스트가 양옆으로 배치되는 2컬럼 섹션
- **특징**: 스크롤 시 이미지 **패럴랙스(Parallax)** 효과 적용, 모바일에서 **제목 -> 이미지 -> 본문** 순서로 자동 재배치
- **사용 페이지**: 교육 및 운영 철학(`education.astro`), 연혁 및 시설(`status.astro`), 교육 철학(`philosophy.astro`)

### 5. `Content1Col.astro`
- 단일 컬럼 형태의 텍스트 강조 섹션
- **사용 페이지**: 교육 및 운영 철학(`education.astro`), 연혁 및 시설(`status.astro`), 교육 철학(`philosophy.astro`)

### 6. `Content3Col.astro`
- 3개의 이미지를 나란히 배치하는 그리드 섹션
- **사용 페이지**: 메인 페이지(`index.astro`)

### 7. `PostList.astro`
- 공지사항 및 게시판 목록 렌더링
- **특징**: 헤더 영역에 배경 이미지 지원, 최신글 정렬 기능 포함
- **사용 페이지**: 어린이집 소식(`notices/[...page].astro`), 어린이집 이야기(`board/[...page].astro`)

### 8. `ContactSection.astro`
- 하단 컨택 포인트(상담하기) 섹션
- **사용 페이지**: 메인 페이지(`index.astro`)

### 9. `NoticePopup.astro`
- 메인 페이지 팝업 공지
- **특징**: 최대 2개 동시 노출, 데스크탑에서 **Side-by-Side** 배치, '오늘 하루 보지 않기' 기능(LocalStorage)
- **사용 페이지**: 메인 페이지(`index.astro`)

## 📝 콘텐츠 관리 (Decap CMS)

- **경로**: `/admin`
- **게시판**: 작성자, 카테고리(행사 안내, 학교 소식, 기타) 필수 입력
- **공지사항**: 팝업 설정 가능 (최대 2개 권장)
- **설정**: `public/admin/config.yml`에서 필드 정의

## 🚀 개발 및 빌드

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
```

## ⚠️ 주의 사항

1. **아이콘 추가**: 새로운 아이콘이 필요하면 `src/assets/icons/` 폴더에 SVG 파일을 넣고, 파일명을 컴포넌트의 `icon` 속성에 전달하세요.
2. **배포 충돌**: 라이브 사이트 Admin에서 글을 작성한 경우, 로컬에서 작업 전 반드시 `git pull --rebase`를 실행하여 데이터를 동기화하세요.
3. **이미지 최적화**: Astro의 `<Image />` 컴포넌트 또는 `ImageMetadata`를 사용하여 성능을 유지하세요.
