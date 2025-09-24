<script setup>
import { useSearch } from '@/stores/search';
import { ref } from 'vue';

const isShow = ref(false)
const searchModel = useSearch()
console.log(searchModel.searchInput)
</script>

<template>
    <div class="bg-[#262626]">
        <div
            class="bg-[#232323] border-t-1 z-1 border-t-[#515151] text-[#D1D1D1] w-full h-15 flex items-center  gap-3 overflow-auto text-[1.5rem] justify-center absolute bottom-0 sm:hidden">
            <RouterLink to="/home">
                <i class="fa fa-home"></i>
            </RouterLink>
            <RouterLink to="/categories">
                <i class="fa fa-folder"></i>
            </RouterLink>
            <RouterLink to="/frequent">
                <i class="fa fa-history"></i>
            </RouterLink>
            <RouterLink to="/add">
                <i class="fa fa-circle-plus"></i>
            </RouterLink>
            <RouterLink to="/settings">
                <i class="fa fa-cog"></i>
            </RouterLink>
            <RouterLink to="/profile">
                <i class="fa fa-user"></i>
            </RouterLink>
        </div>

        <div class="flex flex-col lg:flex-row h-screen">

            <div class="hidden sm:block">

                <div
                    class="w-full flex lg:flex-col lg:w-[236px] lg:justify-between items-center justify-center p-[18px] lg:h-screen h-[60px] bg-[#232323] border-r-1 border-r-[#515151]">
                    <div class="lg:mt-[22px]  text-[19px] text-[#D1D1D1] flex gap-5 lg:flex-col">
                        <h1 class="text-[#4A90E2] mr-10 lg:mb-[48px]">Bookmark</h1>

                        <RouterLink to="/home">
                            <i class="fa fa-home"></i>
                            {{ $t('navigation.home') }}
                        </RouterLink>
                        <RouterLink to="/categories">
                            <i class="fa fa-folder"></i>
                            {{ $t('navigation.categories') }}

                        </RouterLink>
                        <RouterLink to="/frequent">
                            <i class="fa fa-history"></i>
                            {{ $t('navigation.frequent') }}

                        </RouterLink>
                        <RouterLink to="/add">
                            <i class="fa fa-circle-plus"></i>
                            {{ $t('navigation.add-bookmark') }}
                        </RouterLink>
                        <RouterLink to="/settings">
                            <i class="fa fa-cog"></i>
                            {{ $t('navigation.settings') }}

                        </RouterLink>
                        <RouterLink to="/profile">
                            <i class="fa fa-user"></i>
                            {{ $t('navigation.profile') }}

                        </RouterLink>
                    </div>
                    <p class="text-[#616161] w-[161px] hidden sm:block">© 2025 Bookmark Manager</p>
                </div>
            </div>

            <div class="flex-1 overflow-auto">
                <div
                    class="bg-[#232323] sticky z-1 top-0 w-full py-[10px] px-[36px] border-b-1 border-b-[#515151] lg:flex-row lg:justify-between lg:items-center flex flex-col gap-4 ">
                    <div class="text-[#515151] flex items-center relative lg:w-[500px]">
                        <i class="fa fa-search absolute left-3"></i>
                        <input v-model="searchModel.searchInput" type="text"
                            :placeholder="`${$t('navigation.search')}`"
                            class="bg-[#1B1B1B] text-[16px] border-[0.6px] rounded-[10px] w-full lg:w-[full] h-[46px] py-[10px] px-[50px] outline-none border-[#515151]">
                    </div>
                    <RouterLink to="/add" class="bg-[#F7F7F7] flex items-center justify-center text-[16px] rounded-[10px] text-[#262626] w-full lg:h-[56px] lg:w-[220px]
                    border-none py-[10px] px-[20px]">
                        <i class="fa fa-plus"></i>
                        {{ $t('navigation.new-bookmark') }}

                    </RouterLink>
                </div>

                <RouterView></RouterView>
            </div>
        </div>


    </div>

</template>
