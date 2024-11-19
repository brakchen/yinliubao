<script lang="ts" setup>
import type { ShortLinkTableApi } from '#/adapter/table';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { computed, ref } from 'vue';

import { useVbenModal } from '@vben-core/popup-ui';

import { Button, message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { getShortLinkList } from '#/adapter/table';
import { useVbenVxeGrid } from '#/adapter/vxe-table';

import ExtraModal from './modal.vue';

const isShow = ref(false);

const hide = () => {
  isShow.value = false;
};

const show = () => {
  isShow.value = true;
};

const visible = computed(() => {
  return isShow.value;
});
interface RowType {
  category: string;
  color: string;
  id: string;
  price: string;
  productName: string;
  releaseDate: string;
}

/**
 * 获取示例表格数据
 */
async function getExampleTableApi(params: ShortLinkTableApi.PageFetchParams) {
  return new Promise<{ items: any; total: number }>((resolve) => {
    getShortLinkList(params).then((res) => {
      resolve({
        total: res.total,
        items: res.list,
      });
    });
  });
}

const [BaseForm] = useVbenForm({
  // 所有表单项共用，可单独在表单内覆盖
  commonConfig: {
    // 所有表单项
    componentProps: {
      class: 'w-full',
    },
  },
  // 提交函数
  handleSubmit: onSubmit,
  // 垂直布局，label和input在不同行，值为vertical
  // 水平布局，label和input在同一行
  layout: 'horizontal',
  schema: [
    {
      // 组件需要在 #/adapter.ts内注册，并加上类型
      component: 'Input',
      // 对应组件的参数
      componentProps: {
        placeholder: '请输入长链',
      },
      // 字段名
      fieldName: 'originUrl',
      // 界面显示的label
      label: '长链',
      rules: 'required',
    },
    {
      // 组件需要在 #/adapter.ts内注册，并加上类型
      component: 'Input',
      // 对应组件的参数
      componentProps: {
        placeholder: '请输入短域名',
      },
      // 字段名
      fieldName: 'shortDomain',
      // 界面显示的label
      label: '短域名',
      rules: 'required',
    },
  ],
  wrapperClass: 'grid-cols-1',
});

function onSubmit(values: Record<string, any>) {
  message.success({
    content: `form values: ${JSON.stringify(values)}`,
  });
}

const [Modal, modalApi] = useVbenModal({
  // 连接抽离的组件
  connectedComponent: ExtraModal,
});

const gridOptions: VxeGridProps<RowType> = {
  checkboxConfig: {
    highlight: true,
    labelField: 'name',
  },
  columns: [
    { title: '序号', type: 'seq', width: 50 },
    { align: 'left', title: 'Name', type: 'checkbox', width: 100 },
    { field: 'short_url', title: '短链接' },
    { field: 'origin_url', title: '长连接' },
    { field: 'status', title: '状态' },
    { field: 'created_at', title: '创建时间' },

    // { field: 'releaseDate', formatter: 'formatDateTime', title: 'DateTime' },
  ],
  exportConfig: {},
  // height: 'auto', // 如果设置为 auto，则必须确保存在父节点且不允许存在相邻元素，否则会出现高度闪动问题
  keepSource: true,
  proxyConfig: {
    ajax: {
      query: async ({ page }) => {
        return await getExampleTableApi({
          page: page.currentPage,
          pageSize: page.pageSize,
        });
      },
    },
  },
  toolbarConfig: {
    custom: true,
    export: true,
    // import: true,
    refresh: true,
    zoom: true,
  },
};

const [Grid, gridApi] = useVbenVxeGrid({
  gridOptions,
});
function openModal() {
  modalApi.open();
}
function handleUpdateTitle() {
  modalApi.setState({ title: '外部动态标题' });
  modalApi.open();
}
</script>

<template>
  <div class="vp-raw w-full">
    <Modal />
    <Button class="mr-2" type="primary" @click="openModal">
      新建
    </Button>
    <Grid>
      <template #toolbar-tools>
        <Button class="mr-2" type="primary" @click="() => gridApi.query()">
          刷新当前页面
        </Button>
        <Button type="primary" @click="() => gridApi.reload()">
          刷新并返回第一页
        </Button>
      </template>
    </Grid>
  </div>
</template>
