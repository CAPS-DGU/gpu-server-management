// 04-2 인스턴스 생성 (수업 모드) — 실습 티어만 보입니다
import { UserLayout, Button, TierCard } from '../components.js';
import { TIERS } from './04-create.js';

export const title = '04-2 인스턴스 생성 (수업 모드)';

export function render() {
  const t = TIERS.find((x) => x.tier === 8);
  return UserLayout({ active: 'instances' }, `
    <div class="col" style="gap:4px">
      <h1 class="t-title-m">인스턴스 생성</h1>
      <p class="t-body c-sub">딥러닝 실습 수업용 티어가 미리 선택되어 있습니다. 한 번만 누르면 됩니다.</p>
    </div>
    <div class="row">${TierCard(t, 'selected')}</div>
    <div class="row" style="gap:10px;padding:14px 20px;background:var(--warn-bg);border-radius:10px">
      <span class="dot dot--warn"></span>
      <p class="t-body">같은 GPU에 다른 학생 7명이 함께 올라갑니다. 각자 GPU 전체 속도의 약 1/8로 동작하며 서로를 볼 수도, 서로에게 영향을 줄 수도 없습니다.</p>
    </div>
    <div class="fill"></div>
    <div class="row between" style="padding:14px 20px;background:var(--surface);border:1px solid var(--border-soft);border-radius:10px">
      <div class="col" style="gap:2px">
        <span class="t-strong">선택: 8티어 · 1,664MB · 시간당 8 크레딧</span>
        <span class="t-caption c-sub">수업 모드에서는 실습 티어 외의 티어가 숨겨집니다.</span>
      </div>
      ${Button('생성', 'primary', { href: '#/instances/running' })}
    </div>
  `);
}
