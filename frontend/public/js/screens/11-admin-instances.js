// 11 관리자 · 인스턴스  (+ 11-2 관리자 종료 모달)
import { AdminLayout, AdminTitle, Button, Select, TierBadge, StatusBadge, Field, esc } from '../components.js';

export const title = '11 관리자 · 인스턴스';

const rows = [
  { user: '2020113314', name: 'llm-미세조정', tier: 2, device: 'lab3-gpu01', status: 'running', time: '26:08:55', mem: '4.1 / 7.4GB' },
  { user: '2020112028', name: '실습-cnn', tier: 8, device: 'lab3-gpu01', status: 'running', time: '00:42:10', mem: '1.5 / 1.6GB' },
  { user: '2020110512', name: 'ft-bert', tier: 4, device: 'lab3-gpu01', status: 'running', time: '08:15:02', mem: '3.4 / 3.6GB' },
  { user: '2020119001', name: 'seg-unet', tier: 4, device: 'lab1-gpu01', status: 'ready', time: '00:00:09', mem: '—' },
  { user: '2020118120', name: 'rl-sim', tier: 1, device: 'lab2-gpu01', status: 'stopping', time: '11:30:44', mem: '14.9 / 15.5GB' },
  { user: '2020115544', name: 'test', tier: 8, device: 'lab3-gpu01', status: 'stopped', time: '00:12:31', mem: '—' },
];

const cell = (w, inner, cls = '') => `<span class="cell ${cls}" style="width:${w}px">${inner}</span>`;
const filter = (label) => `<span class="row" style="gap:8px"><span class="t-sub c-sub">${label}</span>${Select('전체')}</span>`;

let modal = null; // 종료할 행

export function render({ modalOpen = false } = {}) {
  const target = modal ?? (modalOpen ? rows[0] : null);
  return AdminLayout('instances', `
    ${AdminTitle('인스턴스', '모든 장비의 모든 인스턴스입니다. 관리자 종료는 사유가 기록됩니다.')}
    <div class="row" style="gap:16px">${['사용자', '티어', '장비', '상태'].map(filter).join('')}</div>
    <div class="list">
      <div class="list__head" style="padding:9px 16px;gap:12px">
        ${cell(100, '사용자', 't-sub c-sub')}${cell(120, '이름', 't-sub c-sub')}${cell(55, '티어', 't-sub c-sub')}
        ${cell(100, '장비', 't-sub c-sub')}${cell(90, '상태', 't-sub c-sub')}${cell(75, '실행 시간', 't-sub c-sub')}
        ${cell(100, '메모리 사용', 't-sub c-sub')}<span class="t-sub c-sub">동작</span>
      </div>
      ${rows.map((r, i) => `
        <div class="list__row" style="padding:8px 16px;gap:12px;height:59.5px">
          ${cell(100, r.user, 't-body')}${cell(120, esc(r.name), 't-strong')}${cell(55, TierBadge(r.tier))}
          ${cell(100, r.device, 't-sub c-sub')}${cell(90, StatusBadge(r.status))}${cell(75, r.time, 't-sub c-sub')}
          ${cell(100, r.mem, 't-sub c-sub nowrap')}
          ${r.status === 'stopped'
            ? Button('관리자 종료', 'disabled')
            : `<button type="button" class="btn btn--danger" data-action="open-terminate" data-row="${i}">관리자 종료</button>`}
        </div>`).join('')}
    </div>
    ${target ? TerminateModal(target) : ''}
  `);
}

/** 11-2 관리자 종료 모달 */
function TerminateModal(r) {
  return `
  <div class="modal-backdrop">
    <div class="modal" role="dialog" aria-modal="true">
      <h2 class="t-title-m">인스턴스 종료</h2>
      <p class="t-body c-sub">${r.user} · ${esc(r.name)} 을(를) 종료합니다. 종료 사유는 이벤트 기록에 남습니다.</p>
      ${Field('종료 사유', '사유를 입력하세요')}
      <div class="row" style="gap:10px;justify-content:flex-end">
        <button type="button" class="btn btn--secondary" data-action="close-terminate">취소</button>
        <button type="button" class="btn btn--danger" data-action="close-terminate">종료</button>
      </div>
    </div>
  </div>`;
}

export function onAction(action, el, rerender) {
  if (action === 'open-terminate') { modal = rows[Number(el.dataset.row)]; rerender(); }
  if (action === 'close-terminate') {
    modal = null;
    if (location.hash.endsWith('/terminate')) location.hash = '#/admin/instances'; else rerender();
  }
}
