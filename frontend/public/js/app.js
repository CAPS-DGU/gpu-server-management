// 주소(#/...)에 맞는 화면을 그려 주는 간단한 화면 전환기
import * as login from './screens/01-login.js';
import * as instances from './screens/02-instances.js';
import * as instancesEmpty from './screens/03-instances-empty.js';
import * as create from './screens/04-create.js';
import * as createClass from './screens/04-2-create-class.js';
import * as running from './screens/05-instance-running.js';
import * as stopped from './screens/06-instance-stopped.js';
import * as alerts from './screens/07-alerts.js';
import * as alertsMobile from './screens/08-alerts-mobile.js';
import * as adminEquipment from './screens/09-admin-equipment.js';
import * as adminGpus from './screens/10-admin-gpus.js';
import * as adminInstances from './screens/11-admin-instances.js';
import * as adminTiers from './screens/12-admin-tiers.js';
import * as adminCredits from './screens/13-admin-credits.js';

// [주소, 화면, 화면에 넘길 값, 목록에 보일 이름]
export const ROUTES = [
  ['#/login', login],
  ['#/instances', instances],
  ['#/instances/empty', instancesEmpty],
  ['#/create', create],
  ['#/create/class', createClass],
  ['#/instances/running', running],
  ['#/instances/stopped', stopped],
  ['#/alerts', alerts],
  ['#/m/alerts', alertsMobile],
  ['#/admin/equipment', adminEquipment],
  ['#/admin/gpus', adminGpus],
  ['#/admin/instances', adminInstances],
  ['#/admin/instances/terminate', adminInstances, { modalOpen: true }, '11-2 관리자 종료 (모달)'],
  ['#/admin/tiers', adminTiers],
  ['#/admin/credits', adminCredits],
];

const root = document.getElementById('app');

function renderIndex() {
  const link = ([href, screen, , label]) =>
    `<a class="index__link" href="${href}"><span class="t-strong">${label || screen.title}</span><span class="t-sub c-sub">${href}</span></a>`;
  const user = ROUTES.filter(([h]) => !h.startsWith('#/admin'));
  const admin = ROUTES.filter(([h]) => h.startsWith('#/admin'));
  return `
  <div class="index">
    <div class="col" style="gap:4px">
      <h1 class="t-title-l">GPU 공동 사용 플랫폼</h1>
      <p class="t-body c-sub">Figma '화면 설계' 페이지의 화면 목록입니다. 1280×720 브라우저 창에서 Figma와 같은 비율로 보입니다.</p>
    </div>
    <div class="index__group"><h2 class="t-title-s">사용자 화면</h2>${user.map(link).join('')}</div>
    <div class="index__group"><h2 class="t-title-s">관리자 화면</h2>${admin.map(link).join('')}</div>
  </div>`;
}

let current = null;

function render() {
  const hash = location.hash || '#/';
  const route = ROUTES.find(([h]) => h === hash);
  current = route || null;
  root.innerHTML = route ? route[1].render(route[2] || {}) : renderIndex();
  document.title = route ? `${route[3] || route[1].title} · GPU 공동 사용` : 'GPU 공동 사용 플랫폼';
  window.scrollTo(0, 0);
}

// 버튼 동작: data-action 이 붙은 요소를 누르면 해당 화면의 onAction 을 부른다
root.addEventListener('click', (e) => {
  const el = e.target.closest('[data-action]');
  if (!el) return;
  const action = el.dataset.action;
  if (action === 'toggle') {
    el.setAttribute('aria-checked', String(el.getAttribute('aria-checked') !== 'true'));
    return;
  }
  current?.[1].onAction?.(action, el, render);
});

root.addEventListener('input', (e) => current?.[1].onInput?.(e.target));
root.addEventListener('submit', (e) => { e.preventDefault(); location.hash = '#/instances'; });

window.addEventListener('hashchange', render);
render();
