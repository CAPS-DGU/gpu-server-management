// Figma '컴포넌트' 페이지의 컴포넌트를 코드 부품으로 옮긴 파일
// 각 함수는 HTML 문자열을 돌려줍니다.

/** 글자 안의 특수 문자를 안전하게 바꿈 */
export const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const CHEVRON = '<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 6l4 4 4-4" stroke="#1A1A1A" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const BELL = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M18 8.5a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9Z" stroke="#1A1A1A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M13.7 21a2 2 0 0 1-3.4 0" stroke="#1A1A1A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

/** 버튼 — kind: primary(기본) | secondary(보조) | danger(위험) | disabled(비활성) */
export function Button(label, kind = 'primary', { action, href, block = false, style = '' } = {}) {
  const cls = `btn btn--${kind}${block ? ' btn--block' : ''}`;
  const data = action ? ` data-action="${action}"` : '';
  const st = style ? ` style="${style}"` : '';
  if (href) return `<a class="${cls}" href="${href}"${data}${st}>${esc(label)}</a>`;
  return `<button type="button" class="${cls}"${data}${st}${kind === 'disabled' ? ' disabled' : ''}>${esc(label)}</button>`;
}

/** 티어 배지 — tier: 1 | 2 | 4 | 8 */
export const TierBadge = (tier) => `<span class="tier tier--${tier}"><span>${tier}티어</span></span>`;

/** 인스턴스 상태 배지 */
const STATUS = { ready: '준비중', running: '진행중', stopping: '종료중', stopped: '종료됨' };
export const StatusBadge = (status) => `<span class="status status--${status}"><span>${STATUS[status]}</span></span>`;

/** 작은 배지 — color: green | orange | red | gray */
export const Chip = (label, color) => `<span class="chip chip--${color}">${esc(label)}</span>`;

/** 선택 상자 */
export const Select = (label) => `<button type="button" class="select"><span>${esc(label)}</span>${CHEVRON}</button>`;

/** 입력란 (이름표 + 입력 상자) */
export const Field = (label, placeholder, { type = 'text', name = '' } = {}) => `
  <label class="field">
    <span class="field__label">${esc(label)}</span>
    <span class="field__box"><input type="${type}" name="${name}" placeholder="${esc(placeholder)}"></span>
  </label>`;

/** 표 입력 — 표 안에서 바로 고치는 값 */
export const CellInput = (value, width = 100) =>
  `<span class="cell-input" style="width:${width}px"><input value="${esc(value)}"></span>`;

/** 값 상자 */
export const ValueBox = (value) => `<span class="value-box">${esc(value)}</span>`;

/** 스위치 */
export const Switch = (on) => `<button type="button" class="switch" role="switch" aria-checked="${on}" data-action="toggle"></button>`;

/** 사용량 막대 — state: ok | warn | danger, fill: 채운 너비(px, 0~300) */
export const UsageBar = (state, fill) => `
  <span class="usage">
    <span class="usage__track"></span>
    <span class="usage__fill usage__fill--${state}" style="width:${fill}px"></span>
    <span class="usage__mark" style="left:269px"></span>
    <span class="usage__mark" style="left:290px"></span>
  </span>`;

/** 상단바 (사용자 화면) — active: 'instances' | 'alerts' */
export function TopBar({ active = 'instances', rate = '−33/시간' } = {}) {
  const nav = (key, label, href) => `<a class="topbar__nav${active === key ? ' is-active' : ''}" href="${href}">${label}</a>`;
  return `
  <header class="topbar">
    <a class="topbar__logo" href="#/instances">GPU 공동 사용</a>
    ${nav('instances', '내 인스턴스', '#/instances')}
    ${nav('alerts', '알림', '#/alerts')}
    <span class="fill"></span>
    <span class="credit-pill">
      <span class="t-sub c-sub">크레딧</span>
      <span class="t-strong">1,250</span>
      <span class="t-caption c-sub">${esc(rate)}</span>
    </span>
    <a class="bell" href="#/alerts" aria-label="알림">${BELL}<span class="bell__dot"></span></a>
    <span class="user-box">2020112028</span>
  </header>`;
}

