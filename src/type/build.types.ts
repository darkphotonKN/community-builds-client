import { BaseEntity } from "./api";

export type CreateBuildResponse = {};

export type ClassAscendancy = {
  name: string;
  description: string;
  imageUrl: string;
} & BaseEntity;

export type Tag = {
  name: string;
} & BaseEntity;

export type ClassAndAscendanciesResponse = {
  classes: ClassAscendancy[];
  ascendancies: ClassAscendancy[];
};

export type TagApiData = {
  name: string;
} & BaseEntity;

export type SkillApiData = {
  name: string;
  type: string;
} & BaseEntity;

export type Build = {
  id: string;
  title: string;
  description: string;
  ascendancy: string;
  class: string;
  mainSkill: string;
  avgBossingRating: number;
  avgCreativeRating: number;
  avgEndGameRating: number;
  avgFunRating: number;
  avgSpeedFarmRating: number;
  status: number;
  views: number;
  tags: string[] | null;
  createdAt: string;
};
