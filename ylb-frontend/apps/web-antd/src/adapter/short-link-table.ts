import { requestClient } from '#/api/request';

export namespace ShortLinkTableApi {
  export interface PageFetchParams {
    [key: string]: any;
    page: number;
    pageSize: number;
  }
  export interface GenerateParams {
    [key: string]: any;
    originUrl: string;
    shortDomain: string;
  }
}

/**
 * 获取示例表格数据
 */
async function getShortLinkList(params: ShortLinkTableApi.PageFetchParams) {
  return requestClient.get('/shortLink/list', { params });
}

/**
 * 获取示例表格数据
 */
async function generateShortLink(params: ShortLinkTableApi.GenerateParams) {
  return requestClient.post('/shortLink/generate', { ...params });
}

export { generateShortLink, getShortLinkList };