/** 사이드바 (관리자 화면) */
const ADMIN_MENU = [
  ['equipment', '장비', '#/admin/equipment'],
  ['gpus', '그래픽카드', '#/admin/gpus'],
  ['instances', '인스턴스', '#/admin/instances'],
  ['tiers', '티어', '#/admin/tiers'],
  ['credits', '크레딧', '#/admin/credits'],
  ['images', '이미지', null],   // 아직 화면 설계가 없는 메뉴
  ['events', '이벤트', null],
];
export function Sidebar(active) {
  return `
  <nav class="sidebar">
    <div class="sidebar__logo">
      <span class="t-title-m">관리자</span>
      <span class="t-caption c-sub">GPU 공동 사용 플랫폼</span>
    </div>
    <div class="sidebar__gap"></div>
    ${ADMIN_MENU.map(([key, label, href]) => href
      ? `<a class="nav-item${key === active ? ' is-active' : ''}" href="${href}">${label}</a>`
      : `<span class="nav-item" title="화면 설계 준비 중">${label}</span>`).join('')}
  </nav>`;
}

/** 관리자 화면 틀: 사이드바 + 본문 */
export const AdminLayout = (active, body) => `
  <div class="screen screen--admin">
    ${Sidebar(active)}
    <main class="page col" style="padding:24px 32px;gap:16px">${body}</main>
  </div>`;

/** 사용자 화면 틀: 상단바 + 본문 */
export const UserLayout = (topbar, body, bodyStyle = 'padding:28px 32px;gap:20px') => `
  <div class="screen screen--user">
    ${TopBar(topbar)}
    <main class="page col" style="${bodyStyle}">${body}</main>
  </div>`;

/** 관리자 화면 제목 (제목 + 설명) */
export const AdminTitle = (title, desc, right = '') => `
  <div class="row between" style="width:100%">
    <div class="col" style="gap:3px">
      <h1 class="t-title-m">${esc(title)}</h1>
      ${desc ? `<p class="t-sub c-sub">${esc(desc)}</p>` : ''}
    </div>
    ${right}
  </div>`;

/** 티어 선택 카드 — state: default | selected | soldout */
export function TierCard({ tier, seats, memory, disk, ratio, credit }, state = 'default') {
  const cls = state === 'selected' ? ' is-selected' : state === 'soldout' ? ' is-soldout' : '';
  const kv = (k, v) => `<div class="kv"><span class="t-sub c-sub">${k}</span><span class="t-strong">${v}</span></div>`;
  return `
  <button type="button" class="tier-card${cls}" data-action="pick-tier" data-tier="${tier}"${state === 'soldout' ? ' disabled' : ''}>
    <div class="kv" style="height:35px;width:100%">${TierBadge(tier)}<span class="t-sub c-sub">남은 좌석 ${seats}</span></div>
    <div class="col" style="gap:2px">
      <span class="t-title-m">${memory}</span>
      <span class="t-sub c-sub">사용 가능한 GPU 메모리</span>
    </div>
    <div class="divider"></div>
    ${kv('디스크', disk)}
    ${kv('연산 비율', ratio)}
    ${kv('크레딧', `${credit} / 시간`)}
  </button>`;
}

/** 알림 항목 — level: warn(주의) | danger(위급) | info(일반) */
export const AlertItem = ({ level, title, desc, time }) => `
  <div class="alert alert--${level}">
    <span class="dot dot--${level}"></span>
    <div class="col fill" style="gap:3px">
      <span class="t-strong">${esc(title)}</span>
      <span class="t-sub c-sub">${esc(desc)}</span>
    </div>
    <span class="t-caption c-sub nowrap">${esc(time)}</span>
  </div>`;

/** 사용자 인스턴스 행 — 실행중 / 종료됨 두 가지 */
export function InstanceRow(r) {
  const ended = r.status === 'stopped';
  return `
  <div class="list__row" style="padding:12px 16px;gap:16px;height:69.5px">
    ${TierBadge(r.tier)}
    <a class="cell t-strong" style="width:150px" href="${ended ? '#/instances/stopped' : '#/instances/running'}">${esc(r.name)}</a>
    ${StatusBadge(r.status)}
    <span class="cell t-body c-sub" style="width:90px">${esc(r.time)}</span>
    ${ended
      ? `<span class="cell t-body c-sub" style="width:300px">—</span>`
      : `<span class="cell col" style="width:300px;gap:4px;align-items:flex-start">${UsageBar('ok', 165)}<span class="t-caption c-sub">${esc(r.memory)}</span></span>`}
    <span class="cell ${ended ? 't-body c-sub' : 't-code'}" style="width:320px">${esc(r.address)}</span>
    ${Button(ended ? '되살리기' : '종료', 'secondary', { href: ended ? '#/instances/stopped' : undefined })}
  </div>`;
}
