// 13 관리자 · 크레딧
// 티어별 시간당 요율, 연구실·사용자별 잔액, 조정 이력. 잔액 부여와 요율 변경은 언제든 여기서 합니다.
import { AdminLayout, AdminTitle, Button, Select, TierBadge, CellInput, Chip } from '../components.js';

export const title = '13 관리자 · 크레딧';

const rates = [[1, '50'], [2, '25'], [4, '12'], [8, '8']];
const balances = [
  { name: '비전연구실', kind: '연구실', lab: '—', amount: '120,000' },
  { name: '자연어처리연구실', kind: '연구실', lab: '—', amount: '85,400' },
  { name: '2020113314', kind: '사용자', lab: '자연어처리연구실', amount: '1,250' },
  { name: '2020110512', kind: '사용자', lab: '비전연구실', amount: '0', empty: true },
];
const history = [
  { at: '2026-11-16 14:20', target: '2020113314', kind: ['잔액 부여', 'green'], change: '250 → 1,250 (+1,000)', by: '관리자', reason: '과제 마감 전 추가 배정' },
  { at: '2026-11-15 09:05', target: '1티어', kind: ['요율 변경', 'orange'], change: '60 → 50 크레딧/시간', by: '관리자', reason: '학기 중 요율 조정' },
  { at: '2026-11-12 18:40', target: '비전연구실', kind: ['잔액 부여', 'green'], change: '70,000 → 120,000 (+50,000)', by: '관리자', reason: '11월 연구실 배분' },
];

const cell = (w, inner, cls = '') => w === 'fill'
  ? `<span class="cell fill ${cls}" style="gap:6px">${inner}</span>`
  : `<span class="cell ${cls}" style="width:${w}px;gap:6px">${inner}</span>`;
const head = (cols) => `<div class="list__head" style="padding:7px 12px;gap:12px;border-radius:6px">${cols.map(([h, w]) => cell(w, h, 't-sub c-sub')).join('')}</div>`;
const filter = (label) => `<span class="row" style="gap:8px"><span class="t-sub c-sub">${label}</span>${Select('전체')}</span>`;
const cardHead = (title, desc, right) => `
  <div class="row" style="gap:8px">
    <div class="col fill" style="gap:2px">
      <h2 class="t-title-s">${title}</h2>
      <p class="t-sub c-sub nowrap">${desc}</p>
    </div>
    ${right}
  </div>`;
const card = (inner, style = '') => `<section class="card" style="padding:16px 22px;gap:10px;${style}">${inner}</section>`;

export function render() {
  const soon = `
    <div class="col" style="gap:4px;align-items:flex-end">
      ${Button('장비 조사로 최초 배분 계산', 'disabled')}
      <span class="t-sub c-sub">장비 조사가 끝난 뒤 추가됩니다</span>
    </div>`;

  return AdminLayout('credits', `
    ${AdminTitle('크레딧', '티어별 시간당 요율과 연구실·사용자별 잔액, 조정 이력입니다. 잔액 부여와 요율 변경은 언제든 여기서 합니다.', soon)}
    <div class="row" style="gap:16px;align-items:stretch">
      ${card(`
        ${cardHead('티어별 시간당 요율', '실행 1시간마다 차감되는 크레딧', Button('요율 저장'))}
        <div class="col">
          ${head([['티어', 75], ['요율 (크레딧/시간)', 'fill']])}
          ${rates.map(([t, v]) => `
            <div class="list__row" style="padding:4px 12px;gap:12px">
              ${cell(75, TierBadge(t))}
              ${cell('fill', `${CellInput(v, 100)}<span class="t-sub c-sub">크레딧/시간</span>`)}
            </div>`).join('')}
        </div>`, 'width:390px;flex:none')}
      ${card(`
        ${cardHead('잔액', '연구실과 사용자별 남은 크레딧', `${filter('구분')}${Button('잔액 부여')}`)}
        <div class="col">
          ${head([['이름', 120], ['구분', 65], ['소속 연구실', 125], ['잔액 (크레딧)', 'fill'], ['동작', 75]])}
          ${balances.map((b) => `
            <div class="list__row" style="padding:3px 12px;gap:12px">
              ${cell(120, b.name, 't-body nowrap')}
              ${cell(65, b.kind, 't-sub c-sub')}
              ${cell(125, b.lab, 't-sub c-sub nowrap')}
              ${cell('fill', `<span class="t-strong">${b.amount}</span>${b.empty ? Chip('잔액 없음', 'red') : ''}`)}
              ${cell(75, Button('조정', 'secondary'))}
            </div>`).join('')}
        </div>`, 'flex:1;min-width:0')}
    </div>
    ${card(`
      ${cardHead('조정 이력', '잔액 부여와 요율 변경 기록 · 최신 순', filter('종류'))}
      <div class="col">
        ${head([['일시', 150], ['대상', 150], ['종류', 100], ['변경', 210], ['처리자', 90], ['사유', 'fill']])}
        ${history.map((h) => `
          <div class="list__row" style="padding:7px 12px;gap:12px">
            ${cell(150, h.at, 't-sub c-sub')}
            ${cell(150, h.target, 't-body')}
            ${cell(100, Chip(...h.kind))}
            ${cell(210, h.change, 't-body nowrap')}
            ${cell(90, h.by, 't-sub c-sub')}
            ${cell('fill', h.reason, 't-body')}
          </div>`).join('')}
      </div>`)}
  `);
}
