// 07 알림
import { UserLayout, Switch, AlertItem } from '../components.js';

export const title = '07 알림';

const alerts = [
  { level: 'warn', title: '메모리 사용량 92% · 실습-cnn', desc: '몫(1,664MB)의 90% 경고 문턱을 넘었습니다. 증가 속도로 보아 약 3분 안에 상한에 닿을 수 있습니다.', time: '방금 전' },
  { level: 'danger', title: '시작 실패 · gan-실험', desc: 'CUDA 초기화에 실패했습니다(1회 재시도 후). 인스턴스를 다시 생성해 주세요.', time: '12분 전' },
  { level: 'danger', title: '장비가 사라져 인스턴스가 종료되었습니다 · llm-미세조정', desc: '장비 소유자가 재부팅했습니다. 체크포인트는 공유 저장소에 남아 있으며, 홈 디렉터리는 마지막 동기화 시점으로 복구됩니다.', time: '어제' },
  { level: 'warn', title: '크레딧 잔액이 거의 없습니다', desc: '남은 크레딧 38 · 현재 속도로 약 1시간 뒤 소진됩니다.', time: '어제' },
];

export function render() {
  return UserLayout({ active: 'alerts' }, `
    <div class="row between">
      <h1 class="t-title-m">알림</h1>
      <div class="row" style="gap:12px;padding:8px 16px;background:var(--surface);border:1px solid var(--border-soft);border-radius:10px">
        <span class="t-strong">휴대전화 푸시 알림</span>
        ${Switch(true)}
      </div>
    </div>
    <div class="col" style="gap:10px">
      ${alerts.map(AlertItem).join('')}
    </div>
  `, 'padding:24px 32px;gap:18px');
}
