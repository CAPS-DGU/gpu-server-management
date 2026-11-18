// 05 인스턴스 상세 (실행 중)
import { UserLayout, Button, TierBadge, StatusBadge, Switch, UsageBar, Chip } from '../components.js';

export const title = '05 인스턴스 상세 (실행 중)';

const info = [
  ['티어', '8티어'], ['가용 메모리', '1,664MB'], ['연산 비율', '12.5%'], ['디스크', '100GB'],
  ['시간당 크레딧', '8'], ['실행 시간', '00:42:10'], ['이미지', '실행용'],
];

const card = (inner, style = 'padding:20px 22px;gap:14px') => `<section class="card" style="${style}">${inner}</section>`;
const tool = (name, url, on) => `
  <div class="row between">
    <div class="col" style="gap:3px">
      <span class="t-strong">${name}</span>
      <span class="t-code c-sub">${url}</span>
    </div>
    ${Switch(on)}
  </div>`;

export function render() {
  return UserLayout({ active: 'instances' }, `
    <div class="col" style="gap:6px">
      <a class="t-caption c-sub" href="#/instances">내 인스턴스 › 실습-cnn</a>
      <div class="row" style="gap:12px;height:50px">
        <h1 class="t-title-m">실습-cnn</h1>
        ${TierBadge(8)}
        ${StatusBadge('running')}
        <span class="fill"></span>
        ${Button('종료', 'danger', { href: '#/instances/stopped' })}
      </div>
    </div>
    <div class="row" style="gap:18px;align-items:flex-start">
      <div class="col" style="width:750px;gap:18px">
        ${card(`
          <h2 class="t-title-s">접속 명령</h2>
          <div class="row between" style="padding:10px 16px;background:var(--surface-strong);border-radius:7px">
            <span class="t-code" id="ssh-cmd">ssh 2020112028@compute.dongguk.edu</span>
            ${Button('복사', 'secondary', { action: 'copy' })}
          </div>
          <p class="t-caption c-sub">개인 컴퓨터에 이미 있는 SSH 클라이언트로 접속합니다. 설치할 프로그램은 없습니다.</p>`)}
        ${card(`
          <h2 class="t-title-s">웹 도구</h2>
          ${tool('Jupyter 노트북', 'https://2020112028.compute.dongguk.edu/', true)}
          <div class="divider"></div>
          ${tool('학습 대시보드', 'https://2020112028.compute.dongguk.edu/tb/', false)}`)}
      </div>
      <div class="col fill" style="gap:12px">
        ${card(`
          <h2 class="t-title-s">인스턴스 정보</h2>
          ${info.map(([k, v]) => `<div class="kv"><span class="t-sub c-sub">${k}</span><span class="t-strong">${v}</span></div>`).join('')}`,
          'padding:16px 22px;gap:10px')}
        ${card(`
          <h2 class="t-title-s">메모리 사용량</h2>
          <div class="col" style="gap:8px">
            ${UsageBar('warn', 276)}
            <div class="row" style="gap:10px">
              <span class="t-strong">1.5GB / 1.6GB · 92%</span>
              ${Chip('경고 문턱 초과', 'orange')}
            </div>
          </div>
          <p class="t-caption c-sub nowrap">막대의 두 선은 경고 문턱입니다. 몫의 90%에서 경고, 97%에서 위급으로 알립니다.</p>
          <div class="divider"></div>
          <div class="row between">
            <div class="col" style="gap:3px">
              <span class="t-strong">휴대전화 알림</span>
              <span class="t-sub c-sub">문턱을 넘으면 휴대전화로도 알립니다.</span>
            </div>
            ${Switch(true)}
          </div>`,
          'padding:16px 22px;gap:10px')}
      </div>
    </div>
  `, 'padding:24px 32px;gap:18px');
}

export function onAction(action) {
  if (action === 'copy') {
    const text = document.getElementById('ssh-cmd')?.textContent || '';
    navigator.clipboard?.writeText(text);
  }
}
