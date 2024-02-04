<script setup>
import { ref, onMounted } from "vue";
import { Icon } from "@iconify/vue";
import { useDataStore } from "../stores/dataStore";
import {
  NForm,
  NFormItem,
  NDatePicker,
  NInput,
  NInputNumber,
  NButton,
  NButtonGroup,
  NRadioButton,
  NRadioGroup,
  NDynamicTags,
  NUpload,
  NImage,
} from "naive-ui";
const datastore = useDataStore();
const formRef = ref(null);
const disabled = ref(false);
const editData = ref(false);
const formValue = ref({
  name: "",
  image: "",
  category: [],
  qty: 0,
  price: 0,
  datetimeValue: null,
});
const storage = ref("入庫");

onMounted(() => {
  resetCategory();
});

const change = () => {
  if (storage.value === "出庫") {
    disabled.value = true;
  } else if (storage.value === "入庫") {
    disabled.value = false;
  }
};
const resetCategory = () => {
  const objgroupBy = Object.groupBy(
    datastore.filterData,
    (item) => item.category
  );
  formValue.value.category = Object.keys(objgroupBy);
};
const namefilter = (name) => {
  datastore.filterData.find((el) => {
    if (name === el.name) {
      editData.value = true;
      formValue.value = {
        ...el,
        qty: 0,
        category: [el.category],
      };
    }
  });
};
const addData = (e) => {
  e.preventDefault();
  if (!editData.value) {
    datastore.filterData.push(formValue.value);
  } else {
    const temp = datastore.filterData.map((el) => {
      if (el.name === formValue.value.name) {
        let newQty = 0;
        if (storage.value === "出庫") {
          newQty = el.qty - formValue.value.qty;
        } else if (storage.value === "入庫") {
          newQty = el.qty + formValue.value.qty;
        }
        el = {
          ...formValue.value,
          category: [el.category],
          qty: newQty,
        };
        return el;
      } else {
        return el;
      }
    });

    datastore.filterData = temp;
  }
  formValue.value = {
    name: "",
    image: "",
    category: [],
    qty: 0,
    price: 0,
    datetimeValue: null,
  };
  resetCategory();
};
const uploadFile = (img) => {
  datastore.uploadFile(img);
  setTimeout(() => {
    if(datastore.imageUrl!=='') {
      formValue.value.image=datastore.imageUrl;
    }
  }, 3000)
};
</script>

<template>
  <n-form
    ref="formRef"
    inline
    label-width="auto"
    :model="formValue"
    label-placement="left"
    require-mark-placement="right-hanging"
    flex-col
  >
    <n-form-item label="出入庫" path="storage">
      <n-radio-group v-model:value="storage" @change="change">
        <n-radio-button ghost value="出庫"> 出庫 </n-radio-button>
        <n-radio-button ghost value="入庫"> 入庫 </n-radio-button>
      </n-radio-group>
    </n-form-item>
    <n-form-item label="日期" path="datetimeValue">
      <n-date-picker v-model:value="formValue.datetimeValue" type="datetime" />
    </n-form-item>
    <n-form-item label="品名" path="formValue.name">
      <n-input
        v-model:value="formValue.name"
        placeholder="輸入品名"
        @change="namefilter"
      />
    </n-form-item>
    <n-form-item label="類別" path="formValue.category">
      <n-dynamic-tags v-model:value="formValue.category" />
    </n-form-item>
    <n-form-item label="商品照片" path="formValue.image">
      <n-image
        width="100"
        :src="formValue.image"
        v-if="formValue.image !== ''"
      />
      <n-upload
        list-type="image-card"
        @change="uploadFile"
        :max="1"
        :disabled="disabled"
        v-else
      />
    </n-form-item>
    <n-form-item label="數量" path="formValue.qty">
      <n-input-number
        v-model:value="formValue.qty"
        placeholder="輸入數量"
        :show-button="false"
      />
    </n-form-item>
    <n-form-item label="單價" path="formValue.price">
      <n-input-number
        v-model:value="formValue.price"
        placeholder="輸入單價"
        :disabled="disabled"
        :show-button="false"
      />
    </n-form-item>
    <n-form-item label="總金額" path="formValue.total">
      <n-input-number
        :value="formValue.qty * formValue.price || 0"
        placeholder="總金額"
        :disabled="disabled"
        :show-button="false"
      />
    </n-form-item>
    <n-form-item>
      <n-button-group>
        <n-button ghost @click="formValue = {}">
          <template #icon>
            <Icon icon="ion:refresh" />
          </template>
          重設
        </n-button>
        <n-button ghost @click="addData">
          <template #icon>
            <Icon icon="ion:save-outline" />
          </template>
          儲存
        </n-button>
        <n-button ghost @click="datastore.searchData(formValue)">
          <template #icon>
            <Icon icon="ion:search" />
          </template>
          查詢
        </n-button>
      </n-button-group>
    </n-form-item>
  </n-form>
</template>