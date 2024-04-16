<template>
    <div class="w-full">
        <div>
            <h1 class="text-3xl font-bold mt-5">Let’s get you started</h1>
            <p class="text-[#494D4F] text-sm">We care about you and your business. </p>
        </div>
        <div class="w-full mt-10">
            <div class="p-5 border-2 border-[#B7BBBE] rounded-lg w-full flex gap-5 items-center mb-6 relative cursor-pointer" :class="{active: accountType == 'personal'}" @click="selectAccountType('personal')">
                <div class="w-[68px] h-[68px] rounded-full bg-[#0D447842] flex items-center justify-center avatar">
                    <svg width="40" height="38" viewBox="0 0 40 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M39.3583 36.627C36.1515 31.0859 31.0113 27.3026 25.0558 25.9386C27.8858 24.7798 30.2253 22.6748 31.6748 19.9832C33.1242 17.2917 33.5936 14.1806 33.0027 11.1816C32.4119 8.18248 30.7975 5.48152 28.4353 3.54012C26.0731 1.59872 23.1098 0.537354 20.0515 0.537354C16.9933 0.537354 14.0299 1.59872 11.6677 3.54012C9.30557 5.48152 7.69114 8.18248 7.1003 11.1816C6.50945 14.1806 6.97884 17.2917 8.42828 19.9832C9.87772 22.6748 12.2173 24.7798 15.0472 25.9386C9.09947 27.2968 3.95151 31.0859 0.744703 36.627C0.651874 36.8044 0.631199 37.0107 0.686998 37.2029C0.742797 37.3952 0.870753 37.5584 1.04414 37.6586C1.21752 37.7588 1.42293 37.7881 1.61745 37.7405C1.81196 37.6929 1.98055 37.572 2.08799 37.403C5.88102 30.8434 12.6013 26.9262 20.0515 26.9262C27.5017 26.9262 34.222 30.8434 38.0151 37.403C38.0831 37.5209 38.181 37.6188 38.2989 37.6869C38.4168 37.755 38.5505 37.7909 38.6867 37.7911C38.8232 37.7915 38.9572 37.7553 39.0749 37.6863C39.2529 37.5833 39.3827 37.4138 39.4359 37.2152C39.489 37.0166 39.4611 36.8051 39.3583 36.627ZM8.40454 13.7331C8.40454 11.4307 9.08762 9.18007 10.3674 7.26573C11.6472 5.35138 13.4662 3.85933 15.5944 2.97825C17.7226 2.09718 20.0644 1.86665 22.3237 2.31582C24.583 2.76499 26.6583 3.87368 28.2872 5.5017C29.916 7.12971 31.0253 9.20393 31.4747 11.4621C31.9241 13.7202 31.6935 16.0608 30.8119 18.1879C29.9304 20.315 28.4376 22.1331 26.5222 23.4122C24.6069 24.6913 22.3551 25.3741 20.0515 25.3741C16.9637 25.3705 14.0033 24.1429 11.8198 21.9605C9.63638 19.7782 8.40813 16.8194 8.40454 13.7331Z" fill="white"/>
                    </svg>
                </div>
                <div>
                    <h4 class="text-xl font-semibold mb-1">Personal Account</h4>
                    <p>You want to open a personal account with us or you own a <br>small business (registered or not registered)</p>
                </div>
                <div class="w-[24px] h-[22px] rounded-md border border-[#7A96B0] absolute top-[20px] right-[20px]">
                    <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="accountType == 'personal'">
                        <rect x="0.173828" width="21.3144" height="20" rx="5" fill="#00DE59"/>
                        <path d="M18.447 5.89551L8.43403 15.2998L3.2168 10.3955L4.0598 9.60449L8.43403 13.7002L17.604 5.10449L18.447 5.89551Z" fill="white"/>
                    </svg>
                </div>
            </div>

            <div class="p-5 border-2 border-[#B7BBBE] rounded-lg w-full flex gap-5 items-center mb-6 relative cursor-pointer" :class="{active: accountType == 'business'}" @click="selectAccountType('business')">
                <div class="w-[68px] h-[68px] rounded-full bg-[#0D447842] flex items-center justify-center avtar">
                    <svg width="41" height="34" viewBox="0 0 41 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.89718 34C2.86225 34 1.99831 33.6727 1.30535 33.0182C0.610899 32.3623 0.263672 31.5456 0.263672 30.5681V9.80688C0.263672 8.82938 0.610899 8.01337 1.30535 7.35887C1.99831 6.70296 2.86225 6.375 3.89718 6.375H13.7628V3.43187C13.7628 2.45437 14.11 1.63837 14.8045 0.983875C15.4974 0.327958 16.3614 0 17.3963 0H23.6284C24.6633 0 25.528 0.327958 26.2225 0.983875C26.9154 1.63837 27.2619 2.45437 27.2619 3.43187V6.375H37.1275C38.1624 6.375 39.0264 6.70296 39.7193 7.35887C40.4138 8.01337 40.761 8.82938 40.761 9.80688V30.5681C40.761 31.5456 40.4145 32.3616 39.7216 33.0161C39.0271 33.672 38.1624 34 37.1275 34H3.89718ZM16.0126 6.375H25.012V3.43187C25.012 3.10604 24.8681 2.80642 24.5801 2.533C24.2906 2.261 23.9734 2.125 23.6284 2.125H17.3963C17.0513 2.125 16.7341 2.261 16.4446 2.533C16.1566 2.80642 16.0126 3.10604 16.0126 3.43187V6.375ZM38.5112 22.3125H25.012V25.5H16.0126V22.3125H2.51352V30.5681C2.51352 30.894 2.65751 31.1936 2.9455 31.467C3.23498 31.739 3.55221 31.875 3.89718 31.875H37.1275C37.4725 31.875 37.7897 31.739 38.0792 31.467C38.3672 31.1936 38.5112 30.894 38.5112 30.5681V22.3125ZM18.2625 23.375H22.7622V19.125H18.2625V23.375ZM2.51352 20.1875H16.0126V17H25.012V20.1875H38.5112V9.80688C38.5112 9.48104 38.3672 9.18142 38.0792 8.908C37.7897 8.636 37.4725 8.5 37.1275 8.5H3.89718C3.55221 8.5 3.23498 8.636 2.9455 8.908C2.65751 9.18142 2.51352 9.48104 2.51352 9.80688V20.1875Z" fill="white"/>
                    </svg>
                </div>
                <div>
                    <h4 class="text-xl font-semibold mb-1">Business Account</h4>
                    <p>You want to open a corporate account with us and you own <br> a registered company with CAC and operate as a legal <br> entity. You be a director to open an account</p>
                </div>
                <div class="w-[24px] h-[22px] rounded-md border-2 border-[#7A96B0] absolute top-[20px] right-[20px]">
                    <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="accountType == 'business'">
                        <rect x="0.173828" width="21.3144" height="20" rx="5" fill="#00DE59"/>
                        <path d="M18.447 5.89551L8.43403 15.2998L3.2168 10.3955L4.0598 9.60449L8.43403 13.7002L17.604 5.10449L18.447 5.89551Z" fill="white"/>
                    </svg>
                </div>
            </div>
        </div>
        <div>
            <button class="h-[60px] w-full text-white font-semibold rounded-lg" :disabled="accountType == ''" :class="{'bg-[#1C2C3580] cursor-not-allowed' : accountType == '', 'bg-[#1C2C35]': accountType !== ''}" @click="increaseIndex()">Continue →</button>
        </div>
    </div>
</template>

<script setup>
const props = defineProps([
    'accountType', 
    'selectAccountType', 
    'increaseIndex',
    'decreaseIndex'
]);
</script>

<style>
.active {
    border: 2px solid #202F3D;
}
.active .avatar {
    background: #1C2C35;
}
</style>