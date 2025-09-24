<script setup>
import axios from 'axios';
import { onMounted, ref, useTemplateRef } from 'vue';


const Icons = useTemplateRef('Icons')
const IconId = ref('')
const categoryName = ref('')
const isSuccess = ref(false)

const AddCategoryHandler = async () => {
    try {

        const Payload = {
            cateGoryName: categoryName.value,
            cateGoryIcon: IconId.value
        }

        await axios.post('http://localhost:3000/cateGoryController', Payload, {
            withCredentials: true
        })
            .then((result) => {
                if (result.status === 200) {
                    isSuccess.value = !isSuccess.value
                    setTimeout(() => {
                        isSuccess.value = !isSuccess.value
                    }, 6000)
                }
            })
            .catch((error) => {
                console.log(error)
            })

        categoryName.value = ''
        IconId.value = ''

    } catch (error) {
        console.log(error)
    }
}

onMounted(() => {

    Icons.value.addEventListener('click', (e) => {
        e.target.style.color = 'red'
        IconId.value = e.target.className.substring(2)
        console.log(IconId.value)
    })
})

</script>

<template>
    <div class="py-[30px] px-[34px] flex flex-col gap-y-[20px]">
        <div v-if="isSuccess"
            class="absolute right-[34px] w-fit bg-blue-500 rounded-sm text-white text-sm font-bold px-4 py-3"
            role="alert">
            <p>Category added succssfully</p>
        </div>
        <h3 class="text-[33px] text-[#F4F4F4] font-bold">{{ $t('addCategory.title') }}</h3>
        <p class="text-[#7F7F7F] text-[19px]">{{ $t('addCategory.text') }}</p>
        <div class="mt-[30px]">
            <h5 class="text-[#F7F7F7] text-[23px] mb-[10px]">{{ $t('addCategory.category-name') }}</h5>
            <input v-model="categoryName" type="text" placeholder="entertainment"
                class="bg-[#1B1B1B] text-[16px] border-[0.6px] rounded-[10px] w-full lg:w-[50%] h-[46px] py-[10px] px-[20px] outline-none border-[#515151] text-[#515151]">
        </div>
        <div>
            <h5 class="text-[#F7F7F7] text-[23px] mb-[10px]">{{ $t('addCategory.choose-icon') }}</h5>
            <div
                class="bg-[#1B1B1B] border-[0.6px] text-white rounded-[10px] w-full lg:w-[50%] h-[46px] py-[10px] px-[20px] outline-none border-[#515151]">
                <div class="text-[22px] flex items-center gap-5" ref="Icons">
                    <i class="fa fa-music" ref="icon"></i>
                    <i class="fa fa-film" ref="icon"></i>
                    <i class="fa fa-book"></i>
                    <i class="fa fa-brain"></i>
                    <i class="fa fa-atom"></i>
                    <i class="fa fa-football"></i>
                </div>
            </div>
        </div>
        <div class="flex flex-col gap-y-[10px]">
            <button @click="AddCategoryHandler"
                class="bg-[#F7F7F7] text-[16px] hover:bg-gray-200 rounded-[10px] text-[#262626 w-full lg:h-[56px] lg:w-[50%] border-none  py-[10px] px-[20px]">
                {{ $t('addCategory.create-category') }}
            </button>
            <button
                class="bg-[#262626] border-1 border-[#616161] text-[16px] rounded-[10px] text-[#FDFDFD] w-full lg:h-[56px] lg:w-[50%] py-[10px] px-[20px]">
                Cancel</button>
        </div>
    </div>

</template>