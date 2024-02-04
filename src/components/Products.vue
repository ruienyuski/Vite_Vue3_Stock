<script setup>
import { h, ref } from "vue";
import { useDataStore } from "../stores/dataStore";
import {
  NSpace,
  NButton,
  NDataTable,
  NModal,
  useMessage,
  NForm,
  NFormItem,
  NInput,
  NInputNumber,
  NUpload,
  NImage,
} from "naive-ui";
const datastore = useDataStore();
const tableRef = ref(null);
const showModalRef = ref(false);
const formRef = ref(null);
const message = useMessage();
const pagination = ref({ pageSize: 5 });
const tempData = ref({})

const columns = ref([
  {
    title: "商品",
    key: "name",
  },
  {
    title: "照片",
    key: "image",
    render(row) {
      return h(NImage, {src:row.image, width:150})
      }
  },
  {
    title: "分類",
    key: "category",
    defaultSortOrder: "deascend",
    sorter: "default",
  },
  {
    title: "數量",
    key: "qty",
    sorter: (row1, row2) => row1.qty - row2.qty,
  },
  {
    title: "價格",
    key: "price",
    sorter: (row1, row2) => row1.price - row2.price,
  },
  {
    title: "更新日期",
    key: "datetimeValue",
    sorter: (row1, row2) => row1.datetimeValue - row2.datetimeValue,
    render(row) {
      return new Date(row.datetimeValue).toISOString().split("T")[0];
    },
  },
  {
    title: "編輯",
    key: "edit",
    render(row) {
      return h(
        NButton,
        {
          strong: true,
          tertiary: true,
          size: "small",
          onClick: () => editClick(row),
        },
        { default: () => "編輯" }
      );
    },
  },
  {
    title: "刪除",
    key: "delete",
    render(row) {
      return h(
        NButton,
        {
          strong: true,
          tertiary: true,
          size: "small",
          onClick: () => datastore.deleteData(row),
        },
        { default: () => "刪除" }
      );
    },
  },
]);
const messages = {
  required: "%s is really really required",
};

const editClick = (item) => {
  tempData.value = {...item};
  showModalRef.value = true;
};
const saveData = () => {
  datastore.saveData(tempData.value)
  showModalRef.value = false;
};

const uploadFile = (img) => {
  datastore.uploadFile(img);
  setTimeout(() => {
    if(datastore.imageUrl!=='') {
      tempData.value.image=datastore.imageUrl;
    }
  }, 3000)
};
</script>

<template>
  <n-space vertical :size="12">
    <n-data-table
      ref="tableRef"
      :columns="columns"
      :single-line="false"
      :data="datastore.filterData"
      :pagination="pagination"
    />
  </n-space>

  <n-modal
    v-model:show="showModalRef"
    class="custom-card w-800px"
    preset="card"
    title="Modal"
    :bordered="false"
    size="huge"
    :segmented="{
      content: 'soft',
      footer: 'soft'
    }"

  >
    <template #header-extra> 關閉 </template>
      <n-form ref="formRef" :model="tempData" >
        <n-form-item label="商品" path="tempData.name">
          <n-input
            v-model:value="tempData.name"
            placeholder="輸入商品"
          />
        </n-form-item>
        <n-form-item label="照片" path="tempData.image" >
          <div>
            <div class="flex">
              <n-input
                v-model:value="tempData.image"
                placeholder="照片"
                class="mb-2"
              />
              <n-button type="tertiary" @click="tempData.image = ''">
                移除圖片
              </n-button>

            </div>
            <n-upload
              list-type="image-card"
              @change="uploadFile"
              :max="1"
              v-if="tempData.image === ''"
            />            
            <n-image
              width="100"
              :src="tempData.image"
              referrerpolicy="no-referrer"
              v-else
            />
          </div>
        </n-form-item>
        <n-form-item label="分類" path="tempData.category">
          <n-input
            v-model:value="tempData.category"
            placeholder="輸入分類"
          />
        </n-form-item>
        <n-form-item label="數量" path="tempData.qty">
          <n-input-number
            v-model:value="tempData.qty"
            placeholder="輸入數量"
            :show-button="false"
          />
        </n-form-item>
        <n-form-item label="價格" path="tempData.price">
          <n-input-number
            v-model:value="tempData.price"
            placeholder="輸入價格"
            :show-button="false"
          />
        </n-form-item>
      </n-form>
    <template #footer>
      <div class="text-right">
        <n-button type="error" @click="showModalRef = false"> 取消 </n-button>
        <n-button type="success" @click="saveData"> 儲存 </n-button>
      </div>
    </template>
  </n-modal>

</template>

<style scoped>
.bodyStyle {
  max-width: 300px;
}
</style>