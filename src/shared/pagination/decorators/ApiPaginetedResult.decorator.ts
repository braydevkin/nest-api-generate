import { applyDecorators, Type } from '@nestjs/common';
import { ApiOkResponse, ApiResponseOptions, getSchemaPath } from '@nestjs/swagger';
import { PaginatedResponse, PaginationInfos } from '../types';

export const ApiPaginatedResult = <TModel extends Type<any>>(
    model: TModel,
    options?: Omit<ApiResponseOptions, 'schema' | 'type'>,
): any => {
    return applyDecorators(
        ApiOkResponse({
            ...options,
            schema: {
                allOf: [
                    { $ref: getSchemaPath(PaginatedResponse) },
                    {
                        properties: {
                            pagination: {
                                $ref: getSchemaPath(PaginationInfos),
                            },
                            results: {
                                type: 'array',
                                items: { $ref: getSchemaPath(model) },
                            },
                        },
                    },
                ],
            },
        }),
    );
};
