// Course types

import { BaseEntity, Status } from './common.types';
import { UserRole } from './auth.types';

export interface Course extends BaseEntity {
  title: string;
  description: string;
  shortDescription?: string;
  instructorId: string;
  instructorName: string;
  franchiseId?: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in minutes
  price: number;
  currency: string;
  status: Status;
  thumbnail?: string;
  videoUrl?: string;
  tags: string[];
  prerequisites?: string[];
  learningObjectives: string[];
  syllabus: CourseSection[];
  enrolledStudents: number;
  maxStudents?: number;
  rating?: number;
  totalRatings?: number;
  isPublished: boolean;
  publishedAt?: Date;
}

export interface CourseSection {
  id: string;
  title: string;
  description?: string;
  order: number;
  lessons: CourseLesson[];
  duration: number; // in minutes
}

export interface CourseLesson {
  id: string;
  title: string;
  description?: string;
  order: number;
  type: 'video' | 'text' | 'quiz' | 'assignment';
  content: string;
  duration: number; // in minutes
  videoUrl?: string;
  attachments?: CourseAttachment[];
  isCompleted?: boolean;
}

export interface CourseAttachment {
  id: string;
  name: string;
  type: string;
  url: string;
  size: number;
}

export interface CourseEnrollment extends BaseEntity {
  userId: string;
  courseId: string;
  status: 'active' | 'completed' | 'cancelled' | 'paused';
  enrolledAt: Date;
  completedAt?: Date;
  progress: number; // percentage
  currentLessonId?: string;
  lastAccessedAt?: Date;
  certificateUrl?: string;
}

export interface CourseReview extends BaseEntity {
  userId: string;
  courseId: string;
  rating: number; // 1-5
  comment?: string;
  isAnonymous: boolean;
}

export interface CourseFilters {
  category?: string;
  level?: string;
  instructorId?: string;
  franchiseId?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  status?: Status;
  search?: string;
  tags?: string[];
}

export interface CourseCreateData {
  title: string;
  description: string;
  shortDescription?: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  price: number;
  currency: string;
  tags: string[];
  prerequisites?: string[];
  learningObjectives: string[];
  syllabus: Omit<CourseSection, 'id'>[];
  maxStudents?: number;
}

export interface CourseUpdateData extends Partial<CourseCreateData> {
  status?: Status;
  isPublished?: boolean;
}

export interface CourseStats {
  totalCourses: number;
  publishedCourses: number;
  draftCourses: number;
  totalEnrollments: number;
  averageRating: number;
  totalRevenue: number;
  coursesByCategory: Record<string, number>;
  coursesByLevel: Record<string, number>;
}
