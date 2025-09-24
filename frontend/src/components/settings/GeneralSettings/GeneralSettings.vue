<script setup>
import { AutoFetchToggle, DefaultCategorySelect } from "..";


</script>
<template>
    <div>
        <div
            class="flex flex-col lg:flex-row text-center lg:text-left gap-y-4 container mx-auto justify-between items-center mb-[30px]">
            <div>
                <h3 class="text-[33px] text-[#F4F4F4]">{{ $t('settings.title') }}</h3>
                <p class="text-[19px] text-[#7F7F7F]">{{ $t('settings.text') }}</p>
            </div>
        </div>

        <div class="bg-[#232323] rounded-[10px] p-[20px] w-full lg:w-[70%] border-1 border-[#515151]">
            <h3 class="text-[25px] text-[#F4F4F4]">{{ $t('settings.general-title') }}</h3>

            <DefaultCategorySelect />
            <AutoFetchToggle />

        </div>


    </div>
</template>