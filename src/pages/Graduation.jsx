import ProjectDetail from '../components/ui/ProjectDetail';

const IMG_DIR = '/images/projects/graduation';

const pptImages = Array.from({ length: 46 }, (_, i) =>
  `${IMG_DIR}/page_${String(i + 152).padStart(3, '0')}.jpg`
);

const boardImages = Array.from({ length: 3 }, (_, i) =>
  `${IMG_DIR}/page_${String(i + 198).padStart(3, '0')}.jpg`
);

const sections = [
  { label: 'PPT方案', images: pptImages },
  { label: '展板', images: boardImages },
  { label: '视频', images: [], type: 'video', videos: [
    { title: '「予热」交互演示', embedUrl: 'https://player.bilibili.com/player.html?bvid=BV1Uj556ZEvd&page=1&high_quality=1&autoplay=0' },
    { title: '「予热」产品展示', embedUrl: 'https://player.bilibili.com/player.html?bvid=BV1SL556bEuv&page=1&high_quality=1&autoplay=0' },
  ] },
];

const project = {
  title: '尊严的具现 · Graduation Project',
  tag: 'Service Design',
  desc: '面向<strong>初老人群</strong>的智慧养老产品服务设计。独立完成从服务分析到产品设计的全流程，涵盖服务触点设计（产品、交互）、人机工程与用户测试。创新融合 AIGC 工具（Stable Diffusion、Midjourney、Runway）与传统设计软件，<strong>以 AI 赋能设计流程</strong>，系统提升效率与创新性。',
  keywords: ['毕业设计', '智慧养老', 'AIGC 赋能', '服务触点设计'],
};

export default function Graduation() {
  return <ProjectDetail project={project} sections={sections} cover="/images/projects/graduation/cover.webp" projectSlug="/graduation" />;
}
