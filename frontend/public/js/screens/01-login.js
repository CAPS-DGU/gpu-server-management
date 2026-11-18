// 01 로그인
import { Button, Field } from '../components.js';

export const title = '01 로그인';

export function render() {
  return `
  <div class="screen screen--surface" style="align-items:center;justify-content:center">
    <form class="card" style="width:440px;padding:40px;gap:14px;border-color:var(--border);border-radius:16px" data-action="login">
      <h1 class="t-title-l">GPU 공동 사용</h1>
      <p class="t-body c-sub">학번으로 로그인하세요</p>
      ${Field('학번', '학번을 입력하세요', { name: 'id' })}
      ${Field('비밀번호', '비밀번호를 입력하세요', { type: 'password', name: 'pw' })}
      ${Button('로그인', 'primary', { href: '#/instances', block: true })}
      ${Button('학교 통합 로그인', 'disabled', { block: true })}
      <p class="t-caption c-sub">학사 시스템 연동 후 사용할 수 있습니다</p>
    </form>
  </div>`;
}
