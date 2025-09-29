<script setup>

import axios from "axios"
import { onMounted, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
const route = useRoute()
const router = useRouter()
const bookmark = ref([])
const isLoading = ref(false)
const errorMessage = ref('')
const id = Number(route.params.id)

onMounted(async () => {

    try {

        await axios.post('http://localhost:3000/fetchBookmarkById', { id }, {
            withCredentials: true
        })
            .then((result) => {
                isLoading.value = true
                bookmark.value.push(result.data)
            })
            .catch((error) => {
                isLoading.value = false
                if (error.status === 404) {
                    errorMessage.value = 'Bookmark not found'
                }
            })

    } catch (error) {
        isLoading.value = false
        console.log(error)
    }
})

const deleteHandler = async () => {

    try {

        const response = await axios.post('http://localhost:3000/deleteBookmarkById', { id }, {
            withCredentials: true
        })

        if (response.status === 200) {
            router.push('/home')
        }

    } catch (error) {
        console.log(error)
    }
}

const url = ref('')
const name = ref('')
const description = ref('')
const logo = ref('')


const updataHandler = async () => {
    const data = {
        id: id,
        url: url.value,
        name: name.value,
        description: description.value,
        logo: logo.value
    }

    try {


        const response = await axios.post('http://localhost:3000/updateBookmarkById', data, {
            withCredentials: true,
            headers: {
                "Content-Type": 'multipart/form-data'
            }
        })
        console.log(response.data)
    } catch (error) {
        console.log(error)
    }
}

const logoSelectHanlder = (e) => {
    const file = e.target.files[0]
    logo.value = file
}

const reminderDate = ref('')
const reminderDateHandler = async () => {
    try {

        const r = await axios.post('https://bookmark-manager-ndqv.vercel.app/addReminder', {reminderDate: reminderDate.value} , {
            withCredentials: true
        })
        console.log(r.data)

    } catch (error) {
        console.log(error)
    }
}

</script>

<template>
    <div>
        <div v-if="isLoading">
            <div v-for="item in bookmark" :key="item.name" class="flex flex-col items-center  px-[25px] py-[35px]">

                <div>
                    <img class="w-[100px] h-[100px] rounded-md border-1 border-[#515151] text-center"
                        :src="`http://localhost:3000/${item.logo}`" :alt="'no logo'">
                    <input type="file" @change="logoSelectHanlder" name="" id="">
                </div>

                <div class="flex flex-col items-center gap-y-2.5 w-full">

                    <label for="inputValue"></label>
                    <input v-model="url" type="text" id="inputValue"
                        class="bg-[#1B1B1B] text-[16px] border-[0.6px] rounded-[10px] w-full lg:w-[50%] h-[46px] py-[10px] px-[20px] outline-none border-[#515151] text-[#515151]">

                    <label for="inputValue"></label>
                    <input v-model="name" type="text" id="inputValue"
                        class="bg-[#1B1B1B] text-[16px] border-[0.6px] rounded-[10px] w-full lg:w-[50%] h-[46px] py-[10px] px-[20px] outline-none border-[#515151] text-[#515151]">

                    <label for="inputValue"></label>
                    <input v-model="description" type="text" id="inputValue"
                        class="bg-[#1B1B1B] text-[16px] border-[0.6px] rounded-[10px] w-full lg:w-[50%] h-[46px] py-[10px] px-[20px] outline-none border-[#515151] text-[#515151]">

                    <label for="inputValue"></label>
                    <input v-model="item.category.categoryName" type="text" id="inputValue"
                        class="bg-[#1B1B1B] text-[16px] border-[0.6px] rounded-[10px] w-full lg:w-[50%] h-[46px] py-[10px] px-[20px] outline-none border-[#515151] text-[#515151]">

                    <input v-model="reminderDate" type="datetime-local" id="inputValue"
                        class="bg-[#1B1B1B] text-[16px] border-[0.6px] rounded-[10px] w-full lg:w-[50%] h-[46px] py-[10px] px-[20px] outline-none border-[#515151] text-[#515151]">
                </div>

                <div class="py-5 flex flex-col lg:flex-row gap-y-5 justify-between w-[50%]">
                    <button @click="updataHandler"
                        class="bg-[#F7F7F7] text-[16px] rounded-[5px] text-[#262626] w-full h-[40px] lg:h-[45px] lg:w-fit border-none  py-[5x] px-[35px]">
                        Update
                    </button>
                    <button @click="reminderDateHandler"
                        class="bg-[#F7F7F7] text-[16px] rounded-[5px] text-[#262626] w-full h-[40px] lg:h-[45px] lg:w-fit border-none  py-[5x] px-[35px]">Add
                        Reminder</button>
                    <button @click="deleteHandler" class="text-red-500">Delete Bookmark</button>
                </div>

            </div>

        </div>



        <div v-else class="flex items-center justify-center h-[50vh]">
            <div class="text-center py-[50px] text-white" v-if="errorMessage">
                <p> {{ errorMessage }}</p>
            </div>

            <div role="status">
                <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor" />
                    <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill" />
                </svg>
                <span class="sr-only">Loading...</span>
            </div>

        </div>
    </div>
</template>