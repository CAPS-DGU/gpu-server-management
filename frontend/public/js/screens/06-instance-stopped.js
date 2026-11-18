// 06 인스턴스 상세 (종료됨)
import { UserLayout, Button, TierBadge, StatusBadge, Select } from '../components.js';

export const title = '06 인스턴스 상세 (종료됨)';

const kv = ([k, v]) => `<div class="kv"><span class="t-sub c-sub">${k}</span><span class="t-strong">${v}</span></div>`;
const card = (inner) => `<section class="card" style="padding:20px 22px;gap:14px">${inner}</section>`;

export function render() {
  return UserLayout({ active: 'instances', rate: '0/시간' }, `
    <div class="col" style="gap:6px">
      <a class="t-caption c-sub" href="#/instances">내 인스턴스 › 자원-테스트</a>
      <div class="row" style="gap:12px;height:50px">
        <h1 class="t-title-m">자원-테스트</h1>
        ${TierBadge(1)}
        ${StatusBadge('stopped')}
      </div>
    </div>
    <div class="row" style="gap:18px;align-items:flex-start">
      <div class="col" style="width:750px;gap:18px">
        ${card(`
          <h2 class="t-title-s">되살리기</h2>
          <p class="t-body c-sub">이 인스턴스는 종료되어 GPU 몫이 반환되었습니다. 홈 디렉터리의 파일은 다음 세션을 위해 보관되어 있습니다.</p>
          <div class="row">${Button('같은 티어(1티어)로 되살리기', 'primary', { href: '#/instances/running' })}</div>
          <div class="divider"></div>
          <div class="row" style="gap:12px;height:50px">
            <span class="t-strong">다른 티어로 되살리기</span>
            <span class="fill"></span>
            ${Select('4티어')}
            ${Button('되살리기', 'secondary', { href: '#/instances/running' })}
          </div>`)}
        ${card(`
          <h2 class="t-title-s">지난 실행 정보</h2>
          ${[['종료 시각', '어제 18:42'], ['총 실행 시간', '03:21:07'], ['사용한 크레딧', '168'], ['종료 사유', '사용자 종료']].map(kv).join('')}`)}
      </div>
      <div class="col fill">
        ${card(`
          <h2 class="t-title-s">인스턴스 정보</h2>
          ${[['티어', '1티어'], ['가용 메모리', '15,552MB'], ['디스크', '100GB'], ['홈 디렉터리', '보관됨']].map(kv).join('')}`)}
      </div>
    </div>
  `, 'padding:24px 32px;gap:18px');
}
