<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const email = ref('')
const password = ref('')


const loginHandler = async () => {
    try {

        const Payload = {
            email: email.value,
            password: password.value
        }


        await axios.post('http://localhost:3000/login', Payload, {
            withCredentials: true
        })
            .then((result) => {
                if (result.status === 200) {
                    return router.push('/profile')
                }
            })
            .catch((error) => {
                console.log(error)
            })

    } catch (error) {
        console.log(error)
    }
}

</script>

<template>
    <div class="py-[30px] px-[34px] flex flex-col gap-y-[20px] max-w-[1600px]">
        <h3 class="text-[30px] text-[#F4F4F4] font-bold">Login</h3>
        <div class="mt-[10px]">
            <h5 class="text-[#F7F7F7] text-[23px] mb-[10px]">email</h5>
            <input v-model="email" type="text" placeholder="john@gmail.com"
                class="bg-[#1B1B1B] text-[16px] border-[0.6px] rounded-[10px] w-full lg:w-[50%] h-[46px] py-[10px] px-[20px] outline-none border-[#515151] text-[#515151]">
        </div>
        <div>
            <h5 class="text-[#F7F7F7] text-[23px] mb-[10px]">password</h5>
            <input v-model="password" type="text" placeholder="********"
                class="bg-[#1B1B1B] text-[16px] border-[0.6px] rounded-[10px] w-full lg:w-[50%] h-[46px] py-[10px] px-[20px] outline-none border-[#515151] text-[#515151]">
        </div>

        <div class="flex items-center lg:flex-row flex-col gap-[20px]">
            <button @click="loginHandler"
                class="bg-[#F7F7F7] text-[16px] rounded-[10px] text-[#262626 w-full lg:h-[56px] lg:w-[30%] border-none  py-[10px] px-[20px]">
                Login</button>
            <RouterLink class="text-white" to="/register">Already have account?</RouterLink>
        </div>
    </div>

</template>