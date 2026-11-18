// 02 내 인스턴스
import { UserLayout, Button, InstanceRow } from '../components.js';

export const title = '02 내 인스턴스';

const summary = [
  { label: '크레딧 잔액', value: '1,250', note: '현재 속도로 약 37시간' },
  { label: '지금 감소 속도', value: '−33 / 시간', note: '8티어 8 + 2티어 25' },
  { label: '인스턴스', value: '실행 중 2 · 준비 중 1', note: '종료됨 1' },
];

const rows = [
  { tier: 8, name: '실습-cnn', status: 'running', time: '00:42:10', memory: '1.5GB / 1.6GB', address: '2020112028@compute.dongguk.edu' },
  { tier: 2, name: 'llm-미세조정', status: 'running', time: '26:08:55', memory: '4.1GB / 7.4GB', address: '2020112028-llm@compute.dongguk.edu' },
  { tier: 4, name: 'gan-실험', status: 'ready', time: '00:00:12', memory: '0.0GB / 3.5GB', address: '준비 중…' },
  { tier: 1, name: '자원-테스트', status: 'stopped', time: '—', memory: '—', address: '—' },
];

const head = [['티어', 52.5], ['이름', 150], ['상태', 90], ['실행 시간', 90], ['메모리 사용량', 300], ['접속 주소', 320]];

export function render() {
  return UserLayout({ active: 'instances' }, `
    <div class="row between" style="height:42.5px">
      <h1 class="t-title-m">내 인스턴스</h1>
      ${Button('인스턴스 생성', 'primary', { href: '#/create' })}
    </div>
    <div class="row" style="gap:16px;align-items:stretch">
      ${summary.map((s) => `
        <div class="col fill" style="gap:3px;padding:14px 18px;background:var(--surface);border:1px solid var(--border-soft);border-radius:10px">
          <span class="t-sub c-sub">${s.label}</span>
          <span class="t-title-m">${s.value}</span>
          <span class="t-caption c-sub">${s.note}</span>
        </div>`).join('')}
    </div>
    <div class="list" style="width:max-content">
      <div class="list__head" style="padding:9px 16px;gap:16px">
        ${head.map(([h, w]) => `<span class="cell t-sub c-sub" style="width:${w}px">${h}</span>`).join('')}
        <span class="t-sub c-sub">동작</span>
      </div>
      ${rows.map(InstanceRow).join('')}
    </div>
  `);
}
