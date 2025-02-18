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
