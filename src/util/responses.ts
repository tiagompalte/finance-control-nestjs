import { applyDecorators } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'

export function Responses() {
  return applyDecorators(
    ApiResponse({
      status: 200,
      description: 'OK',
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request',
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized',
    }),
    ApiResponse({
      status: 403,
      description: 'Forbidden',
    }),
    ApiResponse({
      status: 404,
      description: 'Not Found',
    }),
    ApiResponse({
      status: 500,
      description: 'Internal Server Error',
    }),
    ApiResponse({
      status: 502,
      description: 'Bad Gateway',
    }),
  )
}
