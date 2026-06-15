"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { colors } from "@/lib/theme";
import { ApplyManageForm, type JobFormData } from "./ApplyManageForm";
import { ApplyManageList } from "./ApplyManageList";

const initialJobs: JobFormData[] = [
  {
    id: 1,
    title: "Trưởng Phòng Kinh Doanh Bất Động Sản",
    location: "TP. HCM",
    type: "Toàn thờі gian",
    salary: "30 - 50 triệu",
    description: ["Xây dựng và quản lý đội ngũ kinh doanh", "Đề xuất chiến lược phát triển thị trường", "Đảm bảo chỉ tiêu doanh số"],
    requirements: ["Tối thiểu 5 năm kinh nghiệm", "Kỹ năng lãnh đạo tốt", "Giao tiếp tiếng Anh"],
    benefits: ["Lương cạnh tranh + thưởng", "Bảo hiểm đầy đủ", "Du lịch hàng năm"],
  },
  {
    id: 2,
    title: "Chuyên Viên Marketing Dự Án",
    location: "TP. HCM",
    type: "Toàn thờі gian",
    salary: "15 - 25 triệu",
    description: ["Lập kế hoạch marketing cho dự án", "Quản lý ngân sách quảng cáo", "Phân tích thị trường"],
    requirements: ["2+ năm kinh nghiệm marketing BĐS", "Thành thạo Facebook Ads, Google Ads", "Sáng tạo, chủ động"],
    benefits: ["Lương + thưởng theo KPI", "Cơ hội thăng tiến", "Môi trường năng động"],
  },
  {
    id: 3,
    title: "Thực Tập Sinh Kinh Doanh",
    location: "Hà Nội",
    type: "Thực tập",
    salary: "2 - 5 triệu",
    description: ["Hỗ trợ tìm kiếm khách hàng tiềm năng", "Tham gia tổ chức sự kiện", "Học hỏi quy trình bán hàng"],
    requirements: ["Sinh viên năm 3, 4", "Năng động, ham học hỏi", "Giao tiếp tốt"],
    benefits: ["Hỗ trợ chi phí", "Được đào tạo chuyên sâu", "Cơ hội nhận việc chính thức"],
  },
];

export default function ApplyManagePage() {
  const [jobs, setJobs] = useState<JobFormData[]>(initialJobs);
  const [editing, setEditing] = useState<JobFormData | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleSave = (data: JobFormData) => {
    if (editing?.id) {
      setJobs((prev) => prev.map((j) => (j.id === editing.id ? data : j)));
    } else {
      setJobs((prev) => [...prev, { ...data, id: Date.now() }]);
    }
    setShowForm(false);
    setEditing(null);
  };

  const handleEdit = (job: JobFormData) => {
    setEditing(job);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setJobs((prev) => prev.filter((j) => j.id !== id));
  };

  const handleAdd = () => {
    setEditing(null);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditing(null);
  };

  return (
    <Section padding="md" bg="gray">
      <div className="space-y-8">
          {showForm ? (
            <ApplyManageForm
              initialData={editing ?? undefined}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          ) : (
            <ApplyManageList
              jobs={jobs}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onAdd={handleAdd}
            />
          )}
      </div>
    </Section>
  );
}
