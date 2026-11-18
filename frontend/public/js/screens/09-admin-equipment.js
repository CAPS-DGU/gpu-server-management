// 09 관리자 · 장비
import { AdminLayout, AdminTitle, Button, Chip, TierBadge, ValueBox } from '../components.js';

export const title = '09 관리자 · 장비';

// 보고를 멈춘 장비가 맨 위
const rows = [
  { state: ['보고 중단', 'red'], name: 'lab5-gpu02', lab: '시스템랩', gpu: 'RTX 3080 10GB', last: '2일 전', cap: ['—', '—', '—', '—'], alert: true },
  { state: ['정상', 'green'], name: 'lab3-gpu01', lab: '비전랩', gpu: 'RTX 4080 SUPER 16GB', last: '3일 전', cap: ['0/1', '1/2', '1/4', '8/8'] },
  { state: ['정상', 'green'], name: 'lab1-gpu01', lab: '언어랩', gpu: 'RTX 4090 24GB', last: '1주 전', cap: ['1/1', '0/2', '0/4', '0/8'] },
  { state: ['비우는 중', 'orange'], name: 'lab2-gpu01', lab: 'HCI랩', gpu: 'RTX 3090 24GB', last: '5일 전', cap: ['0/1', '0/2', '1/4', '2/8'], draining: true },
];

const cell = (w, inner, cls = '') => `<span class="cell ${cls}" style="width:${w}px">${inner}</span>`;

export function render() {
  return AdminLayout('equipment', `
    ${AdminTitle('장비', '등록된 장비 4대 · 정상 2 · 비우는 중 1 · 보고 중단 1', Button('새 장비 등록'))}
    <div class="list">
      <div class="list__head" style="padding:9px 16px;gap:12px;height:53px">
        ${cell(70, '상태', 't-sub c-sub')}${cell(100, '장비', 't-sub c-sub')}${cell(90, '소유 연구실', 't-sub c-sub')}
        ${cell(160, '그래픽카드', 't-sub c-sub')}${cell(80, '마지막 측정', 't-sub c-sub')}
        ${[1, 2, 4, 8].map((t) => cell(55, TierBadge(t))).join('')}
        <span class="t-sub c-sub">동작</span>
      </div>
      ${rows.map((r) => `
        <div class="list__row" style="padding:11px 16px;gap:12px;height:67.5px${r.alert ? ';background:var(--danger-bg)' : ''}">
          ${cell(70, Chip(...r.state))}
          ${cell(100, r.name, 't-strong')}
          ${cell(90, r.lab, 't-body')}
          ${cell(160, r.gpu, 't-sub c-sub nowrap')}
          ${cell(80, r.last, 't-sub c-sub')}
          ${r.cap.map((c) => cell(55, ValueBox(c))).join('')}
          <span class="row" style="gap:8px">
            ${Button('재측정', 'secondary')}
            ${Button('비우기', r.draining ? 'disabled' : 'secondary')}
          </span>
        </div>`).join('')}
    </div>
    <p class="t-caption c-sub">용량 칸의 숫자는 현재 담고 있는 수 / 담을 수 있는 수입니다. 보고를 멈춘 장비는 맨 위에 표시됩니다.</p>
  `);
}
