import { ref, onMounted } from "vue";
import { defineStore } from 'pinia';
import axios from "axios";

export const useDataStore = defineStore('data', () => {
  const filterData = ref([]);
  const imageUrl = ref('');
  const data = ref([
    {
      id:1704262865000,
      name: "洋芋片",
      image: "https://i.imgur.com/1XZMJsD.jpg",
      category: "餅乾",
      qty: 100,
      price: 30,
      datetimeValue: 1704262865000,
    },
    {
      id:1704349267000,
      name: "巧克力牛奶糖",
      image: "https://i.imgur.com/NoR0ink.jpg",
      category: "糖果",
      qty: 100,
      price: 50,
      datetimeValue: 1704349267000,
    },
    {
      id: 1704694869000,
      name: "蘇打餅乾",
      image: "https://imgur.com/sQure0J.jpg",
      category: "餅乾",
      qty: 100,
      price: 25,
      datetimeValue: 1704694869000,
    },                    
  ])
  onMounted(() => {
    filterData.value = [...data.value]
  })
  const searchData = (item) => {
    if(item === '') {
      filterData.value = [...data.value]
    }
    filterData.value = data.value.filter((el) => el.name.includes(item.name));
  }
  const deleteData = (item) => {
    const index = filterData.value.findIndex((el) => el.id === item.id);
    filterData.value.splice(index, 1)
  }
  const saveData = (item) => {
    const temp = [...filterData.value]
    const result = temp.map((el) => {
      if(el.id===item.id) {
        item.datetimeValue = new Date().getTime();
        return el=item
      }
      else {
        return el
      }
    })
    filterData.value = [...result]
  }
  const uploadFile = (img) => {
    const { file } = img;
    const formData = new FormData();
    formData.append("image", file.file);
    formData.append("album", import.meta.env.VITE_APP_ALBUM);
    const postconfig = {
      method: "post",
      url: "https://api.imgur.com/3/image",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_APP_TOKEN}`,
      },
      processData: false,
      mimeType: "multipart/form-data",
      contentType: false,
      data: formData,
    };
  
    axios(postconfig).then((res) => {
      imageUrl.value = res.data.data.link;
    });
  };
  return { searchData, filterData, deleteData, saveData, uploadFile, imageUrl }
})