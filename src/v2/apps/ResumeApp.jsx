import timeline, { honors, otherHonors, leadership } from '../../data/timeline';

export default function ResumeApp() {
  return (
    <div className="os-resume">
      <div className="os-resume__head">
        <span className="os-resume__file">Resume.pdf — 只读</span>
        <span className="os-resume__pages">{timeline.length} 条经历</span>
      </div>

      {timeline.map((t, i) => (
        <article className="os-resume__entry" key={i}>
          <div className="os-resume__year">
            <b>{t.year}</b>
            <span>{t.tag}</span>
          </div>
          <div className="os-resume__body">
            <h3>{t.title}</h3>
            <div className="os-resume__desc" dangerouslySetInnerHTML={{ __html: t.desc }} />
            <div className="os-resume__tags">
              {t.keywords.map((k) => <span key={k}>#{k}</span>)}
            </div>
          </div>
        </article>
      ))}

      <div className="os-resume__cols">
        <div>
          <h4>◆ 设计奖项</h4>
          <ul>{honors.map((h) => <li key={h}>{h}</li>)}</ul>
        </div>
        <div>
          <h4>◆ 其他荣誉</h4>
          <ul>{otherHonors.map((h) => <li key={h}>{h}</li>)}</ul>
        </div>
        <div>
          <h4>◆ 学生工作</h4>
          <ul>{leadership.map((h) => <li key={h}>{h}</li>)}</ul>
        </div>
      </div>
    </div>
  );
}
