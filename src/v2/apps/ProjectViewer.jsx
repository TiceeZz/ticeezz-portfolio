export default function ProjectViewer({ project }) {
  if (!project) return null;
  return (
    <div className="os-project">
      <div className="os-project__cover">
        <img src={project.img} alt={project.title} onError={(e) => { e.currentTarget.parentElement.classList.add('no-img'); }} />
        <span className="os-project__num">{project.num}</span>
      </div>
      <div className="os-project__info">
        <h2>{project.title}</h2>
        <p>{project.desc}</p>
        <a className="os-btn" href={project.href} target="_blank" rel="noreferrer">
          打开完整详情页 ↗
        </a>
      </div>
    </div>
  );
}
