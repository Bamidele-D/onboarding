<template>
    <div class="hidden lg:block w-80 h-screen bg-[#0F0B3B] py-10 px-14">
        <img src="../assets/images/white-logo.png" alt="Kredi" class="h-[30px]">
        <div class="mt-12">
            <ul>
                <li class="text-white py-4 text-sm flex items-center gap-4" v-for="(item, index) in updatedProgressList" :class="{'active': index < progressIndex}">
                    <span>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="10" cy="10" r="10" fill="#C1C1C1" />
                            <path d="M16 7.62069L8.1107 15L4 11.1517L4.66421 10.531L8.1107 13.7448L15.3358 7L16 7.62069Z" fill="white"/>
                        </svg>
                    </span>
                    {{ item.name }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
const props = defineProps([
    'progressIndex', 'accountType',
]);
const progressList = ref([
    {name: 'select account'},
    {name: 'Customers Details'},
    {name: 'Email Verification'},
    {name: 'BVN Verification'},
])

const progressList2 = ref([
    {name: 'select account'},
    {name: 'Customers Details'},
    {name: 'Email Verification'},
    {name: 'BVN Verification'},
    {name: 'Business Registration'},
])

const updatedProgressList = computed(() => {
    return props.accountType === 'business' ? progressList2.value : progressList.value;
})
</script>

<style scoped>
ul li.active {
    color: #00DE59;
    border: none;
}

ul li.active svg circle {
    fill: #00DE59;
}
</style>