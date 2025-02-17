import { ApiResponse, BaseEntity } from "./api";

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

export type TagResponse = ApiResponse<TagApiData[]>;
