<template>
    <div class="w-80 h-screen bg-[#0F0B3B] py-10 px-14">
        <img src="../assets/images/white-logo.png" alt="Kredi" class="h-[30px]">
        <div class="mt-12">
            <ul>
                <li class="text-white py-4 text-sm flex items-center gap-4">
                    <span>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="10" cy="10" r="10" :fill="progressIndex == 1 ? '': '#C1C1C1'" />
                            <path d="M16 7.62069L8.1107 15L4 11.1517L4.66421 10.531L8.1107 13.7448L15.3358 7L16 7.62069Z" fill="white"/>
                        </svg>
                    </span>
                    Select Account
                </li>
                <li class="text-white py-4 text-sm flex items-center gap-4">
                    <span>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="10" cy="10" r="10" fill="#C1C1C1"/>
                            <path d="M16 7.62069L8.1107 15L4 11.1517L4.66421 10.531L8.1107 13.7448L15.3358 7L16 7.62069Z" fill="white"/>
                        </svg>
                    </span>
                    Customers Details
                </li>
                <li class="text-white py-4 text-sm flex items-center gap-4">
                    <span>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="10" cy="10" r="10" fill="#C1C1C1"/>
                            <path d="M16 7.62069L8.1107 15L4 11.1517L4.66421 10.531L8.1107 13.7448L15.3358 7L16 7.62069Z" fill="white"/>
                        </svg>
                    </span>
                    BVN Verification
                </li>
                <li class="text-white py-4 text-sm flex items-center gap-4">
                    <span>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="10" cy="10" r="10" fill="#C1C1C1"/>
                            <path d="M16 7.62069L8.1107 15L4 11.1517L4.66421 10.531L8.1107 13.7448L15.3358 7L16 7.62069Z" fill="white"/>
                        </svg>
                    </span>
                    Business Registration
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
const props = defineProps([
    'progressIndex',
]);
</script>