// 03 내 인스턴스 (빈 목록)
import { UserLayout, Button } from '../components.js';

export const title = '03 내 인스턴스 (빈 목록)';

export function render() {
  return UserLayout({ active: 'instances' }, `
    <h1 class="t-title-m">내 인스턴스</h1>
    <div class="col fill" style="align-items:center;justify-content:center;gap:16px;padding:60px 0;border:1px solid var(--border-soft);border-radius:12px">
      <p class="t-title-s c-sub">아직 인스턴스가 없습니다</p>
      ${Button('인스턴스 생성', 'primary', { href: '#/create' })}
    </div>
  `);
}
