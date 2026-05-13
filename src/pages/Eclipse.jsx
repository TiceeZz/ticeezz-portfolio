import ProjectDetail from '../components/ui/ProjectDetail';

const IMG_DIR = '/images/projects/eclipse';

const pptImages = Array.from({ length: 55 }, (_, i) =>
  `${IMG_DIR}/page_${String(i + 95).padStart(3, '0')}.jpg`
);

const boardImages = Array.from({ length: 2 }, (_, i) =>
  `${IMG_DIR}/page_${String(i + 150).padStart(3, '0')}.jpg`
);

const sections = [
  { label: 'PPT方案', images: pptImages },
  { label: '展板', images: boardImages },
  { label: '视频', images: [], type: 'video', embedUrl: 'https://player.bilibili.com/player.html?bvid=BV1bo556hEEj&page=1&high_quality=1&autoplay=0' },
];

const project = {
  title: 'Eclipse · 月食',
  tag: 'Product Design',
  desc: '面向<strong>半失能老人家庭</strong>的通用化智能洗漱方案。包含自由调节高度的智能镜、集成健康监测的扶手，以及符合人机工学的台面柜体。镜子在升降过程中模拟<strong>月食阴晴圆缺的尺度变化</strong>，将天体美学转化为日常仪式感，兼顾半失能老人与全体家庭成员的使用需求。',
  keywords: ['产品设计', '通用化设计', '适老化', '情感语义'],
};

export default function Eclipse() {
  return <ProjectDetail project={project} sections={sections} cover="/images/projects/eclipse/cover.webp" projectSlug="/eclipse" />;
}
