import ProjectDetail from '../components/ui/ProjectDetail';

const IMG_DIR = '/images/projects/seed';

const reportImages = Array.from({ length: 25 }, (_, i) =>
  `${IMG_DIR}/page_${String(i + 1).padStart(3, '0')}.jpg`
);

const sections = [
  { label: '项目报告', images: reportImages },
  { label: '视频', images: [], type: 'video', videos: [
    { title: '工作坊视频', poster: '/images/projects/seed/video-cover.jpg' },
  ] },
];

const project = {
  title: 'AHRC SEED Fellowship',
  tag: 'Workshop',
  desc: 'The AHRC SEED Fellowship Mini Grant Project。独立完成中英双语报告（纯文字与图文排版）、<strong>主导项目视频剪辑与视觉制作</strong>，策划并落地工作坊全流程（方案、动线与海报设计），并运用 AI 辅助生成智慧养老产品概念，展现跨文化、跨媒介的综合交付能力。',
  keywords: ['跨国合作', '双语报告', '工作坊设计', 'AI 概念生成'],
};

export default function Seed() {
  return <ProjectDetail project={project} sections={sections} cover="/images/projects/seed/cover.jpg" projectSlug="/seed" />;
}
