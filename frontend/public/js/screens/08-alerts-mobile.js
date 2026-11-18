// 08 알림 (모바일 웹) — 390×844 기준
import { AlertItem } from '../components.js';

export const title = '08 알림 (모바일 웹)';
export const mobile = true;

const alerts = [
  { level: 'warn', title: '메모리 92% · 실습-cnn', desc: '몫의 90% 경고 문턱 초과', time: '방금' },
  { level: 'danger', title: '시작 실패 · gan-실험', desc: 'CUDA 초기화 실패', time: '12분' },
  { level: 'warn', title: '크레딧 잔액 부족', desc: '남은 38 · 약 1시간', time: '어제' },
];

export function render() {
  return `
  <div class="screen screen--surface" style="flex-direction:column;max-width:390px;margin:0 auto">
    <header class="row between" style="height:60px;padding:0 20px;background:var(--bg);flex:none">
      <span class="t-title-s">GPU 공동 사용</span>
      <span class="t-sub c-sub">2020112028</span>
    </header>
    <main class="col" style="padding:20px;gap:12px">
      <h1 class="t-title-m">알림</h1>
      <div class="col" style="gap:4px;padding:14px 16px;background:var(--surface-strong);border:1px solid var(--border-soft);border-radius:14px">
        <span class="t-caption c-sub">GPU 공동 사용 · 지금</span>
        <span class="t-strong">메모리 사용량 92% · 실습-cnn</span>
        <span class="t-sub c-sub">몫의 90% 경고 문턱을 넘었습니다.</span>
      </div>
      ${alerts.map(AlertItem).join('')}
    </main>
  </div>`;
}
