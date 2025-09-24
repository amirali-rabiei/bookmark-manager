<script setup>
import { useAutoFetchStore } from '@/stores/autoFetchStore';
import { useBookmarkStore } from '@/stores/bookmarkStore';
import axios from 'axios';
import { onMounted, ref, useTemplateRef } from 'vue';
import * as yup from 'yup'

const bookmarkUrl = ref('')
const bookmarkName = ref('')
const bookmarkDescription = ref('')
const bookmarkCategory = ref('')
const bookmarkIcon = ref('')
const categories = ref('')
const isSuccess = ref(false)
const previewImage = useTemplateRef('preview')

const useFetch = useAutoFetchStore()

const autoFetchData = async (e) => {

    const url = e.target.value

    try {

        await axios.post('http://localhost:3000/fetchData', { url }, {
            withCredentials: true
        })
            .then((result) => {
                bookmarkUrl.value = result.data.url
                bookmarkName.value = result.data.title
                bookmarkDescription.value = result.data.description
                previewImage.value.src = result.data.favicons
                bookmarkIcon.value = result.data.favicons
            })
            .catch((error) => {
                console.log(error)
            })


    } catch (error) {
        console.log(error)
    }
}

const handleBlur = (e) => {
    if (useFetch.isAuto) {
        autoFetchData(e)
    }
}

const schema = yup.object().shape({
    url: yup.string().url('Invalid URL format').required(),
    name: yup.string().max(20).required(),
    description: yup.string(),
    category: yup.string().required(),

})

const bookmarkStore = useBookmarkStore()
const AddBookmarkHandler = async () => {

    const Payload = {
        url: bookmarkUrl.value,
        name: bookmarkName.value,
        description: bookmarkDescription.value,
        logo: bookmarkIcon.value,
        category: bookmarkCategory.value ? bookmarkCategory.value : 'no category',
    }

    schema.validate(Payload)
        .then(valid => console.log(valid))
        .catch(error => console.log(error))

    try {

        // await axios.post('http://localhost:3000/addBookMark', Payload, {
        //     withCredentials: true,
        //     headers: {
        //         "Content-Type": 'multipart/form-data'
        //     }
        // })
        //     .then((result) => {

        //         if (result.status === 200) {

        //             isSuccess.value = !isSuccess.value
        //             setTimeout(() => {
        //                 isSuccess.value = !isSuccess.value
        //             }, 6000);

        //         }
        //     })
        // await bookmarkStore.fetchBookmarks()

        //     .catch((error) => {
        //         console.log(error)
        //     })

        // bookmarkUrl.value = ''
        // bookmarkName.value = ''
        // bookmarkDescription.value = ''
        // bookmarkCategory.value = ''

    } catch (error) {
        console.log(error)
    }
}

const selectBookmarkLogo = (e) => {
    const file = e.target.files[0]
    bookmarkIcon.value = file

    const reader = new FileReader()

    reader.onload = (e) => {
        previewImage.value.src = e.target.result
    }

    reader.readAsDataURL(file)


}



onMounted(async () => {

    try {

        await axios.post('http://localhost:3000/fetchCateGories', {}, {
            withCredentials: true
        })
            .then((result) => {
                categories.value = result.data
            })
            .catch((error) => {
                console.log(error)
            })



    } catch (error) {
        console.log(error)
    }
})

const selectBookmarkCategory = (e) => {
    bookmarkCategory.value = e.target.value
}

</script>

<template>
    <div class="py-[34px] px-[34px] flex flex-col gap-y-[20px]">
        <div class="text-end">


            <div v-if="isSuccess"
                class="absolute right-[34px] w-fit bg-blue-500 rounded-sm text-white text-sm font-bold px-4 py-3"
                role="alert">
                <p>Bookmark added succssfully</p>
            </div>

        </div>
        <h3 class="text-[33px] text-[#F4F4F4] font-bold">{{ $t('addBookmark.title') }}</h3>
        <p class="text-[#7F7F7F] text-[19px]">{{ $t('addBookmark.text') }}</p>
        <div class="mt-[30px]">
            <h5 class="text-[#F7F7F7] text-[23px] mb-[10px]">{{ $t('addBookmark.url') }}</h5>
            <input @blur="handleBlur" v-model="bookmarkUrl" type="text" placeholder="http://example.come"
                class="bg-[#1B1B1B] text-[16px] border-[0.6px] rounded-[10px] w-full lg:w-[50%] h-[46px] py-[10px] px-[20px] outline-none border-[#515151] text-[#515151]">
        </div>
        <div>
            <h5 class="text-[#F7F7F7] text-[23px] mb-[10px]">{{ $t('addBookmark.name') }}</h5>
            <label for="n"></label>
            <input v-model="bookmarkName" id="n" type="text" placeholder="Figma"
                class="bg-[#1B1B1B] text-[16px] border-[0.6px] rounded-[10px] w-full lg:w-[50%] h-[46px] py-[10px] px-[20px] outline-none border-[#515151] text-[#515151]">
        </div>
        <div>
            <h5 class="text-[#F7F7F7] text-[23px] mb-[10px]">{{ $t('addBookmark.description') }}</h5>
            <input maxlength="72" v-model="bookmarkDescription" type="text" placeholder="Cloud-based UI/UX Design tool."
                class="bg-[#1B1B1B] text-[16px] border-[0.6px] rounded-[10px] w-full lg:w-[50%] h-[46px] py-[10px] px-[20px] outline-none border-[#515151] text-[#515151]">
        </div>
        <div>
            <h5 class="text-[#F7F7F7] text-[23px] mb-[10px]">{{ $t('addBookmark.logo') }}</h5>
            <div
                class="bg-[#1B1B1B] relative border-[#515151] rounded-[50%] border-1 w-[100px] h-[100px] text-[#515151]">
                <img ref="preview" class="h-full object-cover rounded-[50%]" />
                <label class="absolute " for="preview">Upload logo</label>
            </div>
            <input hidden @change="selectBookmarkLogo" id="preview" type="file"
                class="bg-[#1B1B1B] text-[16px] border-[0.6px] rounded-[10px] w-full lg:w-[50%] h-[46px] py-[10px] px-[20px] outline-none border-[#515151] text-[#515151]">
        </div>
        <div>
            <h5 class="text-[#F7F7F7] text-[23px] mb-[10px]">{{ $t('addBookmark.category') }}</h5>
            <select @change="selectBookmarkCategory" name="" id=""
                class="bg-[#1B1B1B] text-[16px] border-[0.6px] rounded-[10px] w-full lg:w-[50%] h-[46px] py-[10px] px-[20px] outline-none border-[#515151] text-[#FDFDFD]">
                <option disabled value="" selected>Select Category</option>
                <option v-for="category of categories" :key="category.id">{{ category.categoryName }} </option>
            </select>
        </div>
        <div>
            <button @click="AddBookmarkHandler"
                class="bg-[#F7F7F7] text-[16px] hover:bg-gray-200 rounded-[10px] text-[#262626 w-full lg:h-[56px] lg:w-[50%] border-none  py-[10px] px-[20px]">
                {{ $t('addBookmark.add') }}
            </button>
        </div>
    </div>

</template>
