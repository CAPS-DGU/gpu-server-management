// 12 관리자 · 티어
// 그래픽카드 세대별 티어 사다리. 명목 크기를 바꾸면 가용 크기(명목 + 측정 상수)를 다시 계산합니다.
import { AdminLayout, AdminTitle, Button, Select, TierBadge, CellInput } from '../components.js';

export const title = '12 관리자 · 티어';

const MEASURE_CONST = 256; // 측정 상수 (MB)

const tiers = [
  { tier: 1, nominal: 15552, ratio: '100%', disk: '100GB', count: 1, mode: '고정 비율' },
  { tier: 2, nominal: 7616, ratio: '50%', disk: '100GB', count: 2, mode: '고정 비율' },
  { tier: 4, nominal: 3648, ratio: '25%', disk: '100GB', count: 4, mode: '고정 비율' },
  { tier: 8, nominal: 1664, ratio: '12.5%', disk: '100GB', count: 8, mode: '우선순위 전용' },
];

const mb = (n) => `${n.toLocaleString('en-US')}MB`;
const cols = [['티어', 80], ['명목 크기', 130], ['가용 크기', 115], ['연산 비율', 110], ['디스크 할당량', 120], ['그래픽카드당 인스턴스 수', 165], ['배정 방식', 160]];
const cell = (w, inner, cls = '') => `<span class="cell ${cls}" style="width:${w}px">${inner}</span>`;

export function render() {
  return AdminLayout('tiers', `
    ${AdminTitle('티어', '그래픽카드 세대별 티어 사다리입니다. 운영 중에도 고칠 수 있으며, 명목 크기를 바꾸면 측정 상수로 그래픽카드당 인스턴스 수를 다시 계산합니다.')}
    <div class="row" style="gap:8px">
      <span class="t-sub c-sub">그래픽카드 세대</span>
      ${Select('RTX 4080 SUPER 16GB')}
      <span class="t-sub c-sub">측정 상수 ${MEASURE_CONST}MB · 이 세대 그래픽카드 3장</span>
    </div>
    <div class="list">
      <div class="list__head" style="padding:9px 16px;gap:12px;border-bottom:1px solid var(--border-soft)">
        ${cols.map(([h, w]) => cell(w, h, 't-sub c-sub')).join('')}
      </div>
      ${tiers.map((t, i) => `
        <div class="list__row" style="padding:8px 16px;gap:12px;height:55.5px">
          ${cell(80, TierBadge(t.tier))}
          ${cell(130, CellInput(mb(t.nominal), 110).replace('<input', `<input data-action="nominal" data-row="${i}"`))}
          ${cell(115, `<span data-avail="${i}">${mb(t.nominal + MEASURE_CONST)}</span>`, 't-body c-sub')}
          ${cell(110, CellInput(t.ratio, 90))}
          ${cell(120, CellInput(t.disk, 90))}
          ${cell(165, `${t.count}개`, 't-body')}
          ${cell(160, Select(t.mode))}
        </div>`).join('')}
    </div>
    <div class="row" style="gap:8px">
      <div class="col fill" style="gap:4px">
        <p class="t-sub c-sub">가용 크기 = 명목 크기 + 측정 상수(${MEASURE_CONST}MB). 명목 크기를 바꾸면 가용 크기와 그래픽카드당 인스턴스 수를 다시 계산합니다.</p>
        <p class="t-sub c-sub">고정 비율: 연산 비율만큼 항상 나눠 씁니다 · 우선순위 전용: 남는 연산만 낮은 우선순위로 씁니다.</p>
      </div>
      ${Button('되돌리기', 'secondary', { action: 'reset' })}
      ${Button('변경 저장')}
    </div>
  `);
}

/** 명목 크기를 고치면 가용 크기를 바로 다시 계산 */
export function onInput(el) {
  if (el.dataset.action !== 'nominal') return;
  const n = Number(el.value.replace(/[^0-9]/g, ''));
  const out = document.querySelector(`[data-avail="${el.dataset.row}"]`);
  if (out && n) out.textContent = mb(n + MEASURE_CONST);
}

export function onAction(action, el, rerender) {
  if (action === 'reset') rerender();
}
