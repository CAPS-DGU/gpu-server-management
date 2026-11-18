// 10 관리자 · 그래픽카드
// 막대 너비는 여유량에 대한 배정 크기(명목 + 64MB)의 비율
import { AdminLayout, AdminTitle, TierBadge, Chip } from '../components.js';

export const title = '10 관리자 · 그래픽카드';

const gpus = [
  {
    name: 'lab3-gpu01 · GPU 0', spec: 'RTX 4080 SUPER 16GB · 여유량 15,904MB', assigned: '배정 13,888MB (87%)',
    shares: [
      { w: 242.5, tier: 4, who: '2020110512', use: '3.4 / 3.6GB', warn: '경고 · 94%' },
      { w: 485, tier: 2, who: '2020113314 · llm-미세조정', use: '4.1 / 7.4GB' },
      { w: 121.5, tier: 8, who: '2020112028', use: '1.5 / 1.6GB' },
    ],
    free: { w: 123, label: '여유 2016MB' },
  },
  {
    name: 'lab3-gpu02 · GPU 0', spec: 'RTX 4080 SUPER 16GB · 여유량 15,904MB · 수업 좌석', assigned: '배정 15,872MB (99.8%)',
    shares: ['1.1', '0.9', '1.2', '1.0', '0.8', '1.1', '1.3', '1.0']
      .map((u, i) => ({ w: 121.5, tier: 8, who: `학생 ${i + 1}`, use: `${u} / 1.6GB` })),
  },
];

const share = (s) => `
  <div class="col" style="width:${s.w}px;height:110px;flex:none;gap:5px;padding:8px;overflow:hidden;background:var(--surface);
       border:${s.warn ? '3px solid var(--warn)' : '1px solid var(--border)'};border-radius:7px">
    ${TierBadge(s.tier)}
    <span class="t-caption c-sub nowrap">${s.who}</span>
    <span class="t-caption ${s.warn ? 'c-warn' : ''}">${s.use}</span>
    ${s.warn ? `<span>${Chip(s.warn, 'orange')}</span>` : ''}
  </div>`;

export function render() {
  return AdminLayout('gpus', `
    ${AdminTitle('그래픽카드', '그래픽카드마다 지금 배정된 몫과, 호스트 NVML로 측정한 사용량을 보여 줍니다.')}
    ${gpus.map((g) => `
      <section class="card" style="padding:16px 22px;gap:10px">
        <div class="row between">
          <div class="col" style="gap:2px">
            <span class="t-strong">${g.name}</span>
            <span class="t-caption c-sub">${g.spec}</span>
          </div>
          <span class="t-sub c-sub">${g.assigned}</span>
        </div>
        <div class="row" style="align-items:flex-start">
          ${g.shares.map(share).join('')}
          ${g.free ? `<div class="row" style="width:${g.free.w}px;height:110px;flex:none;justify-content:center;background:var(--surface-strong);border-radius:7px">
            <span class="t-caption c-sub">${g.free.label}</span></div>` : ''}
        </div>
      </section>`).join('')}
    <p class="t-caption c-sub">막대 너비는 여유량에 대한 배정 크기(명목 + 64MB)의 비율이며, 테두리 색은 사용량 경고 상태를 뜻합니다.</p>
  `);
}
