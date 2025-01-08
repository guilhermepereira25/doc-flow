import { PartialType } from '@nestjs/mapped-types';
import type { ApiResponse as ApiResponseType } from './types';
import { ApiResponseDto } from './dto/api-response.dto';

export class ApiResponse<T> extends PartialType(ApiResponseDto) {
  constructor(apiResponse: ApiResponseType<T>) {
    super();
    this.status = apiResponse.status;
    this.data = apiResponse.data;
    this.success = apiResponse.success;
    this.error = apiResponse.error;
  }

  toJson(): ApiResponseType<T> {
    return {
      error: this.error,
      status: this.status,
      data: this.data as T,
      success: this.success,
    };
  }
}
