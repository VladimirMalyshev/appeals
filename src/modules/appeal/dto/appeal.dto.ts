export interface CreateAppealDto {
  title: string;
  message: string;
}

export interface CompleteAppealDto {
  resolution: string;
}

export interface CancelAppealDto {
  reason: string;
}

export interface AppealQueryParamsDTO {
  date?: string;
  from?: string;
  to?: string;
}
