// 04 인스턴스 생성 — 티어 카드를 누르면 선택이 바뀝니다
import { UserLayout, Button, TierCard } from '../components.js';

export const title = '04 인스턴스 생성';

export const TIERS = [
  { tier: 1, seats: 0, memory: '15,552MB', disk: '100GB', ratio: '100%', credit: 50, max: 1 },
  { tier: 2, seats: 2, memory: '7,616MB', disk: '100GB', ratio: '50%', credit: 25, max: 2 },
  { tier: 4, seats: 5, memory: '3,648MB', disk: '100GB', ratio: '25%', credit: 12, max: 4 },
  { tier: 8, seats: 11, memory: '1,664MB', disk: '100GB', ratio: '12.5%', credit: 8, max: 8 },
];

let selected = 4;

export function render() {
  const t = TIERS.find((x) => x.tier === selected);
  return UserLayout({ active: 'instances' }, `
    <div class="col" style="gap:4px">
      <h1 class="t-title-m">인스턴스 생성</h1>
      <p class="t-body c-sub">티어를 고르세요. 같은 GPU를 나눠 쓰므로 크기만큼의 메모리가 보장됩니다.</p>
    </div>
    <div class="row" style="gap:20px;align-items:flex-start">
      ${TIERS.map((x) => TierCard(x, x.seats === 0 ? 'soldout' : x.tier === selected ? 'selected' : 'default')).join('')}
    </div>
    <div class="row" style="gap:10px;padding:14px 20px;background:var(--warn-bg);border-radius:10px">
      <span class="dot dot--warn"></span>
      <p class="t-body">같은 GPU의 이웃과 연산을 나눠 씁니다. ${t.tier}티어는 GPU 한 장에 최대 ${t.max}명이 올라가며, 실행 시간이 이웃 수만큼 늘어날 수 있습니다.</p>
    </div>
    <div class="fill"></div>
    <div class="row between" style="padding:14px 20px;background:var(--surface);border:1px solid var(--border-soft);border-radius:10px">
      <div class="col" style="gap:2px">
        <span class="t-strong">선택: ${t.tier}티어 · ${t.memory} · 시간당 ${t.credit} 크레딧</span>
        <span class="t-caption c-sub">생성을 누르면 약 15초 뒤에 접속 주소가 표시됩니다.</span>
      </div>
      <div class="row" style="gap:10px">
        ${Button('취소', 'secondary', { href: '#/instances' })}
        ${Button('생성', 'primary', { href: '#/instances/running' })}
      </div>
    </div>
  `);
}

export function onAction(action, el, rerender) {
  if (action === 'pick-tier') {
    selected = Number(el.dataset.tier);
    rerender();
  }
}
