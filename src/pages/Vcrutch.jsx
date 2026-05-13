import ProjectDetail from '../components/ui/ProjectDetail';

const IMG_DIR = '/images/projects/vcrutch';

const enBoardImages = Array.from({ length: 3 }, (_, i) =>
  `${IMG_DIR}/page_${String(i + 419).padStart(3, '0')}.jpg`
);

const cnBoardImages = Array.from({ length: 3 }, (_, i) =>
  `${IMG_DIR}/page_${String(i + 422).padStart(3, '0')}.jpg`
);

const sections = [
  { label: '英文展板', images: enBoardImages },
  { label: '中文展板', images: cnBoardImages },
];

const project = {
  title: '医度 · Easygoing',
  tag: 'Service Design',
  desc: '面向老龄化社区的服务设计项目。从 PSS 方法论切入，<strong>主导移动端 App 全链路交互设计与 UI 规范制定</strong>，输出 2.5D 服务流线图，系统呈现无障碍出行就医的服务闭环。',
  keywords: ['全链路交互设计', 'UI 规范', 'PSS 分析', '服务设计'],
};

export default function Vcrutch() {
  return <ProjectDetail project={project} sections={sections} cover="/images/projects/vcrutch/cover.webp" projectSlug="/vcrutch" />;
}
