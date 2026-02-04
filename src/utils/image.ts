/**
 * CMS에 저장된 이미지 경로를 사이트에서 쓸 수 있도록 정규화합니다.
 * 상대 경로(예: "uploads/xxx.jpeg")는 루트 기준 절대 경로("/uploads/xxx.jpeg")로 바꿉니다.
 */
export function normalizeUploadPath(image: string | undefined): string {
  if (!image || typeof image !== 'string' || image.trim() === '') return '';
  const trimmed = image.trim();
  return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
}
