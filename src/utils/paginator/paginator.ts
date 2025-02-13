import { paginatorDto } from "./dto/paginator.dto.js";

//
type PaginatorQueryReturn<DataType> = {
  total: () => Promise<number>;
  data: () => Promise<DataType[]>;
};

export type PaginationArgs = {
  skip?: number;
  take?: number;
};
type PaginatorQuery<DataType> = (
  paginationArgs: PaginationArgs,
) => PaginatorQueryReturn<DataType>;
//
type paginationResult<PaginatorQueryData> = Promise<{
  data: PaginatorQueryData;
  meta: {
    skip: number;
    take: number;
    count: number | null;
  };
}>;
//

/**
 * @example
    const paginatorQuery = (paginationArgs: PaginationArgs) => {
      let where: Prisma.ProductWhereInput = {
        deletedAt: null,
        ...query,
      };

      return {
        total: () => this.prisma.product.count({ where }),
        data: () =>
          this.prisma.product.findMany({
            ...paginationArgs,
            where,
          }),
      };
    };
    const res = await paginator(paginatorQuery, query);
 */
export async function paginator<DataType>(
  paginatorQuery: PaginatorQuery<DataType>,
  paginatorDto: paginatorDto,
): paginationResult<DataType[]> {
  let take: number | undefined = undefined;
  let skip: number | undefined = undefined;
  if (paginatorDto) {
    if ("perPage" in paginatorDto) {
      paginatorDto = convertPerPageToSkipTake(paginatorDto);
    }

    take = paginatorDto.take;
    skip = paginatorDto.skip;
  }
  //

  const totalAndData =
    take === undefined ? paginatorQuery({}) : paginatorQuery({ skip, take });

  let count: number | null = null;
  if (take !== undefined) {
    count = await totalAndData.total();
  }

  return {
    data: await totalAndData.data(),
    meta: {
      count,
      skip: skip === undefined ? 0 : skip,
      take: take === undefined ? 0 : take,
    },
  };
}

function convertPerPageToSkipTake(payload: { page: number; perPage: number }) {
  return {
    skip: (payload.page - 1) * payload.perPage,
    take: payload.perPage,
  };
}
