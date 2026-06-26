import { ApplyJobDetailPage } from "@/components/sections/apply";
import { recruitmentApi } from "@/api/domains/recruitment";
import type { JobPosting } from "@/types/api";
import { ROUTES } from "@/lib/routes";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const jobs = await recruitmentApi.getPublishedJobs({ limit: 100 });
    return jobs.map((job: JobPosting) => ({ slug: job.slug }));
  } catch {
    return [];
  }
}

export default async function JobDetail({ params }: Props) {
  const { slug } = await params;

  if (!slug) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center pt-20">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Không tìm thấy công việc</h1>
          <p className="text-gray-600">Vui lòng chọn một vị trí tuyển dụng để xem chi tiết.</p>
        </div>
      </main>
    );
  }

  let job: JobPosting | null = null;
  let publishedJobs: JobPosting[] = [];
  try {
    [job, publishedJobs] = await Promise.all([
      recruitmentApi.getJobBySlug(slug),
      recruitmentApi.getPublishedJobs({ limit: 5 }).catch(() => [] as JobPosting[]),
    ]);
  } catch {
    job = null;
    publishedJobs = [];
  }

  if (!job) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center pt-20">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Không tìm thấy công việc</h1>
          <p className="text-gray-600">Công việc bạn tìm không tồn tại hoặc chưa được đăng tuyển.</p>
          <a
            href={ROUTES.apply}
            className="inline-block mt-4 text-sm font-medium hover:underline"
            style={{ color: "#C8102E" }}
          >
            Quay lại danh sách tuyển dụng
          </a>
        </div>
      </main>
    );
  }

  const otherJobs = publishedJobs.filter((j) => j.id !== job.id).slice(0, 4);
  const availablePositions = publishedJobs.map((j) => j.title);

  return (
    <ApplyJobDetailPage
      job={job}
      otherJobs={otherJobs}
      defaultPosition={job.title}
      availablePositions={availablePositions}
    />
  );
}
