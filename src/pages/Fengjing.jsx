import ProjectDetail from '../components/ui/ProjectDetail';

const IMG_DIR = '/images/projects/fengjing';

const pptImages = Array.from({ length: 63 }, (_, i) =>
  `${IMG_DIR}/page_${String(i + 32).padStart(3, '0')}.jpg`
);

const sections = [
  { label: 'PPT方案', images: pptImages },
];

const project = {
  title: '枫泾小院 · Fengjing Courtyard',
  tag: 'Branding',
  desc: '面向乡村振兴的农产品文创品牌设计。从枫泾小院的在地文化与四季风物中提炼视觉元素，构建<strong>品牌标志、IP 形象与系列包装体系</strong>，以质朴温润的视觉语言传递乡土温度与自然时序之美。',
  keywords: ['乡村振兴', '品牌设计', '文创包装', 'IP 形象'],
};

export default function Fengjing() {
  return <ProjectDetail project={project} sections={sections} cover="/images/projects/fengjing/cover.jpg" projectSlug="/fengjing" />;
}
