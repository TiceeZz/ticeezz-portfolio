import s from './CaseStudy.module.css';

const blocks = [
  {
    label: '信息架构',
    title: '用户路径与信息架构优化',
    body: '重新梳理入口分流逻辑，设计了"状态感知"的服务大厅界面。通过界面引导逻辑的前置，向用户直观展示"机舱额度充足/受限"状态，减少用户盲目进入冗长流程后的无效操作。',
  },
  {
    label: '表单交互',
    title: '表单交互降噪与防错设计',
    body: '改善高门槛的托运信息填报体验。将原本大段的纯文本规则，转化为可视化的强限制交互组件（如品种检索弹窗、年龄校验滑块），降低用户的阅读理解成本与填错风险。',
  },
  {
    label: '情感设计',
    title: '状态可视化与界面情感化',
    body: '提出"飞行状态全链路可视化"的 UI 界面解法，以应对宠物托运中的脱离焦虑。设计了包含飞行高度、物流节点等数据的追踪面板，并结合设计的品牌 IP 形象，通过温情的视觉表达提升服务体验。',
  },
];

const keywords = ['信息架构', '全链路UX', '表单防错', '状态可视化', '情感化设计', '服务设计', '宠物经济', '航旅体验'];

export default function CaseStudy() {
  return (
    <section className={s.root}>
      <div className={s.header}>
        <span className={s.headerTag}>FEATURED CASE STUDY</span>
        <h2 className={s.title}>
          航旅纵横<span className={s.accent}>|</span>宠物出行
        </h2>
        <p className={s.subtitle}>打破"黑盒"的全链路 UX 重构</p>
      </div>

      <div className={s.grid}>
        {blocks.map((b) => (
          <div key={b.label} className={s.card}>
            <span className={s.cardLabel}>{b.label}</span>
            <h3 className={s.cardTitle}>{b.title}</h3>
            <p className={s.cardBody}>{b.body}</p>
          </div>
        ))}
      </div>

      <div className={s.keywords}>
        {keywords.map((k) => (
          <span key={k} className={s.keyword}>{k}</span>
        ))}
      </div>
    </section>
  );
}
