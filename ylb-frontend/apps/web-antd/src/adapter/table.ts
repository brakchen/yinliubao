import { requestClient } from '#/api/request';

export namespace ShortLinkTableApi {
  export interface PageFetchParams {
    [key: string]: any;
    page: number;
    pageSize: number;
  }
}

/**
 * 获取示例表格数据
 */
async function getShortLinkList(params: ShortLinkTableApi.PageFetchParams) {
  return requestClient.get('/shortLink/list', { params });
}

export { getShortLinkList };
